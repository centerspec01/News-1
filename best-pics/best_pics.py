#!/usr/bin/env python3
"""
Best Pics — encontra fotos iguais ou parecidas numa pasta, escolhe a melhor
de cada grupo e copia para uma pasta "Best Pics".

Uso:
    python best_pics.py                 # abre a janela (interface gráfica)
    python best_pics.py "C:/Fotos"      # modo linha de comando
    python best_pics.py "C:/Fotos" --limiar 8 --so-duplicadas

Os arquivos originais NUNCA são apagados nem alterados: o app só copia.
"""

from __future__ import annotations

import argparse
import os
import shutil
import sys
import threading
from dataclasses import dataclass, field
from pathlib import Path

try:
    from PIL import Image, ImageFilter, ImageOps, ImageStat
except ImportError:  # pragma: no cover
    sys.exit("Falta a biblioteca Pillow. Instale com:  pip install pillow")

try:  # fotos de iPhone (.heic) — opcional
    from pillow_heif import register_heif_opener

    register_heif_opener()
    HEIC_OK = True
except ImportError:
    HEIC_OK = False

EXTENSOES = {".jpg", ".jpeg", ".png", ".bmp", ".gif", ".tif", ".tiff", ".webp"}
if HEIC_OK:
    EXTENSOES |= {".heic", ".heif"}

NOME_PASTA_SAIDA = "Best Pics"
HASH_LADO = 16  # hash de 16x16 = 256 bits


# --------------------------------------------------------------------------
# Análise de cada foto
# --------------------------------------------------------------------------
@dataclass
class Foto:
    caminho: Path
    largura: int = 0
    altura: int = 0
    tamanho_bytes: int = 0
    hash_bits: int = 0
    nitidez: float = 0.0
    exposicao: float = 0.0  # 0..1, 1 = bem exposta
    pontuacao: float = 0.0
    erro: str | None = None
    grupo: int = -1
    extras: dict = field(default_factory=dict)

    @property
    def megapixels(self) -> float:
        return self.largura * self.altura / 1_000_000


def _dhash(img_cinza: Image.Image) -> int:
    """Difference hash: robusto a redimensionamento, compressão e pequenos ajustes."""
    pequena = img_cinza.resize((HASH_LADO + 1, HASH_LADO), Image.LANCZOS)
    px = pequena.tobytes()  # 1 byte por pixel (modo L)
    bits = 0
    for y in range(HASH_LADO):
        linha = y * (HASH_LADO + 1)
        for x in range(HASH_LADO):
            bits = (bits << 1) | (px[linha + x] > px[linha + x + 1])
    return bits


def _nitidez(img_cinza: Image.Image) -> float:
    """Variância das bordas (aproxima a variância do Laplaciano). Maior = mais nítida."""
    amostra = img_cinza.copy()
    amostra.thumbnail((800, 800))
    bordas = amostra.filter(ImageFilter.Kernel((3, 3), [0, 1, 0, 1, -4, 1, 0, 1, 0], 1, 128))
    return ImageStat.Stat(bordas).var[0]


def _exposicao(img_cinza: Image.Image) -> float:
    """1.0 = brilho médio equilibrado, sem muito preto estourado/branco estourado."""
    amostra = img_cinza.copy()
    amostra.thumbnail((400, 400))
    hist = amostra.histogram()
    total = sum(hist) or 1
    escuros = sum(hist[:8]) / total
    claros = sum(hist[248:]) / total
    media = ImageStat.Stat(amostra).mean[0]
    equilibrio = 1 - abs(media - 128) / 128
    return max(0.0, equilibrio - escuros - claros)


def analisar(caminho: Path) -> Foto:
    foto = Foto(caminho=caminho)
    try:
        foto.tamanho_bytes = caminho.stat().st_size
        with Image.open(caminho) as img:
            img = ImageOps.exif_transpose(img)  # respeita a rotação da câmera
            foto.largura, foto.altura = img.size
            cinza = img.convert("L")
            foto.hash_bits = _dhash(cinza)
            foto.nitidez = _nitidez(cinza)
            foto.exposicao = _exposicao(cinza)
    except Exception as e:  # arquivo corrompido, formato não suportado...
        foto.erro = str(e)
    return foto


def pontuar_grupo(fotos: list[Foto]) -> None:
    """Nota relativa dentro do grupo: resolução 40%, nitidez 40%, exposição 15%, tamanho 5%."""
    def norm(valores):
        mx = max(valores) or 1
        return [v / mx for v in valores]

    res = norm([f.largura * f.altura for f in fotos])
    nit = norm([f.nitidez for f in fotos])
    exp = norm([f.exposicao for f in fotos])
    tam = norm([f.tamanho_bytes for f in fotos])
    for i, f in enumerate(fotos):
        f.pontuacao = round(100 * (0.40 * res[i] + 0.40 * nit[i] + 0.15 * exp[i] + 0.05 * tam[i]), 1)


# --------------------------------------------------------------------------
# Agrupamento de fotos parecidas
# --------------------------------------------------------------------------
def agrupar(fotos: list[Foto], limiar: int) -> list[list[Foto]]:
    """Une fotos cuja distância de Hamming entre hashes é <= limiar (union-find)."""
    pai = list(range(len(fotos)))

    def raiz(i):
        while pai[i] != i:
            pai[i] = pai[pai[i]]
            i = pai[i]
        return i

    for i in range(len(fotos)):
        hi = fotos[i].hash_bits
        for j in range(i + 1, len(fotos)):
            if (hi ^ fotos[j].hash_bits).bit_count() <= limiar:
                a, b = raiz(i), raiz(j)
                if a != b:
                    pai[b] = a

    grupos: dict[int, list[Foto]] = {}
    for i, f in enumerate(fotos):
        grupos.setdefault(raiz(i), []).append(f)
    return list(grupos.values())


# --------------------------------------------------------------------------
# Processo completo
# --------------------------------------------------------------------------
def listar_fotos(pasta: Path, subpastas: bool, saida: Path) -> list[Path]:
    saida = saida.resolve()
    padrao = pasta.rglob("*") if subpastas else pasta.glob("*")
    achadas = []
    for p in padrao:
        if p.is_file() and p.suffix.lower() in EXTENSOES and saida not in p.resolve().parents:
            achadas.append(p)
    return sorted(achadas)


def _destino_livre(pasta: Path, nome: str) -> Path:
    destino = pasta / nome
    base, ext = os.path.splitext(nome)
    n = 2
    while destino.exists():
        destino = pasta / f"{base} ({n}){ext}"
        n += 1
    return destino


def executar(pasta: str | Path, limiar: int = 10, incluir_unicas: bool = True,
             subpastas: bool = True, destino: str | Path | None = None,
             progresso=lambda msg, frac: None) -> dict:
    pasta = Path(pasta).expanduser()
    if not pasta.is_dir():
        raise ValueError(f"Pasta não encontrada: {pasta}")
    pasta_saida = Path(destino) if destino else pasta / NOME_PASTA_SAIDA

    caminhos = listar_fotos(pasta, subpastas, pasta_saida)
    if not caminhos:
        raise ValueError("Nenhuma foto encontrada nessa pasta.")

    fotos = []
    for i, c in enumerate(caminhos, 1):
        progresso(f"Analisando {i}/{len(caminhos)}: {c.name}", 0.85 * i / len(caminhos))
        fotos.append(analisar(c))

    validas = [f for f in fotos if not f.erro]
    erros = [f for f in fotos if f.erro]

    progresso("Comparando fotos...", 0.88)
    grupos = agrupar(validas, limiar)
    grupos.sort(key=len, reverse=True)

    pasta_saida.mkdir(parents=True, exist_ok=True)
    copiadas, relatorio = [], []
    for gid, grupo in enumerate(grupos, 1):
        if len(grupo) == 1 and not incluir_unicas:
            continue
        pontuar_grupo(grupo)
        grupo.sort(key=lambda f: f.pontuacao, reverse=True)
        melhor = grupo[0]
        alvo = _destino_livre(pasta_saida, melhor.caminho.name)
        shutil.copy2(melhor.caminho, alvo)
        copiadas.append(alvo)
        if len(grupo) > 1:
            relatorio.append((gid, grupo, alvo))

    progresso("Gravando relatório...", 0.97)
    _gravar_relatorio(pasta_saida, pasta, relatorio, erros, len(fotos), len(copiadas))

    progresso("Pronto!", 1.0)
    return {
        "total": len(fotos),
        "grupos_duplicados": len(relatorio),
        "fotos_repetidas": sum(len(g) for _, g, _ in relatorio),
        "copiadas": len(copiadas),
        "erros": [(str(f.caminho), f.erro) for f in erros],
        "pasta_saida": str(pasta_saida),
        "relatorio": relatorio,
    }


def _gravar_relatorio(saida: Path, origem: Path, relatorio, erros, total, copiadas):
    linhas = [
        "BEST PICS — relatório",
        f"Pasta analisada: {origem}",
        f"Fotos analisadas: {total}",
        f"Grupos de fotos iguais/parecidas: {len(relatorio)}",
        f"Fotos copiadas para '{saida.name}': {copiadas}",
        "",
        "Nota = resolução 40% + nitidez 40% + exposição 15% + tamanho 5%",
        "=" * 70,
    ]
    for gid, grupo, alvo in relatorio:
        linhas.append(f"\nGrupo {gid}  ({len(grupo)} fotos)  ->  escolhida: {alvo.name}")
        for k, f in enumerate(grupo):
            marca = "★" if k == 0 else " "
            try:
                rel = f.caminho.relative_to(origem)
            except ValueError:
                rel = f.caminho
            linhas.append(
                f"  {marca} {f.pontuacao:5.1f}  {f.largura}x{f.altura}  "
                f"nitidez {f.nitidez:7.1f}  {f.tamanho_bytes/1024:8.0f} KB  {rel}"
            )
    if erros:
        linhas.append("\nArquivos que não puderam ser lidos:")
        linhas += [f"  {f.caminho}: {f.erro}" for f in erros]
    (saida / "relatorio_best_pics.txt").write_text("\n".join(linhas), encoding="utf-8")


# --------------------------------------------------------------------------
# Interface gráfica (Tkinter — já vem com o Python)
# --------------------------------------------------------------------------
def abrir_janela():
    import tkinter as tk
    from tkinter import filedialog, messagebox, ttk

    janela = tk.Tk()
    janela.title("Best Pics — encontre e guarde suas melhores fotos")
    janela.geometry("760x560")
    janela.minsize(640, 460)

    pasta_var = tk.StringVar()
    limiar_var = tk.IntVar(value=10)
    unicas_var = tk.BooleanVar(value=True)
    sub_var = tk.BooleanVar(value=True)
    status_var = tk.StringVar(value="Escolha uma pasta de fotos para começar.")

    frm = ttk.Frame(janela, padding=14)
    frm.pack(fill="both", expand=True)

    ttk.Label(frm, text="Pasta de fotos:", font=("", 11, "bold")).grid(row=0, column=0, sticky="w")
    ttk.Entry(frm, textvariable=pasta_var).grid(row=1, column=0, sticky="ew", padx=(0, 8))

    def escolher():
        p = filedialog.askdirectory(title="Escolha a pasta com as fotos")
        if p:
            pasta_var.set(p)

    ttk.Button(frm, text="Procurar…", command=escolher).grid(row=1, column=1)

    opc = ttk.LabelFrame(frm, text="Opções", padding=10)
    opc.grid(row=2, column=0, columnspan=2, sticky="ew", pady=12)
    ttk.Label(opc, text="Sensibilidade (0 = só idênticas, 30 = bem parecidas):").grid(row=0, column=0, sticky="w")
    lbl_lim = ttk.Label(opc, text="10", width=3)
    lbl_lim.grid(row=0, column=2)
    ttk.Scale(opc, from_=0, to=30, variable=limiar_var, orient="horizontal",
              command=lambda v: lbl_lim.config(text=str(int(float(v))))).grid(row=0, column=1, sticky="ew", padx=8)
    ttk.Checkbutton(opc, text="Copiar também fotos sem repetição (Best Pics fica com a coleção completa, sem duplicadas)",
                    variable=unicas_var).grid(row=1, column=0, columnspan=3, sticky="w", pady=(6, 0))
    ttk.Checkbutton(opc, text="Incluir subpastas", variable=sub_var).grid(row=2, column=0, columnspan=3, sticky="w")
    opc.columnconfigure(1, weight=1)

    barra = ttk.Progressbar(frm, maximum=1.0)
    barra.grid(row=3, column=0, columnspan=2, sticky="ew")
    ttk.Label(frm, textvariable=status_var).grid(row=4, column=0, columnspan=2, sticky="w", pady=(4, 8))

    saida_txt = tk.Text(frm, height=14, wrap="none", font=("Consolas", 9))
    saida_txt.grid(row=5, column=0, columnspan=2, sticky="nsew")
    frm.columnconfigure(0, weight=1)
    frm.rowconfigure(5, weight=1)

    botoes = ttk.Frame(frm)
    botoes.grid(row=6, column=0, columnspan=2, sticky="e", pady=(10, 0))
    btn_ir = ttk.Button(botoes, text="▶  Encontrar e copiar as melhores")
    btn_abrir = ttk.Button(botoes, text="Abrir pasta Best Pics", state="disabled")
    btn_abrir.pack(side="left", padx=6)
    btn_ir.pack(side="left")
    resultado = {}

    def abrir_saida():
        p = resultado.get("pasta_saida")
        if not p:
            return
        if sys.platform.startswith("win"):
            os.startfile(p)  # type: ignore[attr-defined]
        elif sys.platform == "darwin":
            os.system(f'open "{p}"')
        else:
            os.system(f'xdg-open "{p}"')

    btn_abrir.config(command=abrir_saida)

    def progresso(msg, frac):
        janela.after(0, lambda: (status_var.set(msg), barra.configure(value=frac)))

    def terminou(r=None, erro=None):
        btn_ir.config(state="normal")
        if erro:
            status_var.set("Erro.")
            messagebox.showerror("Best Pics", erro)
            return
        resultado.update(r)
        btn_abrir.config(state="normal")
        saida_txt.delete("1.0", "end")
        saida_txt.insert("end", f"{r['total']} fotos analisadas\n")
        saida_txt.insert("end", f"{r['grupos_duplicados']} grupos de fotos repetidas "
                                f"({r['fotos_repetidas']} fotos)\n")
        saida_txt.insert("end", f"{r['copiadas']} fotos copiadas para: {r['pasta_saida']}\n\n")
        for gid, grupo, alvo in r["relatorio"][:200]:
            saida_txt.insert("end", f"Grupo {gid}: escolhida {alvo.name}\n")
            for k, f in enumerate(grupo):
                saida_txt.insert("end", f"   {'★' if k == 0 else ' '} {f.pontuacao:5.1f}  "
                                        f"{f.largura}x{f.altura}  {f.caminho.name}\n")
        if r["erros"]:
            saida_txt.insert("end", f"\n{len(r['erros'])} arquivo(s) não puderam ser lidos.\n")
        status_var.set("Pronto! Relatório completo em Best Pics/relatorio_best_pics.txt")

    def iniciar():
        if not pasta_var.get():
            messagebox.showwarning("Best Pics", "Escolha uma pasta primeiro.")
            return
        btn_ir.config(state="disabled")
        btn_abrir.config(state="disabled")

        def trabalho():
            try:
                r = executar(pasta_var.get(), int(limiar_var.get()), unicas_var.get(),
                             sub_var.get(), progresso=progresso)
                janela.after(0, lambda: terminou(r))
            except Exception as e:
                msg = str(e)
                janela.after(0, lambda: terminou(erro=msg))

        threading.Thread(target=trabalho, daemon=True).start()

    btn_ir.config(command=iniciar)
    janela.mainloop()


# --------------------------------------------------------------------------
def main():
    ap = argparse.ArgumentParser(description="Encontra fotos repetidas e copia a melhor de cada para 'Best Pics'.")
    ap.add_argument("pasta", nargs="?", help="pasta com as fotos (sem isso, abre a janela)")
    ap.add_argument("--limiar", type=int, default=10,
                    help="0 = só idênticas; 10 = padrão; até ~30 = bem parecidas")
    ap.add_argument("--so-duplicadas", action="store_true",
                    help="copia só a melhor de cada grupo repetido (ignora fotos únicas)")
    ap.add_argument("--sem-subpastas", action="store_true", help="não procura em subpastas")
    ap.add_argument("--destino", help="pasta de saída (padrão: <pasta>/Best Pics)")
    a = ap.parse_args()

    if not a.pasta:
        abrir_janela()
        return

    def progresso(msg, frac):
        print(f"\r[{int(frac*100):3d}%] {msg[:70]:<70}", end="", flush=True)

    r = executar(a.pasta, a.limiar, not a.so_duplicadas, not a.sem_subpastas, a.destino, progresso)
    print(f"\n\n{r['total']} fotos analisadas | {r['grupos_duplicados']} grupos repetidos "
          f"| {r['copiadas']} copiadas para {r['pasta_saida']}")
    if r["erros"]:
        print(f"{len(r['erros'])} arquivo(s) ilegível(is) — veja o relatório.")


if __name__ == "__main__":
    main()

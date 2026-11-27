# Best Pics 📸

Encontra fotos **iguais ou parecidas** numa pasta do computador, escolhe a **melhor** de cada grupo e copia para uma pasta chamada **`Best Pics`**.

Os originais **nunca são apagados nem alterados** — o app só copia.

## Como usar

1. Instale o [Python 3.10+](https://www.python.org/downloads/) (no Windows, marque *"Add Python to PATH"*).
2. Instale as dependências:
   ```
   pip install -r requirements.txt
   ```
3. Abra o app:
   - **Windows:** dois cliques em `Abrir Best Pics.bat`
   - **Mac/Linux:** `python3 best_pics.py`
4. Clique em **Procurar…**, escolha a pasta e depois em **▶ Encontrar e copiar as melhores**.

A pasta `Best Pics` é criada dentro da pasta escolhida, com um `relatorio_best_pics.txt` mostrando cada grupo e por que a foto foi escolhida.

## Como ele decide

- **Fotos parecidas:** cada imagem vira uma "impressão digital" de 256 bits (*difference hash*). Detecta cópias redimensionadas (WhatsApp), recomprimidas, em outro formato ou levemente editadas. O controle **Sensibilidade** ajusta o quanto precisam ser parecidas (0 = só idênticas; padrão 10; ~30 = fotos em sequência/rajada).
- **A melhor foto** recebe a maior nota:
  | Critério | Peso |
  |---|---|
  | Resolução (megapixels) | 40% |
  | Nitidez (foto tremida/desfocada perde pontos) | 40% |
  | Exposição (nem escura nem estourada) | 15% |
  | Tamanho do arquivo | 5% |

## Opções

- **Copiar também fotos sem repetição** (ligado por padrão): `Best Pics` fica com a coleção completa e sem duplicadas. Desligue para copiar só as vencedoras dos grupos repetidos.
- **Incluir subpastas.**

## Linha de comando

```
python best_pics.py "C:\Users\voce\Fotos" --limiar 10
python best_pics.py ~/Fotos --so-duplicadas --sem-subpastas --destino ~/Desktop/Melhores
```

Formatos: JPG, PNG, WEBP, BMP, GIF, TIFF e HEIC (com `pillow-heif`).

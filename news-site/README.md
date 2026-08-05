# Folha de Bordo

Site de notícias de mercado com três frentes: **Brasil**, **Mundo** e **Catering
Aéreo** (subdividido em Nacional e Internacional). Construído com React + TypeScript
+ Vite + Tailwind CSS, seguindo o fluxo do skill `web-artifacts-builder`.

## Estrutura

- `src/data/news.ts` — todas as manchetes, decks, fontes e link original de cada
  matéria, além dos dados do ticker de cotações.
- `src/components/` — `Masthead` (cabeçalho, navegação e alternância de tema),
  `Ticker` (faixa de cotações em estilo painel de embarque), `Section` (Brasil /
  Mundo), `CateringSection` (abas Nacional / Internacional) e `StoryCard`.
- `src/fonts.css` — tipografia (Newsreader + IBM Plex Mono) embutida como
  `@font-face` em base64, para funcionar tanto no site publicado quanto no
  bundle único de artifact.
- `src/index.css` — tokens de design (cores, regras) para os temas claro/escuro.

## Desenvolvimento

```bash
pnpm install
pnpm dev       # servidor de desenvolvimento
pnpm build     # build de produção em dist/
```

## Gerar artifact de arquivo único

```bash
bash /root/.claude/skills/web-artifacts-builder/scripts/bundle-artifact.sh
```

Gera `bundle.html`, um HTML autocontido (CSS, JS e fontes inline) que pode ser
aberto diretamente no navegador ou compartilhado como artifact.

## Atualizando as notícias

As manchetes foram apuradas manualmente a partir de fontes públicas (Agência
Brasil, CNBC, Mercado Hoje, LSG Group, Mordor Intelligence, entre outras) em
agosto de 2026. Para atualizar, edite `src/data/news.ts` mantendo `source` e
`url` apontando para a matéria original.

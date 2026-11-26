# News-1

Site de notícias de mercado — Brasil, Mundo e Catering Aéreo (Nacional /
Internacional). Código-fonte em [`news-site/`](./news-site).

Veja [`news-site/README.md`](./news-site/README.md) para instruções de
desenvolvimento, build e geração do artifact de arquivo único
(`news-site/bundle.html`).

## Globo ao Vivo (`docs/globo/`)

Globo 3D com 40 das principais cidades do mundo: horário local (ao vivo),
temperatura e clima (Open-Meteo, atualizado a cada 10 min no navegador) e
notícias locais (Google News, coletadas a cada 30 min pelo workflow
`.github/workflows/globo-news.yml`, que grava `docs/globo/news.json`).

- Cidades: edite `docs/globo/cities.json`.
- Coleta manual: `node scripts/fetch-globo-news.mjs`.
- Publicado via GitHub Pages em `/globo/`.

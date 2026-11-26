# News-1

Site de notícias de mercado — Brasil, Mundo e Catering Aéreo (Nacional /
Internacional). Código-fonte em [`news-site/`](./news-site).

Veja [`news-site/README.md`](./news-site/README.md) para instruções de
desenvolvimento, build e geração do artifact de arquivo único
(`news-site/bundle.html`).

## Oráculo de Ações

Site de previsão de ações baseado nos padrões dos últimos 5 anos de cotações,
em [`previsao-acoes/index.html`](./previsao-acoes/index.html) (arquivo único,
sem build). Publicado no GitHub Pages em `docs/acoes/`.

- Busca 5 anos de cotações diárias ajustadas no Yahoo Finance, direto do
  navegador (com proxies CORS de reserva), ou lê um CSV enviado pelo usuário.
- Projeta curto (1 mês), médio (6 meses) e longo prazo (1 ano) combinando:
  busca de padrões análogos no histórico, Monte Carlo por blocos de retornos
  reais, tendência de 5 anos e sazonalidade mensal.
- Mostra teste retroativo (taxa de acerto do método nessa ação), padrões
  encontrados, sazonalidade e indicadores (RSI, médias 50/200, drawdown).

Para atualizar o Pages depois de editar: `cp previsao-acoes/index.html docs/acoes/index.html`.

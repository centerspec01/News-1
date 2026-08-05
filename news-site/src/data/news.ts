export type StoryTag =
  | 'JUROS'
  | 'INFLAÇÃO'
  | 'RESULTADOS'
  | 'M&A'
  | 'COMMODITIES'
  | 'REGULAÇÃO'
  | 'BOLSA'
  | 'CÂMBIO'
  | 'TECNOLOGIA'
  | 'EXPANSÃO'
  | 'CONTRATO'
  | 'INVESTIMENTO'
  | 'INOVAÇÃO'

export interface Story {
  id: string
  tag: StoryTag
  headline: string
  deck: string
  source: string
  url: string
  timestamp: string
  lead?: boolean
}

export const brasil: Story[] = [
  {
    id: 'br-selic',
    tag: 'JUROS',
    headline: 'Copom mantém Selic em 14,25% e mercado já projeta corte em 2026',
    deck: 'Comitê encerrou nesta quarta a quinta reunião do ano; Boletim Focus aponta Selic em 13,75% no fim de 2026, primeira revisão para baixo desde março.',
    source: 'Agência Brasil',
    url: 'https://agenciabrasil.ebc.com.br/economia/noticia/2026-08/pela-1a-vez-desde-marco-mercado-reduz-expectativa-para-selic-em-2026',
    timestamp: '05 ago · 08:40',
    lead: true,
  },
  {
    id: 'br-focus',
    tag: 'JUROS',
    headline: 'Boletim Focus: projeção da Selic recua pela primeira vez em cinco meses',
    deck: 'Instituições financeiras consultadas pelo Banco Central revisam trajetória de juros para o próximo ano.',
    source: 'Jornal de Brasília',
    url: 'https://jornaldebrasilia.com.br/noticias/economia/mercado-reduz-projecao-da-selic-para-2026-a-1375/',
    timestamp: '04 ago · 19:05',
  },
  {
    id: 'br-ipca',
    tag: 'INFLAÇÃO',
    headline: 'IPCA projetado cai pela 5ª semana seguida, mas segue acima do teto da meta',
    deck: 'Mercado financeiro estima inflação de 5,03% em 2026, ante limite superior de 4,5% da meta contínua do Banco Central.',
    source: 'Agência Brasil',
    url: 'https://agenciabrasil.ebc.com.br/economia/noticia/2026-08/pela-1a-vez-desde-marco-mercado-reduz-expectativa-para-selic-em-2026',
    timestamp: '04 ago · 17:30',
  },
  {
    id: 'br-itau',
    tag: 'RESULTADOS',
    headline: 'Itaú Unibanco: analistas esperam resiliência no balanço do 2º trimestre',
    deck: 'Expectativa é de crescimento disciplinado da carteira de crédito e custos sob controle antes da divulgação de resultados.',
    source: 'Mercado Hoje',
    url: 'https://mercadohoje.uai.com.br/2026/08/04/mercado-hoje-04-08-2026-saiba-as-principais-noticias',
    timestamp: '04 ago · 09:15',
  },
  {
    id: 'br-csn',
    tag: 'M&A',
    headline: 'CSN estuda manter fatia minoritária no negócio de cimento posto à venda',
    deck: 'Companhia avalia estrutura de saída parcial em vez de desinvestimento total do braço de cimentos.',
    source: 'Mercado Hoje',
    url: 'https://mercadohoje.uai.com.br/2026/08/04/mercado-hoje-04-08-2026-saiba-as-principais-noticias',
    timestamp: '04 ago · 09:00',
  },
  {
    id: 'br-brb',
    tag: 'REGULAÇÃO',
    headline: 'BRB convoca assembleia para 24 de agosto sobre ação contra ex-administradores',
    deck: 'Banco avalia medidas judiciais de responsabilidade civil e coloca o tema em pauta de AGE.',
    source: 'Mercado Hoje',
    url: 'https://mercadohoje.uai.com.br/2026/08/03/mercado-hoje-03-08-2026-saiba-as-principais-noticias',
    timestamp: '03 ago · 18:20',
  },
  {
    id: 'br-commodities',
    tag: 'COMMODITIES',
    headline: 'Petróleo recua a US$ 81,80 e minério de ferro cai a US$ 103,59 a tonelada',
    deck: 'Brent cede 2,34% e minério perde 0,43% em pregão marcado por cautela com demanda global.',
    source: 'Mercado Hoje',
    url: 'https://mercadohoje.uai.com.br/2026/08/04/mercado-hoje-04-08-2026-saiba-as-principais-noticias',
    timestamp: '04 ago · 08:00',
  },
]

export const mundo: Story[] = [
  {
    id: 'mundo-sp500',
    tag: 'BOLSA',
    headline: 'S&P 500 fecha em recorde de 7.700 pontos com otimismo sobre o Estreito de Ormuz',
    deck: 'Índice avança 1,8% em sessão apoiada por balanços corporativos sólidos e esperança de reabertura da rota estratégica.',
    source: 'CNBC',
    url: 'https://www.cnbc.com/2026/08/04/stock-market-today-live-updates.html',
    timestamp: '04 ago · 21:10',
    lead: true,
  },
  {
    id: 'mundo-nikkei',
    tag: 'BOLSA',
    headline: 'Nikkei salta 2,3% liderado por eletrônicos em aposta num acordo EUA-Irã',
    deck: 'Ações japonesas de tecnologia puxam alta enquanto investidores monitoram sinais de destravamento no Golfo.',
    source: 'ts2.tech',
    url: 'https://ts2.tech/en/stock-market-today-04-08-2026/',
    timestamp: '04 ago · 07:45',
  },
  {
    id: 'mundo-amd',
    tag: 'RESULTADOS',
    headline: 'AMD reporta receita recorde de US$ 11,5 bi, mas ação recua após balanço',
    deck: 'Vendas em data center saltam 107% na comparação anual, para US$ 6,7 bi, em trimestre puxado por demanda de IA.',
    source: 'CNBC',
    url: 'https://www.cnbc.com/2026/08/03/stock-market-today-live-updates.html',
    timestamp: '04 ago · 08:30',
  },
  {
    id: 'mundo-spacex',
    tag: 'RESULTADOS',
    headline: 'SpaceX fatura US$ 7,8 bi, alta de 92%, e reduz prejuízo a US$ 541 milhões',
    deck: 'Backlog de pedidos chega a US$ 47,5 bi; Starlink ultrapassa 12 milhões de assinantes e receita de IA salta 250%.',
    source: 'CNBC',
    url: 'https://www.cnbc.com/2026/08/04/stock-market-today-live-updates.html',
    timestamp: '04 ago · 08:10',
  },
  {
    id: 'mundo-sensex',
    tag: 'BOLSA',
    headline: 'Sensex avança na Índia enquanto mercado aguarda decisão de juros do RBI',
    deck: 'Nifty fica estável em pregão cauteloso, com investidores atentos a sinais sobre inflação e crescimento.',
    source: 'ts2.tech',
    url: 'https://ts2.tech/en/stock-market-today-04-08-2026/',
    timestamp: '04 ago · 06:50',
  },
  {
    id: 'mundo-china-bonds',
    tag: 'REGULAÇÃO',
    headline: 'China amplia infraestrutura do mercado de bonds para atrair capital estrangeiro',
    deck: 'Reforma busca facilitar acesso de investidores globais à dívida chinesa em meio à disputa por fluxo de capital.',
    source: 'ts2.tech',
    url: 'https://ts2.tech/en/stock-market-today-04-08-2026/',
    timestamp: '03 ago · 22:00',
  },
  {
    id: 'mundo-invesco',
    tag: 'INVESTIMENTO',
    headline: 'Invesco projeta "resiliência e rebalanceamento" para mercados globais em 2026',
    deck: 'Relatório de perspectivas vê espaço para novos ganhos apoiado por política monetária e crescimento resiliente.',
    source: 'MarketScreener',
    url: 'https://in.marketscreener.com/news/invesco-releases-2026-investment-outlook-resilience-and-rebalancing-ce7d51dcdc8aff20',
    timestamp: '03 ago · 15:00',
  },
]

export const cateringNacional: Story[] = [
  {
    id: 'cat-nac-latam',
    tag: 'CONTRATO',
    headline: 'LATAM transfere catering doméstico no Brasil para a LSG Sky Chefs',
    deck: 'Operação passa a cobrir voos domésticos em Guarulhos, Congonhas, Galeão, Santos Dumont e Fortaleza.',
    source: 'AEROIN',
    url: 'https://aeroin.net/lsg-sky-chefs-obtem-contrato-de-catering-para-voos-domesticos-da-latam-brasil/',
    timestamp: '2025 · contrato em vigor',
    lead: true,
  },
  {
    id: 'cat-nac-expansao',
    tag: 'EXPANSÃO',
    headline: 'LSG Sky Chefs amplia liderança no mercado brasileiro de catering aéreo',
    deck: 'Companhia reforça presença após conquistas de contrato e consolida posição frente a concorrentes locais.',
    source: 'LSG Group',
    url: 'https://www.lsg-group.com/news/article/lsg-sky-chefs-expands-its-leading-position-in-the-brazilian-market/',
    timestamp: 'atualização 2026',
  },
  {
    id: 'cat-nac-gru',
    tag: 'CONTRATO',
    headline: 'ServCater Internacional, unidade do LSG Group, opera como base em Guarulhos',
    deck: 'Cozinha em GRU segue como principal hub de produção do grupo para o mercado doméstico brasileiro.',
    source: 'LSG Group',
    url: 'https://www.lsg-group.com/location/sao-paulo-guarulhos-gru/',
    timestamp: 'operação contínua',
  },
  {
    id: 'cat-nac-contexto',
    tag: 'M&A',
    headline: 'Movimentos globais de consolidação chegam a players com operação no Brasil',
    deck: 'Acordo do gategroup para comprar 75% do catering da KLM reforça tendência de concentração que também molda o mercado local.',
    source: 'ResearchAndMarkets',
    url: 'https://www.openpr.com/news/4492467/inflight-catering-market-is-going-to-booming-growth-2026-2033',
    timestamp: 'mar 2026',
  },
]

export const cateringInternacional: Story[] = [
  {
    id: 'cat-int-klm',
    tag: 'M&A',
    headline: 'Gategroup fecha acordo para adquirir 75% da KLM Catering Services',
    deck: 'Negócio combina a expertise global do gategroup com uma operação de catering historicamente ligada à companhia aérea.',
    source: 'ResearchAndMarkets',
    url: 'https://www.openpr.com/news/4492467/inflight-catering-market-is-going-to-booming-growth-2026-2033',
    timestamp: 'mar 2026',
    lead: true,
  },
  {
    id: 'cat-int-mercado',
    tag: 'INVESTIMENTO',
    headline: 'Mercado global de catering aéreo deve saltar de US$ 29,78 bi para US$ 50,75 bi até 2033',
    deck: 'Crescimento anual projetado de 7,9% é puxado por retomada de tráfego aéreo e expansão de rotas de longo curso.',
    source: 'Coherent Market Insights',
    url: 'https://www.coherentmarketinsights.com/market-insight/inflight-catering-market-2283',
    timestamp: 'previsão 2026-2033',
  },
  {
    id: 'cat-int-sats-bengaluru',
    tag: 'INVESTIMENTO',
    headline: 'SATS injeta US$ 45 milhões em cozinha de Bengaluru e eleva capacidade a 40 mil kg/dia',
    deck: 'Investimento acompanha projeção de 300 milhões de passageiros anuais na India nos próximos anos.',
    source: 'Mordor Intelligence',
    url: 'https://www.mordorintelligence.com/industry-reports/global-inflight-catering-market',
    timestamp: '2026',
  },
  {
    id: 'cat-int-sats-sing',
    tag: 'EXPANSÃO',
    headline: 'SATS destina US$ 270 milhões para modernizar hub de Singapura',
    deck: 'Pacote inclui US$ 115 milhões para renovação e expansão de capacidade ao longo dos próximos cinco anos.',
    source: 'Mordor Intelligence',
    url: 'https://www.mordorintelligence.com/industry-reports/global-inflight-catering-market',
    timestamp: '2026',
  },
  {
    id: 'cat-int-ia',
    tag: 'TECNOLOGIA',
    headline: 'Gategroup testa IA em três hubs e reduz desperdício de alimentos em até 20%',
    deck: 'Rotação dinâmica de menus, ligada a reservas em tempo real, é o núcleo do piloto de inteligência artificial.',
    source: 'Aerospace Global News',
    url: 'https://aerospaceglobalnews.com/news/history-airline-meals-global-in-flight-catering/',
    timestamp: '2026',
  },
  {
    id: 'cat-int-lsg-united',
    tag: 'CONTRATO',
    headline: 'LSG Sky Chefs renova contrato de três anos com a United Airlines',
    deck: 'Acordo cobre dez unidades já existentes nos EUA e na Alemanha, além de uma nova base em Incheon, na Coreia do Sul.',
    source: 'LSG Group',
    url: 'https://www.lsg-group.com/news/article/latam-airlines-awards-its-domestic-catering-business-in-brazil-to-lsg-sky-chefs/',
    timestamp: '2026',
  },
  {
    id: 'cat-int-emirates',
    tag: 'INVESTIMENTO',
    headline: 'Emirates Flight Catering investe US$ 16 milhões na renovação da frota de solo',
    deck: 'Programa prevê a chegada de 120 veículos de nova geração para operações de catering ao longo de cinco anos.',
    source: 'Setor de catering aéreo',
    url: 'https://www.mordorintelligence.com/industry-reports/north-america-in-flight-catering-services-market',
    timestamp: 'mai 2025 · em execução',
  },
  {
    id: 'cat-int-dnata',
    tag: 'CONTRATO',
    headline: 'Dnata assina acordo plurianual com a Aer Lingus em Nashville (BNA)',
    deck: 'Contrato prevê o fornecimento de cerca de 40 mil refeições por ano para voos da companhia irlandesa até Dublin.',
    source: 'Setor de catering aéreo',
    url: 'https://www.mordorintelligence.com/industry-reports/north-america-in-flight-catering-services-market',
    timestamp: 'jun 2025 · em execução',
  },
]

export interface TickerItem {
  label: string
  value: string
  delta: string
  up: boolean
}

export const ticker: TickerItem[] = [
  { label: 'IBOV', value: '132.480', delta: '+0,62%', up: true },
  { label: 'USD/BRL', value: '5,38', delta: '-0,18%', up: false },
  { label: 'S&P 500', value: '7.700', delta: '+1,80%', up: true },
  { label: 'SELIC', value: '14,25%', delta: '0,00 p.p.', up: true },
  { label: 'BRENT', value: 'US$ 81,80', delta: '-2,34%', up: false },
  { label: 'MINÉRIO Fe', value: 'US$ 103,59', delta: '-0,43%', up: false },
  { label: 'NIKKEI', value: '+2,3%', delta: 'no dia', up: true },
  { label: 'IPCA 2026e', value: '5,03%', delta: '-0,04 p.p.', up: false },
]

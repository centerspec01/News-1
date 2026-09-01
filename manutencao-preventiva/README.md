# Organizador de Manutenção Preventiva — Cozinha Industrial

Aplicação web single-file (HTML/CSS/JS puro, sem build e sem dependências)
para organizar a manutenção preventiva dos equipamentos de cozinhas
industriais em múltiplas unidades.

Abra `index.html` diretamente no navegador, ou publique a pasta em qualquer
hospedagem estática (ex: GitHub Pages).

## Funcionalidades

- **Unidades**: cadastre quantas unidades (lojas/restaurantes/cozinhas)
  quiser pelo campo na barra lateral. Cada unidade tem sua própria lista de
  equipamentos e plano de manutenção.
- **Catálogo extenso de equipamentos**: mais de 70 equipamentos típicos de
  cozinha industrial, organizados por categoria (Refrigeração, Cocção,
  Preparo, Lavagem, Exaustão/Utilidades, Distribuição Térmica, Segurança).
  Clique na caixa de seleção de cada item para marcá-lo como pertencente
  (ou não) à unidade ativa. Também é possível adicionar equipamentos
  personalizados que não estejam no catálogo.
- **Plano de manutenção**: conforme os equipamentos são selecionados, uma
  tabela é montada automaticamente com, para cada item:
  - Periodicidade sugerida (editável, com atalhos: semanal, quinzenal,
    mensal, bimestral, trimestral, semestral, anual, ou um número de dias
    personalizado).
  - Data da última manutenção preventiva realizada.
  - Data limite calculada automaticamente para a próxima manutenção
    (última manutenção + periodicidade).
  - Status colorido: **atrasada**, **vencendo em até 7 dias**, **em dia** ou
    **pendente de primeiro registro**.
- **Indicadores** no topo da unidade com a contagem de equipamentos em cada
  status.
- **Exportar CSV** e **Imprimir** o plano de manutenção da unidade ativa.

## Armazenamento dos dados

Os dados (unidades, equipamentos selecionados, periodicidades e datas) são
salvos automaticamente no `localStorage` do navegador — não há backend. Isso
significa que os dados ficam por dispositivo/navegador; para uso
compartilhado por uma equipe, hospede a página numa URL fixa e oriente o
time a usar sempre o mesmo navegador/perfil, ou exporte o CSV
periodicamente como registro.

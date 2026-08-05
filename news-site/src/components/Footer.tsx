export function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-5 py-10">
      <div className="border-t pt-6" style={{ borderColor: 'var(--rule-strong)' }}>
        <p
          className="font-mono-data text-[11px] uppercase tracking-[0.14em]"
          style={{ color: 'var(--ink-faint)' }}
        >
          Folha de Bordo · edição de mercado
        </p>
        <p className="mt-2 max-w-2xl text-[13.5px] leading-snug" style={{ color: 'var(--ink-soft)' }}>
          Curadoria de manchetes de mercado do Brasil, do mundo e do setor de catering aéreo,
          com apuração separada para operações nacionais e internacionais. Cada manchete linka
          para a fonte original — clique no cabeçalho de qualquer matéria para ler na íntegra.
        </p>
      </div>
    </footer>
  )
}

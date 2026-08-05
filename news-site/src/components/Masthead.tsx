import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'brasil', label: 'Brasil' },
  { id: 'mundo', label: 'Mundo' },
  { id: 'catering', label: 'Catering Aéreo' },
]

function formatDate(d: Date) {
  return d
    .toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
    .replace(/^\w/, (c) => c.toUpperCase())
}

export function Masthead() {
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null)
  const [systemDark, setSystemDark] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches,
  )
  const [now, setNow] = useState(new Date('2026-08-05T08:40:00'))
  const effective = theme ?? (systemDark ? 'dark' : 'light')

  useEffect(() => {
    const t = setInterval(() => setNow((n) => new Date(n.getTime() + 60000)), 60000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => setSystemDark(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (theme) document.documentElement.setAttribute('data-theme', theme)
    else document.documentElement.removeAttribute('data-theme')
  }, [theme])

  function toggleTheme() {
    setTheme(effective === 'dark' ? 'light' : 'dark')
  }

  return (
    <header className="sticky top-0 z-30 border-b" style={{ background: 'var(--bg)', borderColor: 'var(--rule-strong)' }}>
      <div className="mx-auto max-w-6xl px-5 pt-6">
        <div className="flex items-baseline justify-between gap-4">
          <div
            className="font-mono-data text-[11px] uppercase tracking-[0.18em]"
            style={{ color: 'var(--ink-faint)' }}
          >
            Edição de mercado
          </div>
          <div
            className="font-mono-data text-[11px] uppercase tracking-[0.14em]"
            style={{ color: 'var(--ink-faint)' }}
          >
            {formatDate(now)}
          </div>
        </div>

        <div className="mt-2 flex items-end justify-between gap-6">
          <h1
            className="balance text-[2.6rem] leading-[0.95] sm:text-[3.6rem]"
            style={{ fontWeight: 600, letterSpacing: '-0.01em' }}
          >
            Folha de Bordo
          </h1>
          <button
            type="button"
            onClick={toggleTheme}
            className="font-mono-data mb-1 shrink-0 rounded-full border px-3 py-1 text-[11px] uppercase tracking-wide transition-colors"
            style={{ borderColor: 'var(--rule-strong)', color: 'var(--ink-soft)' }}
            aria-label="Alternar tema claro/escuro"
          >
            {effective === 'dark' ? '☾ Escuro' : '☀ Claro'}
          </button>
        </div>

        <p
          className="balance mt-1 max-w-2xl pb-4 text-[15px] italic"
          style={{ color: 'var(--ink-soft)', fontStyle: 'italic', fontWeight: 500 }}
        >
          Mercado, Brasil, Mundo e o setor de catering aéreo — nacional e internacional — em uma
          única prancheta de bordo.
        </p>
      </div>

      <nav className="mx-auto max-w-6xl px-5">
        <ul
          className="font-mono-data flex gap-6 border-t py-3 text-[12px] uppercase tracking-[0.12em]"
          style={{ borderColor: 'var(--rule)' }}
        >
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="transition-colors hover:opacity-100"
                style={{ color: 'var(--ink-soft)' }}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

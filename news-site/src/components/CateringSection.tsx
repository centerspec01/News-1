import { useState } from 'react'
import { cateringInternacional, cateringNacional } from '@/data/news'
import { LeadStory, StoryRow } from './StoryCard'

type Scope = 'nacional' | 'internacional'

const COPY: Record<Scope, { kicker: string; label: string; intro: string }> = {
  nacional: {
    kicker: 'Catering Aéreo · Operação no Brasil',
    label: 'Nacional',
    intro: 'Contratos, cozinhas e movimentos de players que atendem a aviação doméstica brasileira.',
  },
  internacional: {
    kicker: 'Catering Aéreo · Panorama Global',
    label: 'Internacional',
    intro: 'Fusões, investimentos e expansão dos grandes grupos de catering ao redor do mundo.',
  },
}

export function CateringSection() {
  const [scope, setScope] = useState<Scope>('internacional')
  const stories = scope === 'nacional' ? cateringNacional : cateringInternacional
  const lead = stories.find((s) => s.lead) ?? stories[0]
  const rest = stories.filter((s) => s.id !== lead.id)
  const copy = COPY[scope]

  return (
    <section id="catering" className="mx-auto max-w-6xl scroll-mt-32 px-5 py-14">
      <div className="mb-6 border-b pb-4" style={{ borderColor: 'var(--rule-strong)' }}>
        <p
          className="font-mono-data text-[11px] uppercase tracking-[0.16em]"
          style={{ color: 'var(--accent-strong)' }}
        >
          Vertical dedicada
        </p>
        <h2 className="mt-1 text-[2rem] leading-none" style={{ fontWeight: 600 }}>
          Catering Aéreo
        </h2>
      </div>

      <div
        className="font-mono-data mb-8 inline-flex rounded-sm border text-[12px] uppercase tracking-[0.1em]"
        style={{ borderColor: 'var(--rule-strong)' }}
        role="tablist"
        aria-label="Escopo do catering aéreo"
      >
        {(['nacional', 'internacional'] as Scope[]).map((s) => (
          <button
            key={s}
            type="button"
            role="tab"
            aria-selected={scope === s}
            onClick={() => setScope(s)}
            className="px-4 py-2 transition-colors"
            style={
              scope === s
                ? { background: 'var(--board-bg)', color: 'var(--board-fg)' }
                : { color: 'var(--ink-soft)', background: 'transparent' }
            }
          >
            {COPY[s].label}
          </button>
        ))}
      </div>

      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
        <p
          className="font-mono-data text-[11px] uppercase tracking-[0.14em]"
          style={{ color: 'var(--ink-faint)' }}
        >
          {copy.kicker}
        </p>
        <p className="max-w-sm text-[13.5px] leading-snug" style={{ color: 'var(--ink-soft)' }}>
          {copy.intro}
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.1fr_1px_1fr]">
        <LeadStory story={lead} key={lead.id} />
        <div className="hidden lg:block" style={{ background: 'var(--rule)' }} />
        <div>
          {rest.map((s) => (
            <StoryRow key={s.id} story={s} />
          ))}
        </div>
      </div>
    </section>
  )
}

import type { Story } from '@/data/news'
import { LeadStory, StoryRow } from './StoryCard'

interface SectionProps {
  id: string
  kicker: string
  title: string
  intro: string
  stories: Story[]
}

export function Section({ id, kicker, title, intro, stories }: SectionProps) {
  const lead = stories.find((s) => s.lead) ?? stories[0]
  const rest = stories.filter((s) => s.id !== lead.id)

  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-32 px-5 py-14">
      <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3 border-b pb-4" style={{ borderColor: 'var(--rule-strong)' }}>
        <div>
          <p
            className="font-mono-data text-[11px] uppercase tracking-[0.16em]"
            style={{ color: 'var(--accent-strong)' }}
          >
            {kicker}
          </p>
          <h2 className="mt-1 text-[2rem] leading-none" style={{ fontWeight: 600 }}>
            {title}
          </h2>
        </div>
        <p className="max-w-sm text-[13.5px] leading-snug" style={{ color: 'var(--ink-soft)' }}>
          {intro}
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.1fr_1px_1fr]">
        <LeadStory story={lead} />
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

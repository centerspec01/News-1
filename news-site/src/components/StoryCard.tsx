import type { Story } from '@/data/news'
import { Tag } from './Tag'

export function LeadStory({ story }: { story: Story }) {
  return (
    <a
      href={story.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <div className="mb-2 flex items-center gap-2">
        <Tag tag={story.tag} />
        <span
          className="font-mono-data text-[11px] tracking-wide"
          style={{ color: 'var(--ink-faint)' }}
        >
          {story.timestamp}
        </span>
      </div>
      <h3
        className="balance text-[1.9rem] leading-[1.05] transition-colors group-hover:opacity-80"
        style={{ fontWeight: 600 }}
      >
        {story.headline}
      </h3>
      <p className="mt-2 max-w-xl text-[16px] leading-snug" style={{ color: 'var(--ink-soft)' }}>
        {story.deck}
      </p>
      <p
        className="font-mono-data mt-2 text-[11px] uppercase tracking-wide"
        style={{ color: 'var(--accent-strong)' }}
      >
        {story.source} ↗
      </p>
    </a>
  )
}

export function StoryRow({ story }: { story: Story }) {
  return (
    <a
      href={story.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex gap-4 border-t py-4 first:border-t-0 first:pt-0"
      style={{ borderColor: 'var(--rule)' }}
    >
      <span
        className="font-mono-data mt-1 hidden shrink-0 text-[11px] tabular-nums sm:block"
        style={{ color: 'var(--ink-faint)', width: '4.5rem' }}
      >
        {story.timestamp.split('·')[0].trim()}
      </span>
      <div className="min-w-0">
        <div className="mb-1 flex items-center gap-2">
          <Tag tag={story.tag} />
        </div>
        <h4
          className="balance text-[1.1rem] leading-snug transition-colors group-hover:opacity-80"
          style={{ fontWeight: 600 }}
        >
          {story.headline}
        </h4>
        <p className="mt-1 text-[14px] leading-snug" style={{ color: 'var(--ink-soft)' }}>
          {story.deck}
        </p>
        <p
          className="font-mono-data mt-1.5 text-[10.5px] uppercase tracking-wide"
          style={{ color: 'var(--ink-faint)' }}
        >
          {story.source}
        </p>
      </div>
    </a>
  )
}

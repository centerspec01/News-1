import type { StoryTag } from '@/data/news'

export function Tag({ tag }: { tag: StoryTag }) {
  return (
    <span
      className="font-mono-data inline-flex items-center rounded-[2px] px-1.5 py-[1px] text-[10.5px] font-medium uppercase tracking-[0.1em]"
      style={{
        color: 'var(--accent-strong)',
        border: '1px solid var(--rule-strong)',
        background: 'var(--surface)',
      }}
    >
      {tag}
    </span>
  )
}

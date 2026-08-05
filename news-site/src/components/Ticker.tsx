import { ticker } from '@/data/news'

export function Ticker() {
  const items = [...ticker, ...ticker]

  return (
    <div
      className="w-full overflow-hidden border-y"
      style={{ background: 'var(--board-bg)', borderColor: 'var(--rule-strong)' }}
      role="marquee"
      aria-label="Painel de cotações"
    >
      <div className="ticker-track flex w-max items-center gap-8 py-2">
        {items.map((item, i) => (
          <div
            key={`${item.label}-${i}`}
            className="font-mono-data flex items-center gap-2 whitespace-nowrap text-[13px] tracking-wide"
            style={{ color: 'var(--board-fg)' }}
          >
            <span className="opacity-70">{item.label}</span>
            <span className="tabular-nums">{item.value}</span>
            <span
              className="tabular-nums"
              style={{ color: item.up ? '#7fd9a8' : '#f0a08f' }}
            >
              {item.up ? '▲' : '▼'} {item.delta}
            </span>
          </div>
        ))}
      </div>
      <style>{`
        .ticker-track {
          animation: ticker-scroll 42s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .ticker-track {
            animation: none;
          }
        }
        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}

import type { CSSProperties } from 'react'
import { useOpenState } from './hooks'
import { whatsappHref } from './content'

/*
  Stands where Marlin's efficiency card stood (459x289, r60 glass), but the
  telemetry is real: today's hours in Alberton, a gold track showing how far
  through the trading day it is, and three facts a walk-in actually wants.
  `t` is the card's 0-1 entrance, so the track fills as it arrives.
*/
export default function OpenCard({ t = 1, style }: { t?: number; style?: CSSProperties }) {
  const s = useOpenState()
  const big = s.open ? s.today!.close : s.line.match(/\d{2}:\d{2}/)?.[0] ?? '—'

  return (
    <div className="glass" style={{ borderRadius: 48, padding: '32px 36px 30px', ...style }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
        <div>
          <div className="label" style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.9)' }}>
            <span
              aria-hidden
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: s.open ? '#7bd88f' : 'rgba(255,255,255,0.35)',
                boxShadow: s.open ? '0 0 10px #7bd88f' : undefined,
              }}
            />
            {s.open ? 'Open now' : 'Closed now'}
          </div>
          <div style={{ marginTop: 10, fontSize: 17, lineHeight: '23px', color: 'rgba(255,255,255,0.82)' }}>
            {s.open ? 'Chairs free until' : s.line.replace(/\s?\d{2}:\d{2}$/, '')}
          </div>
        </div>
        <div
          className="display"
          style={{ fontSize: 60, lineHeight: '54px', fontVariationSettings: '"wdth" 125, "wght" 250', whiteSpace: 'nowrap' }}
        >
          {big.slice(0, 2)}
          <span style={{ fontSize: 28 }}>{big.slice(2)}</span>
        </div>
      </div>

      {/* the trading day, as a track */}
      <div
        style={{ marginTop: 22, height: 5, borderRadius: 999, background: 'rgba(255,255,255,0.16)', overflow: 'hidden' }}
        role="presentation"
      >
        <div
          style={{
            width: `${100 * s.progress * t}%`,
            height: '100%',
            borderRadius: 999,
            background: 'var(--color-gold)',
            boxShadow: '0 0 14px var(--color-gold)',
          }}
        />
      </div>
      <div className="label" style={{ marginTop: 10, fontSize: 10.5, color: 'rgba(255,255,255,0.55)' }}>
        {s.today ? `Today ${s.today.open} – ${s.today.close}` : 'Closed today'} · Alberton time
      </div>

      <div style={{ height: 1, background: 'rgba(255,255,255,0.14)', margin: '20px 0 18px' }} />

      <div style={{ display: 'flex' }}>
        {[
          ['Walk-ins', 'Welcome'],
          ['Kids', 'All ages'],
          ['Book', 'WhatsApp', whatsappHref()],
        ].map(([k, v, href], i) => (
          <div
            key={k}
            style={{ flex: 1, minWidth: 0, paddingLeft: i ? 14 : 0, borderLeft: i ? '1px solid rgba(255,255,255,0.14)' : undefined }}
          >
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener"
                className="display link-underline"
                style={{ fontSize: 15, whiteSpace: 'nowrap', fontVariationSettings: '"wdth" 100, "wght" 650', color: 'var(--color-gold-hi)' }}
              >
                {v}
              </a>
            ) : (
              <div className="display" style={{ fontSize: 15, whiteSpace: 'nowrap', fontVariationSettings: '"wdth" 100, "wght" 650' }}>
                {v}
              </div>
            )}
            <div className="label" style={{ marginTop: 8, fontSize: 10, color: 'rgba(255,255,255,0.55)' }}>
              {k}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

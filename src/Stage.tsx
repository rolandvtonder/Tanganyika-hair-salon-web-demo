import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { useScroll, useMotionValueEvent } from 'motion/react'
import { SCROLL_VH, P, G, INTRO, INTRO_END, WALL_TRAVEL_VW, WALL_RATES, span, ramp, lerp } from './scroll'
import { CARDS, WALL, img, whatsappHref, url } from './content'
import { useClock } from './hooks'
import OpenCard from './OpenCard'
import { ArrowRight, ArrowUpRight, WhatsApp } from './icons'

/*
  The desktop scroll scene — Marlin's layout, carried over.

  Drawn on a fixed STAGE_W x STAGE_H artboard, every element absolutely placed
  at its design coordinate, and the artboard scaled to the window's WIDTH
  (never a min-fit, which pillarboxes, or a max-cover, which crops). The
  sticky frame is max(artboard height, 100vh) tall so the full-bleed layers
  carry on below the artboard on windows taller than 16:9.

  Do not wrap the artboard's children in flex or grid; change coordinates.

  Marlin's two scrubbed jetski clips are replaced by a wall of the salon's own
  photos, five columns drifting at different rates. It is viewport-level, not
  on the artboard, so it always spans the window edge to edge.

  This scene only renders on windows 1100px and wider with motion allowed.
  Below that the width-locked artboard would shrink body copy past legible;
  App swaps in FlowHero instead.
*/

const STAGE_W = 1440
const STAGE_H = 810

const SAFE_L = 96
const GROUP_W = STAGE_W - SAFE_L * 2

const px = (n: number) => `${n}px`
const box = (x: number, y: number, w?: number, h?: number): CSSProperties => ({
  position: 'absolute',
  left: px(x),
  top: px(y),
  ...(w != null ? { width: px(w) } : null),
  ...(h != null ? { height: px(h) } : null),
})

/* Four category cards, at the corners of Group 2's box. */
const CARD_POS = [
  { x: 0, y: 0 },
  { x: GROUP_W - 255, y: 0 },
  { x: 116, y: 240 },
  { x: GROUP_W - 371, y: 240 },
]

const BODY = [
  'Skin fades, beard line-ups, braids, twists',
  "and kids' cuts — clean, unhurried work from",
  'barbers who know their craft. Right here in Alberton.',
]

/** Reveals behind a clip mask, rising. */
function Mask({ t, children, style }: { t: number; children: ReactNode; style?: CSSProperties }) {
  return (
    <span style={{ display: 'block', ...style, overflow: 'hidden' }}>
      <span style={{ display: 'block', height: '100%', transform: `translateY(${(1 - t) * 115}%)`, willChange: 'transform' }}>
        {children}
      </span>
    </span>
  )
}

export default function Stage() {
  const wrap = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [p, setP] = useState(0)
  const ms = useClock(INTRO_END)

  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => setP(v))

  useLayoutEffect(() => {
    const fit = () => setScale(window.innerWidth / STAGE_W)
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  /* group positions, interpolated across the four frames */
  const m1 = ramp(p, P.move1)
  const m2 = ramp(p, P.move2)
  const y1 = lerp(G.g1.start, G.g1.end, m1)
  const y2 = lerp(lerp(G.g2.enter, G.g2.mid, m1), G.g2.end, m2)
  const y3 = lerp(lerp(G.g3.enter, G.g3.mid, m1), G.g3.end, m2)

  const stat = span(ms, INTRO.stat)
  const hidden = (y: number, h: number) => y + h < -40 || y > STAGE_H + 40

  return (
    <div ref={wrap} id="top" style={{ height: `${SCROLL_VH}vh`, background: 'var(--color-ink)' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: `max(calc(100vw * ${STAGE_H} / ${STAGE_W}), 100vh)`,
          overflow: 'hidden',
        }}
      >
        {/* ---- the photo wall, viewport-wide ---- */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, display: 'flex', gap: '0.5vw', padding: '0 0.25vw' }}>
          {WALL.map((col, c) => {
            const travel = WALL_TRAVEL_VW * WALL_RATES[c] * p
            const y = c % 2 ? -WALL_TRAVEL_VW * WALL_RATES[c] + travel : -travel
            return (
              <div
                key={c}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5vw',
                  transform: `translateY(${y}vw)`,
                  willChange: 'transform',
                }}
              >
                {col.map((id, i) => (
                  <img
                    key={id}
                    src={img(id)}
                    alt=""
                    /* eager: native lazy-loading misses tiles that arrive by
                       transform rather than by scrolling, and leaves holes */
                    loading="eager"
                    fetchPriority={i < 3 ? 'auto' : 'low'}
                    decoding="async"
                    style={{ width: '100%', aspectRatio: '4 / 5', objectFit: 'cover', borderRadius: '0.8vw', display: 'block' }}
                  />
                ))}
              </div>
            )
          })}
        </div>
        {/* a flat dim so the wall reads as texture, lifting a little as the story goes on */}
        <div
          aria-hidden
          style={{ position: 'absolute', inset: 0, background: 'rgba(9,8,7,1)', opacity: 0.62 - 0.12 * m1, pointerEvents: 'none' }}
        />

        {/* ---- section scrims, viewport-wide ---- */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, rgba(9,8,7,0.94) 0%, rgba(9,8,7,0.7) 40%, rgba(9,8,7,0.1) 72%)',
            opacity: 1 - m1,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(64% 56% at 50% 78%, rgba(9,8,7,0.92) 0%, rgba(9,8,7,0.5) 58%, rgba(9,8,7,0.15) 100%)',
            opacity: m1 * (1 - m2),
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(9,8,7,0.1) 30%, rgba(9,8,7,0.86) 66%, rgba(9,8,7,0.95) 100%)',
            opacity: m2,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: px(STAGE_W),
            height: px(STAGE_H),
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            zIndex: 2,
          }}
        >
          {/* ================= GROUP 1 — the hero ================= */}
          <div
            style={{
              ...box(SAFE_L, 0, GROUP_W, 642),
              transform: `translateY(${y1}px)`,
              willChange: 'transform',
              visibility: hidden(y1, 642) ? 'hidden' : 'visible',
            }}
          >
            <div className="label" style={{ position: 'absolute', left: 0, top: px(-52), color: 'var(--color-gold)', opacity: span(ms, INTRO.word) }}>
              Barber & hair salon · Alberton, Gauteng
            </div>
            <h1 style={{ margin: 0 }}>
              {(['Fresh.', 'Sharp.', 'Crowned.'] as const).map((w, i) => (
                <Mask
                  key={w}
                  t={span(ms, [INTRO.word, INTRO.word2, INTRO.word3][i])}
                  style={{ position: 'absolute', left: 0, top: px(-8 + i * 62), width: px(640), height: px(94) }}
                >
                  <span className="display" style={{ display: 'block', fontSize: px(72), lineHeight: px(86) }}>
                    {i === 2 ? <span style={{ color: 'var(--color-gold)' }}>{w}</span> : w}
                  </span>
                </Mask>
              ))}
            </h1>

            {BODY.map((line, i) => (
              <Mask
                key={line}
                t={span(ms, [INTRO.body1, INTRO.body2, INTRO.body3][i])}
                style={{ position: 'absolute', left: 0, top: px(264 + i * 28), width: px(560), height: px(32) }}
              >
                <span style={{ display: 'block', fontSize: px(18), lineHeight: px(26), color: 'rgba(255,255,255,0.86)' }}>{line}</span>
              </Mask>
            ))}

            <div style={{ position: 'absolute', left: 0, top: px(400), opacity: span(ms, INTRO.body3), display: 'flex', gap: px(14) }}>
              <a href={whatsappHref()} target="_blank" rel="noopener" className="btn btn-gold">
                <WhatsApp size={17} />
                Book on WhatsApp
              </a>
              <a href={url('/gallery/')} className="btn btn-ghost" style={{ paddingRight: 10 }}>
                See the work
                <span
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.16)',
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  <ArrowRight size={14} />
                </span>
              </a>
            </div>

            <OpenCard
              t={stat}
              style={{
                position: 'absolute',
                left: px(GROUP_W - 459),
                top: px(290),
                width: px(459),
                boxSizing: 'border-box',
                opacity: stat,
                transform: `translateY(${(1 - stat) * 28}px)`,
              }}
            />
          </div>

          {/* ================= GROUP 2 — what we do ================= */}
          <div
            style={{
              ...box(SAFE_L, 0, GROUP_W, 640),
              transform: `translateY(${y2}px)`,
              willChange: 'transform',
              visibility: hidden(y2, 640) ? 'hidden' : 'visible',
            }}
          >
            {CARDS.map((c, i) => {
              const t = span(p, [P.g2In[0] + i * 0.004, P.g2In[1]])
              const pos = CARD_POS[i]
              return (
                <a
                  key={c.photo}
                  href={url('/services/')}
                  aria-label={`${c.label.join(' ')} — see services`}
                  style={{ position: 'absolute', left: px(pos.x), top: px(pos.y), width: px(255), height: px(215), opacity: t, color: '#fff', textDecoration: 'none' }}
                >
                  <div style={{ position: 'absolute', inset: 0, borderRadius: px(46), overflow: 'hidden' }}>
                    <img
                      src={img(c.photo)}
                      alt=""
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 28%' }}
                    />
                    {/* the label sits on a photo, so it gets its own ground */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(150deg, rgba(9,8,7,0.85) 0%, rgba(9,8,7,0.35) 52%, rgba(9,8,7,0.05) 100%)',
                      }}
                    />
                  </div>
                  <div
                    style={{ position: 'absolute', inset: 0, borderRadius: px(46), border: '1px solid rgba(201,162,63,0.45)', pointerEvents: 'none' }}
                  />
                  <div
                    className="display"
                    style={{ position: 'absolute', left: px(24), top: px(30), fontSize: px(19), lineHeight: px(23), fontVariationSettings: '"wdth" 125, "wght" 650' }}
                  >
                    {c.label[0]}
                    <br />
                    {c.label[1]}
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      left: px(174),
                      top: px(17),
                      width: px(62),
                      height: px(62),
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.2)',
                      border: '1px solid rgba(255,255,255,0.4)',
                      display: 'grid',
                      placeItems: 'center',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    <ArrowUpRight size={20} />
                  </div>
                </a>
              )
            })}

            <h2
              className="display"
              style={{ position: 'absolute', left: 0, width: px(GROUP_W), top: px(462), margin: 0, fontSize: px(72), textAlign: 'center' }}
            >
              Crowned in the <span className="accent" style={{ fontSize: px(92), fontWeight: 600 }}>chair</span>
            </h2>
            <p
              style={{
                position: 'absolute',
                left: px((GROUP_W - 660) / 2),
                top: px(560),
                width: px(660),
                margin: 0,
                fontSize: px(21),
                lineHeight: px(32),
                textAlign: 'center',
                color: 'rgba(255,255,255,0.88)',
              }}
            >
              Fades blended by hand, lines kept razor-clean, and real time taken over every head that sits down.
            </p>
          </div>

          {/* ================= GROUP 3 — the invitation ================= */}
          <div
            style={{
              ...box(SAFE_L, 0, GROUP_W, 810),
              transform: `translateY(${y3}px)`,
              willChange: 'transform',
              visibility: hidden(y3 + 380, 430) ? 'hidden' : 'visible',
            }}
          >
            <div style={{ position: 'absolute', left: 0, top: px(404), width: px(56), height: px(2), background: 'var(--color-gold)' }} />
            <h2 className="display" style={{ position: 'absolute', left: 0, top: px(430), width: px(640), margin: 0, fontSize: px(54), lineHeight: px(58) }}>
              Walk in rough.
              <br />
              Walk out <span className="accent" style={{ fontSize: px(70) }}>crowned.</span>
            </h2>
            <div style={{ position: 'absolute', left: px(GROUP_W - 460), top: px(434), width: px(460) }}>
              <p style={{ margin: 0, fontSize: px(17), lineHeight: px(28), color: 'rgba(255,255,255,0.82)' }}>
                From a quick line-up before work to a full braid session on a Saturday, Tanganyika is a neighbourhood salon for
                the whole family — men, ladies and kids. Pull up a chair and leave looking sharp.
              </p>
              <div style={{ display: 'flex', gap: px(12), marginTop: px(24) }}>
                <a href={url('/services/')} className="btn btn-ghost">
                  Services & prices
                </a>
                <a href={url('/visit/')} className="btn btn-ghost">
                  Find us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

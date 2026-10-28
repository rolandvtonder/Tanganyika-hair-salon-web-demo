import { BUSINESS, HOURS, DAY_NAMES, whatsappHref, directionsHref } from './content'
import { useOpenState } from './hooks'
import { Clock, MapPin, Phone, WhatsApp, ArrowUpRight } from './icons'

/* Monday first for reading; HOURS stays Sunday-first to match getDay(). */
const ORDER = [1, 2, 3, 4, 5, 6, 0]

export default function Visit() {
  const s = useOpenState()
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(BUSINESS.mapQuery)}&z=15&output=embed`

  return (
    <section id="visit" aria-labelledby="visit-h" className="px-4 pb-24 pt-36 sm:px-8 lg:pb-32 lg:pt-44" style={{ background: 'var(--color-ink)' }}>
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-14">
        <div>
          <div className="label" style={{ color: 'var(--color-gold)' }}>
            Visit
          </div>
          <h1 id="visit-h" className="display" style={{ margin: '16px 0 0', fontSize: 'clamp(36px, 6.4vw, 68px)', lineHeight: 1.04 }}>
            Pull up <span className="accent" style={{ fontSize: '1.22em' }}>a chair.</span>
          </h1>

          <div className="mt-10 flex gap-4">
            <MapPin size={22} style={{ color: 'var(--color-gold)', flexShrink: 0, marginTop: 2 }} />
            <address className="not-italic text-[17px] leading-7">
              {BUSINESS.street}
              <br />
              <span style={{ color: 'rgba(255,255,255,0.66)' }}>{BUSINESS.area}</span>
            </address>
          </div>

          <div className="mt-8 flex gap-4">
            <Clock size={22} style={{ color: 'var(--color-gold)', flexShrink: 0, marginTop: 2 }} />
            <div className="flex-1">
              <div className="label" style={{ color: s.open ? '#8fe0a0' : 'rgba(255,255,255,0.7)' }}>
                {s.open ? 'Open now' : 'Closed now'} · {s.line}
              </div>
              <table className="mt-3 w-full max-w-sm border-collapse text-[15px]">
                <caption className="sr-only">Trading hours</caption>
                <tbody>
                  {ORDER.map((d) => {
                    const h = HOURS[d]
                    const today = d === s.day
                    return (
                      <tr
                        key={d}
                        aria-current={today ? 'date' : undefined}
                        style={{
                          borderBottom: '1px solid rgba(255,255,255,0.08)',
                          color: today ? '#fff' : 'rgba(255,255,255,0.7)',
                          fontWeight: today ? 700 : 400,
                        }}
                      >
                        <th scope="row" className="py-2 text-left font-[inherit]">
                          {DAY_NAMES[d]}
                          {today && (
                            <span className="label ml-2" style={{ fontSize: 10, color: 'var(--color-gold)' }}>
                              Today
                            </span>
                          )}
                        </th>
                        <td className="py-2 text-right tabular-nums">{h ? `${h.open} – ${h.close}` : 'Closed'}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href={whatsappHref()} target="_blank" rel="noopener" className="btn btn-gold">
              <WhatsApp size={17} />
              WhatsApp
            </a>
            <a href={`tel:${BUSINESS.phoneTel}`} className="btn btn-ghost">
              <Phone size={16} />
              {BUSINESS.phoneDisplay}
            </a>
            <a href={directionsHref()} target="_blank" rel="noopener" className="btn btn-ghost">
              Directions
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>

        <div
          className="relative overflow-hidden"
          style={{ borderRadius: 28, border: '1px solid rgba(255,255,255,0.12)', minHeight: 380, background: 'var(--color-ink-3)' }}
        >
          <iframe
            title={`Map showing ${BUSINESS.name} in ${BUSINESS.area}`}
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0"
            /* a dark, desaturated map so it sits in the page instead of glaring */
            style={{ filter: 'grayscale(1) invert(0.9) contrast(0.92) brightness(0.95)' }}
          />
        </div>
      </div>
    </section>
  )
}

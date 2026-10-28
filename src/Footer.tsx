/*
  Footer, structured after Marlin's: a CTA band across the top, a rule, the
  brand column beside three link columns, a legal bar, and the oversized
  wordmark fading out at the bottom. The newsletter box became a booking
  band — a salon's visitors want a chair, not a mailing list.
*/
import { BUSINESS, HOURS, SERVICES, whatsappHref, directionsHref, url } from './content'
import { WhatsApp, Phone, Facebook } from './icons'

const fmt = (d: number) => {
  const h = HOURS[d]
  return h ? `${h.open} – ${h.close}` : 'Closed'
}

const COLUMNS = [
  { head: 'Services', links: SERVICES.flatMap((g) => g.items.slice(0, 2)).map((s) => ({ t: s.name, href: url('/services/') })) },
  {
    head: 'Hours',
    links: [
      { t: `Mon – Thu  ${fmt(1)}`, href: url('/visit/') },
      { t: `Fri  ${fmt(5)}`, href: url('/visit/') },
      { t: `Sat  ${fmt(6)}`, href: url('/visit/') },
      { t: `Sun  ${fmt(0)}`, href: url('/visit/') },
    ],
  },
  {
    head: 'Find us',
    links: [
      { t: 'Directions', href: directionsHref(), ext: true },
      { t: 'WhatsApp', href: whatsappHref(), ext: true },
      { t: 'Facebook', href: BUSINESS.facebook, ext: true },
      { t: 'Gallery', href: url('/gallery/') },
      { t: 'About & FAQ', href: url('/about/') },
    ],
  },
]

export default function Footer() {
  return (
    <footer style={{ background: '#080706', padding: '0 clamp(12px, 2vw, 24px)', position: 'relative', zIndex: 1 }}>
      <div
        style={{
          maxWidth: 1312,
          margin: '0 auto',
          border: '1px solid rgba(255,255,255,0.10)',
          borderRadius: 28,
          background: 'linear-gradient(180deg, rgba(30,25,20,0.9) 0%, rgba(13,11,9,0.9) 100%)',
          padding: 'clamp(32px, 5vw, 56px) clamp(20px, 5vw, 56px) 8px',
          overflow: 'hidden',
        }}
      >
        {/* ---- CTA band ---- */}
        <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ flex: '1 1 420px' }}>
            <span
              className="label"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '7px 14px',
                borderRadius: 999,
                border: '1px solid rgba(255,255,255,0.16)',
                color: 'rgba(255,255,255,0.82)',
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-gold)' }} />
              Walk-ins welcome
            </span>
            <h2 className="display" style={{ margin: '20px 0 0', fontSize: 'clamp(30px, 4.4vw, 42px)', lineHeight: 1.08 }}>
              Your chair is waiting,{' '}
              <span className="accent" style={{ fontSize: '1.2em' }}>
                book your way
              </span>
            </h2>
            <p style={{ margin: '14px 0 0', fontSize: 15, lineHeight: '24px', color: 'rgba(255,255,255,0.64)', maxWidth: 440 }}>
              WhatsApp us a time, give us a call, or just come through.
            </p>
          </div>

          <div style={{ flex: '0 1 auto', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href={whatsappHref()} target="_blank" rel="noopener" className="btn btn-gold">
              <WhatsApp size={17} />
              Book on WhatsApp
            </a>
            <a href={`tel:${BUSINESS.phoneTel}`} className="btn btn-ghost">
              <Phone size={16} />
              Call us
            </a>
          </div>
        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.10)', margin: '44px 0 40px' }} />

        {/* ---- brand + link columns ---- */}
        <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 300px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <img src={url('/media/logo-192.webp')} alt="" width={52} height={52} loading="lazy" style={{ borderRadius: '50%' }} />
              <span className="display" style={{ fontSize: 17, letterSpacing: '0.12em', fontVariationSettings: '"wdth" 125, "wght" 700' }}>
                {BUSINESS.short.toUpperCase()}
              </span>
            </div>
            <p style={{ margin: '16px 0 0', fontSize: 14, lineHeight: '22px', color: 'rgba(255,255,255,0.6)', maxWidth: 280 }}>
              Barber and hair salon for men, ladies and kids in {BUSINESS.area}.
            </p>
            <a
              href={BUSINESS.facebook}
              target="_blank"
              rel="noopener"
              aria-label="Tanganyika Hair Salon on Facebook"
              style={{
                marginTop: 18,
                display: 'inline-grid',
                placeItems: 'center',
                width: 44,
                height: 44,
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.18)',
                color: '#fff',
              }}
            >
              <Facebook size={18} />
            </a>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.head} aria-label={col.head} style={{ flex: '0 1 180px' }}>
              <div className="label" style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 14 }}>
                {col.head}
              </div>
              {col.links.map((l) => (
                <div key={l.t} style={{ fontSize: 14, lineHeight: '32px' }}>
                  <a
                    href={l.href}
                    className="link-underline"
                    style={{ color: 'rgba(255,255,255,0.8)', whiteSpace: 'pre' }}
                    {...('ext' in l && l.ext ? { target: '_blank', rel: 'noopener' } : null)}
                  >
                    {l.t}
                  </a>
                </div>
              ))}
            </nav>
          ))}
        </div>

        {/* ---- legal bar ---- */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 16,
            flexWrap: 'wrap',
            fontSize: 13,
            color: 'rgba(255,255,255,0.5)',
            borderTop: '1px solid rgba(255,255,255,0.10)',
            marginTop: 40,
            padding: '20px 0 24px',
          }}
        >
          <span>&#169; {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.</span>
          <span>{BUSINESS.area}</span>
        </div>

        {/* ---- the wordmark, fading into the panel ---- */}
        <div
          aria-hidden
          className="display"
          style={{
            fontSize: 'clamp(34px, 10.2vw, 148px)',
            lineHeight: 1.04,
            textAlign: 'center',
            letterSpacing: '0.02em',
            fontVariationSettings: '"wdth" 112, "wght" 800',
            background: 'linear-gradient(180deg, rgba(201,162,63,0.42) 0%, rgba(201,162,63,0.03) 82%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            userSelect: 'none',
            marginBottom: 4,
            whiteSpace: 'nowrap',
          }}
        >
          TANGANYIKA
        </div>
      </div>
      <div style={{ height: 24 }} />
    </footer>
  )
}

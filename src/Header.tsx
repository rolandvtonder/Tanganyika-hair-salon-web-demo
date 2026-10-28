import { useEffect, useState } from 'react'
import { BUSINESS, PAGES, whatsappHref, type PageKey, url } from './content'
import { Close, WhatsApp } from './icons'

/*
  Marlin's nav bar, lifted out of the stage and fixed to the window so it can
  carry real links over every page. Same treatment: a gradient rather than a
  bar, with the blur masked by the same gradient so it fades out with the
  tint instead of ending on a hard line across the photos.

  Under 720px the centre links give way to a Menu button that opens a sheet —
  with the sections on separate pages, phones need a way to reach them.
*/
export default function Header({ current }: { current: PageKey }) {
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    if (!menu) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [menu])

  return (
    <header
      style={{
        position: 'fixed',
        inset: '0 0 auto 0',
        height: 112,
        display: 'flex',
        alignItems: 'flex-start',
        padding: '18px clamp(16px, 3vw, 40px) 0',
        gap: 32,
        zIndex: 50,
        pointerEvents: 'none',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(8,7,6,0.82) 0%, rgba(8,7,6,0.45) 46%, rgba(8,7,6,0) 100%)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          maskImage: 'linear-gradient(180deg, #000 0%, #000 42%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(180deg, #000 0%, #000 42%, transparent 100%)',
        }}
      />
      <a
        href={url('/')}
        aria-label={`${BUSINESS.name}, home`}
        aria-current={current === 'home' ? 'page' : undefined}
        style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', pointerEvents: 'auto' }}
      >
        <img
          src={url('/media/logo-192.webp')}
          alt=""
          width={44}
          height={44}
          style={{ borderRadius: '50%', border: '1px solid rgba(201,162,63,0.55)' }}
        />
        <span className="display" style={{ fontSize: 16, letterSpacing: '0.14em', fontVariationSettings: '"wdth" 125, "wght" 700' }}>
          {BUSINESS.short.toUpperCase()}
        </span>
      </a>

      <nav
        aria-label="Main"
        className="nav-links"
        style={{ position: 'relative', flex: 1, display: 'flex', justifyContent: 'center', gap: 48, paddingTop: 15 }}
      >
        {PAGES.map((n) => {
          const on = n.key === current
          return (
            <a
              key={n.key}
              href={n.href}
              aria-current={on ? 'page' : undefined}
              className="label link-underline"
              style={{
                color: on ? 'var(--color-gold-hi)' : 'rgba(255,255,255,0.82)',
                backgroundSize: on ? '100% 1px' : undefined,
                pointerEvents: 'auto',
                paddingBottom: 3,
              }}
            >
              {n.key === 'services' ? 'Services' : n.name.replace(' us', '')}
            </a>
          )
        })}
      </nav>

      <a
        href={whatsappHref()}
        target="_blank"
        rel="noopener"
        className="btn btn-gold header-book"
        style={{ position: 'relative', marginLeft: 'auto', height: 44, padding: '0 20px', pointerEvents: 'auto' }}
      >
        <WhatsApp size={16} />
        Book
      </a>

      <button
        type="button"
        className="btn btn-ghost nav-menu-btn"
        aria-expanded={menu}
        aria-controls="site-menu"
        onClick={() => setMenu((m) => !m)}
        style={{ position: 'relative', marginLeft: 'auto', height: 44, padding: '0 16px', pointerEvents: 'auto' }}
      >
        {menu ? <Close size={16} /> : <MenuIcon />}
        <span className="sr-only">{menu ? 'Close menu' : 'Open menu'}</span>
      </button>

      {menu && (
        <nav
          id="site-menu"
          aria-label="Main"
          style={{
            position: 'fixed',
            inset: '80px 12px auto 12px',
            padding: 8,
            borderRadius: 24,
            background: 'rgba(18,16,14,0.97)',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 30px 60px -20px rgba(0,0,0,0.8)',
            pointerEvents: 'auto',
          }}
        >
          {[{ key: 'home' as const, name: 'Home', href: url('/'), blurb: 'Back to the start' }, ...PAGES].map((n) => {
            const on = n.key === current
            return (
              <a
                key={n.key}
                href={n.href}
                aria-current={on ? 'page' : undefined}
                onClick={() => setMenu(false)}
                style={{
                  display: 'block',
                  padding: '14px 16px',
                  borderRadius: 16,
                  textDecoration: 'none',
                  color: '#fff',
                  background: on ? 'rgba(201,162,63,0.12)' : undefined,
                }}
              >
                <span
                  className="display"
                  style={{
                    display: 'block',
                    fontSize: 20,
                    lineHeight: 1.2,
                    fontVariationSettings: '"wdth" 120, "wght" 700',
                    color: on ? 'var(--color-gold-hi)' : '#fff',
                  }}
                >
                  {n.name}
                </span>
                <span style={{ display: 'block', marginTop: 4, fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>{n.blurb}</span>
              </a>
            )
          })}
        </nav>
      )}
    </header>
  )
}

function MenuIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" aria-hidden focusable={false}>
      <path d="M4 7h16M4 12h16M4 17h10" />
    </svg>
  )
}

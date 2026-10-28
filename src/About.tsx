import { ABOUT, FAQ, img, altFor, whatsappHref } from './content'
import { ArrowRight, WhatsApp } from './icons'

/* Search engines read this to show the questions as an FAQ result. */
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}

export default function About() {
  return (
    <>
      {/* ---- the story ---- */}
      <section aria-labelledby="about-h" className="px-4 pb-20 pt-36 sm:px-8 lg:pb-28 lg:pt-44" style={{ background: 'var(--color-ink)' }}>
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-16">
          <div>
            <div className="label" style={{ color: 'var(--color-gold)' }}>
              About
            </div>
            <h1 id="about-h" className="display" style={{ margin: '16px 0 0', fontSize: 'clamp(36px, 6.4vw, 68px)', lineHeight: 1.04 }}>
              A chair for <span className="accent" style={{ fontSize: '1.22em' }}>the whole family.</span>
            </h1>
            {ABOUT.story.map((p) => (
              <p key={p} className="mb-0 mt-6 max-w-xl text-[17px] leading-7" style={{ color: 'rgba(255,255,255,0.82)' }}>
                {p}
              </p>
            ))}
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={whatsappHref()} target="_blank" rel="noopener" className="btn btn-gold">
                <WhatsApp size={17} />
                Book on WhatsApp
              </a>
              <a href="#faq-h" className="btn btn-ghost">
                Questions?
                <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* three barbers-at-work shots, stepped like the scroll scene's cards */}
          <div className="grid grid-cols-3 gap-3">
            {ABOUT.photos.map((id, i) => (
              <img
                key={id}
                src={img(id)}
                alt={altFor(id)}
                className="w-full object-cover"
                style={{
                  aspectRatio: '3 / 5',
                  borderRadius: 28,
                  border: '1px solid rgba(201,162,63,0.4)',
                  objectPosition: 'center 35%',
                  marginTop: [0, 40, 80][i],
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ---- what to expect ---- */}
      <section aria-labelledby="expect-h" className="px-4 py-20 sm:px-8 lg:py-28" style={{ background: 'var(--color-ink-2)' }}>
        <div className="mx-auto max-w-6xl">
          <div className="label" style={{ color: 'var(--color-gold)' }}>
            Your visit
          </div>
          <h2 id="expect-h" className="display" style={{ margin: '16px 0 0', fontSize: 'clamp(30px, 5vw, 52px)', lineHeight: 1.06 }}>
            What to <span className="accent" style={{ fontSize: '1.22em' }}>expect.</span>
          </h2>
          <ol className="m-0 mt-12 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {ABOUT.steps.map((s, i) => (
              <li key={s.title} className="glass" style={{ borderRadius: 28, padding: '28px 26px 30px' }}>
                <div
                  className="display"
                  aria-hidden
                  style={{ fontSize: 40, lineHeight: 1, color: 'var(--color-gold)', fontVariationSettings: '"wdth" 125, "wght" 300' }}
                >
                  0{i + 1}
                </div>
                <h3 className="m-0 mt-6 text-lg font-bold">{s.title}</h3>
                <p className="mb-0 mt-2 text-[15px] leading-6" style={{ color: 'rgba(255,255,255,0.68)' }}>
                  {s.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---- FAQ: native <details>, so it works with keyboard and screen
           readers and opens without any script ---- */}
      <section aria-labelledby="faq-h" className="px-4 py-20 sm:px-8 lg:py-28" style={{ background: 'var(--color-ink)' }}>
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <div className="label" style={{ color: 'var(--color-gold)' }}>
              FAQ
            </div>
            <h2 id="faq-h" className="display" style={{ margin: '16px 0 0', fontSize: 'clamp(30px, 5vw, 52px)', lineHeight: 1.06, scrollMarginTop: 120 }}>
              Good <span className="accent" style={{ fontSize: '1.22em' }}>questions.</span>
            </h2>
            <p className="mb-0 mt-5 max-w-sm text-[15px] leading-6" style={{ color: 'rgba(255,255,255,0.66)' }}>
              Something we haven't covered? Send us a WhatsApp and we'll get back to you.
            </p>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
            {FAQ.map((f) => (
              <details key={f.q} className="faq" style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold">
                  {f.q}
                  <span aria-hidden className="faq-icon grid h-9 w-9 shrink-0 place-items-center rounded-full">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                      <path d="M7 1v12M1 7h12" />
                    </svg>
                  </span>
                </summary>
                <div className="pb-6 pr-14">
                  <p className="m-0 text-base leading-7" style={{ color: 'rgba(255,255,255,0.74)' }}>
                    {f.a}
                  </p>
                  {f.link && (
                    <a
                      href={f.link.href}
                      {...(f.link.href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : null)}
                      className="label link-underline mt-4 inline-flex items-center gap-2"
                      style={{ color: 'var(--color-gold-hi)' }}
                    >
                      {f.link.label}
                      <ArrowRight size={13} />
                    </a>
                  )}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  )
}

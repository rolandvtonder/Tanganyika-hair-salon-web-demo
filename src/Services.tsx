import { SERVICES, img, whatsappHref, altFor, type Service } from './content'
import { WhatsApp } from './icons'

const price = (s: Service) =>
  s.price == null ? 'Ask for price' : `${s.from ? 'from ' : ''}R${s.price.toLocaleString('en-ZA')}`

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-h" className="relative px-4 pb-24 pt-36 sm:px-8 lg:pb-32 lg:pt-44" style={{ background: 'var(--color-ink)' }}>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="label" style={{ color: 'var(--color-gold)' }}>
              Services & prices
            </div>
            <h1 id="services-h" className="display" style={{ margin: '16px 0 0', fontSize: 'clamp(36px, 6.4vw, 68px)', lineHeight: 1.04 }}>
              Every cut, <span className="accent" style={{ fontSize: '1.22em' }}>done properly.</span>
            </h1>
          </div>
          <p className="max-w-sm text-[15px] leading-6" style={{ color: 'rgba(255,255,255,0.66)' }}>
            Walk-ins are welcome. For braids and longer styles, send a WhatsApp first so we can keep a chair for you.
          </p>
        </div>

        <div className="mt-14 flex flex-col gap-16 lg:gap-20">
          {SERVICES.map((g, gi) => (
            <div key={g.group} className="grid items-start gap-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-12">
              <figure
                className={`relative m-0 overflow-hidden ${gi % 2 ? 'md:order-2' : ''}`}
                style={{ borderRadius: 28, aspectRatio: '5 / 4', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <img
                  src={img(g.photo, 'lg')}
                  alt={altFor(g.photo)}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ objectPosition: 'center 30%' }}
                />
                <figcaption
                  className="display absolute bottom-0 left-0 right-0 px-6 pb-5 pt-16"
                  style={{
                    fontSize: 22,
                    fontVariationSettings: '"wdth" 125, "wght" 700',
                    background: 'linear-gradient(180deg, rgba(9,8,7,0) 0%, rgba(9,8,7,0.85) 100%)',
                  }}
                >
                  {g.group}
                </figcaption>
              </figure>

              <ul className="m-0 list-none p-0">
                {g.items.map((s) => (
                  <li key={s.name} className="py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <div className="flex items-baseline gap-3">
                      <h3 className="m-0 text-lg font-semibold">{s.name}</h3>
                      <span aria-hidden className="flex-1" style={{ borderBottom: '1px dotted rgba(201,162,63,0.45)', transform: 'translateY(-4px)' }} />
                      <span
                        className="display whitespace-nowrap"
                        style={{
                          fontSize: s.price == null ? 13 : 18,
                          fontVariationSettings: '"wdth" 115, "wght" 600',
                          color: s.price == null ? 'rgba(255,255,255,0.62)' : 'var(--color-gold-hi)',
                        }}
                      >
                        {price(s)}
                      </span>
                    </div>
                    <p className="mb-0 mt-1.5 text-[15px] leading-6" style={{ color: 'rgba(255,255,255,0.64)' }}>
                      {s.note}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-4">
          <a href={whatsappHref()} target="_blank" rel="noopener" className="btn btn-gold">
            <WhatsApp size={17} />
            Ask about a style
          </a>
          <span className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Send us a photo of the look you want and we'll tell you the price.
          </span>
        </div>
      </div>
    </section>
  )
}

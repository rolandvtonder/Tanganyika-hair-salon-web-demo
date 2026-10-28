import { PAGES, img, type PageKey } from './content'
import { ArrowUpRight } from './icons'

/*
  Photo tiles linking to the other pages, in the same rounded, gold-edged
  style as the scroll scene's cards. Ends the home page, and closes each inner
  page with wherever the visitor might go next.
*/
export default function PageLinks({ current, title }: { current: PageKey; title: string }) {
  const pages = PAGES.filter((p) => p.key !== current)
  return (
    <section aria-labelledby="pagelinks-h" className="px-4 pb-24 pt-8 sm:px-8 lg:pb-32" style={{ background: 'var(--color-ink)' }}>
      <div className="mx-auto max-w-6xl">
        <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', marginBottom: 56 }} />
        <h2 id="pagelinks-h" className="label" style={{ margin: 0, color: 'var(--color-gold)' }}>
          {title}
        </h2>
        <ul className={`m-0 mt-6 grid list-none gap-4 p-0 ${pages.length === 3 ? 'md:grid-cols-3' : 'sm:grid-cols-2'}`}>
          {pages.map((p) => (
            <li key={p.key}>
              <a
                href={p.href}
                className="group relative block overflow-hidden text-white no-underline"
                style={{ aspectRatio: pages.length === 3 ? '4 / 3' : '16 / 9', borderRadius: 32, border: '1px solid rgba(201,162,63,0.4)' }}
              >
                <img
                  src={img(p.photo)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  style={{ objectPosition: 'center 45%' }}
                />
                <span
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(180deg, rgba(9,8,7,0.15) 0%, rgba(9,8,7,0.45) 45%, rgba(9,8,7,0.92) 100%)' }}
                />
                <span className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-6">
                  <span>
                    <span
                      className="display block"
                      style={{ fontSize: 'clamp(22px, 2.4vw, 28px)', lineHeight: 1.1, fontVariationSettings: '"wdth" 120, "wght" 750' }}
                    >
                      {p.name}
                    </span>
                    <span className="mt-2 block text-[15px]" style={{ color: 'rgba(255,255,255,0.75)' }}>
                      {p.blurb}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-full transition-colors duration-200 group-hover:bg-[var(--color-gold)] group-hover:text-[var(--color-ink)]"
                    style={{ border: '1px solid rgba(255,255,255,0.45)', background: 'rgba(255,255,255,0.12)' }}
                  >
                    <ArrowUpRight size={18} />
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

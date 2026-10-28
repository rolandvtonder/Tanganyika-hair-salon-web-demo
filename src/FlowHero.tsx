import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { CARDS, img, whatsappHref, url } from './content'
import OpenCard from './OpenCard'
import { ArrowRight, ArrowUpRight, WhatsApp } from './icons'

/*
  The same three sections as Stage, in ordinary flow, for phones, tablets and
  anyone who has asked their system for reduced motion. Stage's artboard is
  width-locked, so on a 390px phone its 18px body copy would render at 5px;
  here everything sits at its natural size and the choreography is reduced to
  a fade-up as each block comes into view.
*/

const COLLAGE = ['26', '16', '39', '59', '03', '20', '54', '00', '43']

/** Fades up into place when scrolled into view — or straight away with `now`,
    for the first screen, which should never wait on an observer. */
function Rise({ children, delay = 0, className, now }: { children: ReactNode; delay?: number; className?: string; now?: boolean }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      {...(now ? { animate: { opacity: 1, y: 0 } } : { whileInView: { opacity: 1, y: 0 } })}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function FlowHero() {
  return (
    <>
      <section id="top" className="relative overflow-hidden" style={{ minHeight: '100dvh' }}>
        <div aria-hidden className="absolute inset-0 grid grid-cols-3 gap-1.5 p-1.5" style={{ gridAutoRows: '1fr' }}>
          {COLLAGE.map((id) => (
            <img key={id} src={img(id)} alt="" className="h-full w-full rounded-xl object-cover" style={{ objectPosition: 'center 30%' }} />
          ))}
        </div>
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(9,8,7,0.6) 0%, rgba(9,8,7,0.82) 32%, rgba(9,8,7,0.97) 62%, #0b0a09 100%)' }}
        />

        <div className="relative mx-auto flex max-w-3xl flex-col px-4 pb-12 sm:px-8" style={{ paddingTop: 'max(34vh, 220px)' }}>
          <Rise now>
            <div className="label" style={{ color: 'var(--color-gold)' }}>
              Barber & hair salon · Alberton, Gauteng
            </div>
            <h1 className="display mt-4" style={{ margin: '16px 0 0', fontSize: 'clamp(46px, 13vw, 84px)', lineHeight: 1 }}>
              Fresh.
              <br />
              Sharp.
              <br />
              <span style={{ color: 'var(--color-gold)' }}>Crowned.</span>
            </h1>
          </Rise>
          <Rise now delay={0.1}>
            <p className="mt-6 max-w-xl text-[17px] leading-7" style={{ color: 'rgba(255,255,255,0.86)' }}>
              Skin fades, beard line-ups, braids, twists and kids' cuts — clean, unhurried work from barbers who know their
              craft. Right here in Alberton.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={whatsappHref()} target="_blank" rel="noopener" className="btn btn-gold">
                <WhatsApp size={17} />
                Book on WhatsApp
              </a>
              <a href={url('/gallery/')} className="btn btn-ghost">
                See the work
                <ArrowRight size={14} />
              </a>
            </div>
          </Rise>
          <Rise now delay={0.2} className="mt-10">
            <OpenCard style={{ maxWidth: 459, padding: '26px 24px 24px', borderRadius: 32 }} />
          </Rise>
        </div>
      </section>

      <section aria-labelledby="crowned" className="mx-auto max-w-5xl px-4 py-16 sm:px-8">
        <div className="grid grid-cols-2 gap-3 sm:gap-5">
          {CARDS.map((c, i) => (
            <Rise key={c.photo} delay={i * 0.06}>
              <a
                href={url('/services/')}
                aria-label={`${c.label.join(' ')} — see services`}
                className="relative block overflow-hidden text-white no-underline"
                style={{ aspectRatio: '255 / 215', borderRadius: 28, border: '1px solid rgba(201,162,63,0.45)' }}
              >
                <img src={img(c.photo)} alt="" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: 'center 28%' }} />
                <span
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(150deg, rgba(9,8,7,0.85) 0%, rgba(9,8,7,0.35) 55%, rgba(9,8,7,0.05) 100%)' }}
                />
                <span
                  className="display absolute left-4 top-4 block"
                  style={{ fontSize: 'clamp(15px, 4.4vw, 19px)', lineHeight: 1.2, fontVariationSettings: '"wdth" 125, "wght" 650' }}
                >
                  {c.label[0]}
                  <br />
                  {c.label[1]}
                </span>
                <span
                  className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full"
                  style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)' }}
                >
                  <ArrowUpRight size={16} />
                </span>
              </a>
            </Rise>
          ))}
        </div>
        <Rise className="mt-12 text-center">
          <h2 id="crowned" className="display" style={{ margin: 0, fontSize: 'clamp(34px, 9vw, 60px)', lineHeight: 1.05 }}>
            Crowned in the <span className="accent" style={{ fontSize: '1.25em' }}>chair</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-8" style={{ color: 'rgba(255,255,255,0.86)' }}>
            Fades blended by hand, lines kept razor-clean, and real time taken over every head that sits down.
          </p>
        </Rise>
      </section>

      <section aria-labelledby="walkin" className="mx-auto max-w-5xl px-4 pb-20 sm:px-8">
        <Rise>
          <div style={{ width: 56, height: 2, background: 'var(--color-gold)' }} />
          <h2 id="walkin" className="display mt-6" style={{ margin: '24px 0 0', fontSize: 'clamp(32px, 8.5vw, 54px)', lineHeight: 1.08 }}>
            Walk in rough.
            <br />
            Walk out <span className="accent" style={{ fontSize: '1.28em' }}>crowned.</span>
          </h2>
          <p className="mt-6 max-w-xl text-[17px] leading-7" style={{ color: 'rgba(255,255,255,0.82)' }}>
            From a quick line-up before work to a full braid session on a Saturday, Tanganyika is a neighbourhood salon for the
            whole family — men, ladies and kids. Pull up a chair and leave looking sharp.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={url('/services/')} className="btn btn-ghost">
              Services & prices
            </a>
            <a href={url('/visit/')} className="btn btn-ghost">
              Find us
            </a>
          </div>
        </Rise>
      </section>
    </>
  )
}

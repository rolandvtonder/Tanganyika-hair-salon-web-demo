import { useEffect, useRef, useState } from 'react'
import { GALLERY, img, altFor, BUSINESS } from './content'
import { ChevronLeft, ChevronRight, Close, Facebook } from './icons'

const STEP = 12

export default function Gallery() {
  const [shown, setShown] = useState(STEP)
  const [open, setOpen] = useState<number | null>(null)
  const dlg = useRef<HTMLDialogElement>(null)
  const opener = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const d = dlg.current
    if (!d) return
    if (open != null && !d.open) d.showModal()
    if (open == null && d.open) d.close()
  }, [open])

  const go = (dir: number) => setOpen((i) => (i == null ? i : (i + dir + GALLERY.length) % GALLERY.length))

  return (
    <section id="gallery" aria-labelledby="gallery-h" className="px-4 pb-24 pt-36 sm:px-8 lg:pb-32 lg:pt-44" style={{ background: 'var(--color-ink-2)' }}>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="label" style={{ color: 'var(--color-gold)' }}>
              Gallery
            </div>
            <h1 id="gallery-h" className="display" style={{ margin: '16px 0 0', fontSize: 'clamp(36px, 6.4vw, 68px)', lineHeight: 1.04 }}>
              Fresh off <span className="accent" style={{ fontSize: '1.22em' }}>the chair.</span>
            </h1>
          </div>
          <a href={BUSINESS.facebook} target="_blank" rel="noopener" className="btn btn-ghost">
            <Facebook size={16} />
            More on Facebook
          </a>
        </div>

        <ul className="m-0 mt-12 grid list-none grid-cols-2 gap-2 p-0 sm:gap-3 md:grid-cols-3 lg:grid-cols-4">
          {GALLERY.slice(0, shown).map((id, i) => (
            <li key={id}>
              <button
                type="button"
                onClick={(e) => {
                  opener.current = e.currentTarget
                  setOpen(i)
                }}
                aria-label={`Open photo: ${altFor(id)}`}
                className="group relative block w-full cursor-pointer overflow-hidden border-0 p-0"
                style={{ aspectRatio: '4 / 5', borderRadius: 18, background: 'var(--color-ink-3)' }}
              >
                <img
                  src={img(id)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  width={480}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ boxShadow: 'inset 0 0 0 2px var(--color-gold)', borderRadius: 18 }}
                />
              </button>
            </li>
          ))}
        </ul>

        {shown < GALLERY.length && (
          <div className="mt-10 flex justify-center">
            <button type="button" className="btn btn-ghost" onClick={() => setShown((n) => Math.min(GALLERY.length, n + STEP))}>
              Show more · {GALLERY.length - shown} to go
            </button>
          </div>
        )}
      </div>

      <dialog
        ref={dlg}
        className="lightbox"
        aria-label="Photo viewer"
        onClose={() => {
          setOpen(null)
          opener.current?.focus()
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(null)
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') go(1)
          if (e.key === 'ArrowLeft') go(-1)
        }}
      >
        {open != null && (
          <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-4" onClick={(e) => e.target === e.currentTarget && setOpen(null)}>
            <img
              src={img(GALLERY[open], 'lg')}
              alt={altFor(GALLERY[open])}
              className="max-h-[80dvh] max-w-full rounded-2xl object-contain"
            />
            <div className="flex items-center gap-4">
              <button type="button" className="btn btn-ghost" style={{ width: 48, padding: 0 }} aria-label="Previous photo" onClick={() => go(-1)}>
                <ChevronLeft />
              </button>
              <span className="label" aria-live="polite" style={{ color: 'rgba(255,255,255,0.7)', minWidth: 70, textAlign: 'center' }}>
                {open + 1} / {GALLERY.length}
              </span>
              <button type="button" className="btn btn-ghost" style={{ width: 48, padding: 0 }} aria-label="Next photo" onClick={() => go(1)}>
                <ChevronRight />
              </button>
            </div>
            <button
              type="button"
              autoFocus
              className="btn btn-ghost absolute right-4 top-4"
              style={{ width: 48, padding: 0 }}
              aria-label="Close photo viewer"
              onClick={() => setOpen(null)}
            >
              <Close />
            </button>
          </div>
        )}
      </dialog>
    </section>
  )
}

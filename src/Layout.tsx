import { StrictMode, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'motion/react'
import { whatsappHref, type PageKey } from './content'
import Header from './Header'
import Footer from './Footer'
import { WhatsApp } from './icons'
import './index.css'

/* The frame every page shares: skip link, header, footer, and the phone
   WhatsApp button. Each page's entry file just hands its content to mount(). */
function Layout({ page, children }: { page: PageKey; children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header current={page} />
      <main id="main">{children}</main>
      <Footer />

      {/* On phones the header's Book button sits at the top edge, out of
          thumb reach, so a WhatsApp button also stays at the bottom corner. */}
      <a
        href={whatsappHref()}
        target="_blank"
        rel="noopener"
        aria-label="Book on WhatsApp"
        className="btn btn-gold fab"
        style={{
          position: 'fixed',
          right: 16,
          bottom: 'max(16px, env(safe-area-inset-bottom))',
          width: 56,
          height: 56,
          padding: 0,
          zIndex: 40,
          boxShadow: '0 10px 30px -8px rgba(0,0,0,0.7)',
        }}
      >
        <WhatsApp size={24} />
      </a>
    </MotionConfig>
  )
}

export function mount(page: PageKey, children: ReactNode) {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Layout page={page}>{children}</Layout>
    </StrictMode>,
  )
}

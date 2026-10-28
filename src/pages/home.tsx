import { mount } from '../Layout'
import { useMediaQuery } from '../hooks'
import Stage from '../Stage'
import FlowHero from '../FlowHero'
import PageLinks from '../PageLinks'

/* The scroll scene on desktop windows; phones, tablets and reduced-motion
   visitors get the same story in normal flow. */
function Home() {
  const scene = useMediaQuery('(min-width: 1100px) and (prefers-reduced-motion: no-preference)')
  return (
    <>
      {scene ? <Stage /> : <FlowHero />}
      <PageLinks current="home" title="Explore the salon" />
    </>
  )
}

mount('home', <Home />)

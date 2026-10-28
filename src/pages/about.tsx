import { mount } from '../Layout'
import About from '../About'
import PageLinks from '../PageLinks'

mount(
  'about',
  <>
    <About />
    <PageLinks current="about" title="Keep exploring" />
  </>,
)

import { mount } from '../Layout'
import Gallery from '../Gallery'
import PageLinks from '../PageLinks'

mount(
  'gallery',
  <>
    <Gallery />
    <PageLinks current="gallery" title="Keep exploring" />
  </>,
)

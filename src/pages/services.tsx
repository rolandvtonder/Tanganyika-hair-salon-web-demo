import { mount } from '../Layout'
import Services from '../Services'
import PageLinks from '../PageLinks'

mount(
  'services',
  <>
    <Services />
    <PageLinks current="services" title="Keep exploring" />
  </>,
)

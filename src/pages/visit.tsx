import { mount } from '../Layout'
import Visit from '../Visit'
import PageLinks from '../PageLinks'

mount(
  'visit',
  <>
    <Visit />
    <PageLinks current="visit" title="Keep exploring" />
  </>,
)

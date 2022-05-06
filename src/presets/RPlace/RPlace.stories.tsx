import { ComponentStory, ComponentMeta } from '@storybook/react'
import { RPlace } from './RPlace'
import { Setup, HtmlContent } from '../../core/Setup/Setup'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'RPlace',
  component: RPlace,
} as ComponentMeta<typeof RPlace>

export const Default: ComponentStory<typeof RPlace> = (args) => (
  <Setup>
    <RPlace {...args} />
  </Setup>
)

export const WithHtml: ComponentStory<typeof RPlace> = (args) => (
  <Setup>
    <RPlace {...args} />
  </Setup>
)
WithHtml.args = { children: HtmlContent }

export const HalfWidth: ComponentStory<typeof RPlace> = (args) => (
  <Setup halfWidth>
    <RPlace {...args} />
  </Setup>
)

export const HalfHeight: ComponentStory<typeof RPlace> = (args) => (
  <Setup halfHeight>
    <RPlace {...args} />
  </Setup>
)

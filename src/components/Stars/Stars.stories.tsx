import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Stars } from './Stars'
import { Setup, HtmlContent } from '../Setup/Setup'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Stars',
  component: Stars,
} as ComponentMeta<typeof Stars>

export const Default: ComponentStory<typeof Stars> = (args) => (
  <Setup>
    <Stars {...args} />
  </Setup>
)

export const WithHtml: ComponentStory<typeof Stars> = (args) => (
  <Setup>
    <Stars {...args} />
  </Setup>
)
WithHtml.args = { children: HtmlContent }

export const HalfWidth: ComponentStory<typeof Stars> = (args) => (
  <Setup halfWidth>
    <Stars {...args} />
  </Setup>
)

export const HalfHeight: ComponentStory<typeof Stars> = (args) => (
  <Setup halfHeight>
    <Stars {...args} />
  </Setup>
)

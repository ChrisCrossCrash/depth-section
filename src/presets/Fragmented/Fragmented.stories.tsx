import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Fragmented } from './Fragmented'
import { Setup, HtmlContent } from '../../core/Setup/Setup'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Fragmented',
  component: Fragmented,
} as ComponentMeta<typeof Fragmented>

export const Default: ComponentStory<typeof Fragmented> = (args) => (
  <Setup>
    <Fragmented {...args} />
  </Setup>
)

export const WithHtml: ComponentStory<typeof Fragmented> = (args) => (
  <Setup>
    <Fragmented {...args} />
  </Setup>
)
WithHtml.args = { children: HtmlContent }

export const HalfWidth: ComponentStory<typeof Fragmented> = (args) => (
  <Setup halfWidth>
    <Fragmented {...args} />
  </Setup>
)

export const HalfHeight: ComponentStory<typeof Fragmented> = (args) => (
  <Setup halfHeight>
    <Fragmented {...args} />
  </Setup>
)

import { ComponentStory, ComponentMeta } from '@storybook/react'
import { TheGrid } from './TheGrid'
import { Setup, HtmlContent } from '../../core/Setup/Setup'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TheGrid',
  component: TheGrid,
} as ComponentMeta<typeof TheGrid>

export const Default: ComponentStory<typeof TheGrid> = (args) => (
  <Setup>
    <TheGrid {...args} />
  </Setup>
)

export const WithHtml: ComponentStory<typeof TheGrid> = (args) => (
  <Setup>
    <TheGrid {...args} />
  </Setup>
)
WithHtml.args = { children: HtmlContent }

export const HalfWidth: ComponentStory<typeof TheGrid> = (args) => (
  <Setup halfWidth>
    <TheGrid {...args} />
  </Setup>
)

export const HalfHeight: ComponentStory<typeof TheGrid> = (args) => (
  <Setup halfHeight>
    <TheGrid {...args} />
  </Setup>
)

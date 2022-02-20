import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Galaxy } from './Galaxy'
import { Setup, HtmlContent } from '../../core/Setup/Setup'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Galaxy',
  component: Galaxy,
} as ComponentMeta<typeof Galaxy>

export const Default: ComponentStory<typeof Galaxy> = (args) => (
  <Setup>
    <Galaxy {...args} />
  </Setup>
)

export const WithHtml: ComponentStory<typeof Galaxy> = (args) => (
  <Setup>
    <Galaxy {...args} />
  </Setup>
)
WithHtml.args = { children: HtmlContent }

export const HalfWidth: ComponentStory<typeof Galaxy> = (args) => (
  <Setup halfWidth>
    <Galaxy {...args} />
  </Setup>
)

export const HalfHeight: ComponentStory<typeof Galaxy> = (args) => (
  <Setup halfHeight>
    <Galaxy {...args} />
  </Setup>
)

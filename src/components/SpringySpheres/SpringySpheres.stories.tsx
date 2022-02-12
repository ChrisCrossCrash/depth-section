import { ComponentStory, ComponentMeta } from '@storybook/react'
import { SpringySpheres } from './SpringySpheres'
import { Setup, HtmlContent } from '../Setup/Setup'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'SpringySpheres',
  component: SpringySpheres,
} as ComponentMeta<typeof SpringySpheres>

export const Default: ComponentStory<typeof SpringySpheres> = (args) => (
  <Setup>
    <SpringySpheres {...args} />
  </Setup>
)

export const WithHtml: ComponentStory<typeof SpringySpheres> = (args) => (
  <Setup>
    <SpringySpheres {...args} />
  </Setup>
)
WithHtml.args = { children: HtmlContent }

export const HalfWidth: ComponentStory<typeof SpringySpheres> = (args) => (
  <Setup halfWidth>
    <SpringySpheres {...args} />
  </Setup>
)

export const HalfHeight: ComponentStory<typeof SpringySpheres> = (args) => (
  <Setup halfHeight>
    <SpringySpheres {...args} />
  </Setup>
)

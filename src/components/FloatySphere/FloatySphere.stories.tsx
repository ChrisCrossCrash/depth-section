import { ComponentStory, ComponentMeta } from '@storybook/react'
import { FloatySphere } from './FloatySphere'
import { Setup, HtmlContent } from '../Setup/Setup'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'FloatySphere',
  component: FloatySphere,
} as ComponentMeta<typeof FloatySphere>

export const Default: ComponentStory<typeof FloatySphere> = (args) => (
  <Setup>
    <FloatySphere {...args} />
  </Setup>
)

export const WithHtml: ComponentStory<typeof FloatySphere> = (args) => (
  <Setup>
    <FloatySphere {...args} />
  </Setup>
)
WithHtml.args = { children: HtmlContent }

export const HalfWidth: ComponentStory<typeof FloatySphere> = (args) => (
  <Setup halfWidth>
    <FloatySphere {...args} />
  </Setup>
)

export const HalfHeight: ComponentStory<typeof FloatySphere> = (args) => (
  <Setup halfHeight>
    <FloatySphere {...args} />
  </Setup>
)

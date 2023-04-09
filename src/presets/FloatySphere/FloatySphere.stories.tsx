import type { Meta, StoryObj } from '@storybook/react'
import { FloatySphere } from './FloatySphere'
import { Setup, HtmlContent } from '../../core/Setup/Setup'

const meta = {
  title: 'FloatySphere',
  component: FloatySphere,
  argTypes: {
    debug: { control: 'boolean' },
  },
} satisfies Meta<typeof FloatySphere>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Setup>
      <FloatySphere {...args} />
    </Setup>
  ),
}

export const WithHtml: Story = {
  render: (args) => (
    <Setup>
      <FloatySphere {...args}>{HtmlContent}</FloatySphere>
    </Setup>
  ),
}

export const HalfWidth: Story = {
  render: (args) => (
    <Setup halfWidth>
      <FloatySphere {...args} />
    </Setup>
  ),
}

export const HalfHeight: Story = {
  render: (args) => (
    <Setup halfHeight>
      <FloatySphere {...args} />
    </Setup>
  ),
}

import type { Meta, StoryObj } from '@storybook/react'
import { FloatySphere } from './FloatySphere'
import { Setup, HtmlContent } from '../../core/Setup/Setup'

const meta = {
  title: 'FloatySphere',
  component: FloatySphere,
} satisfies Meta<typeof FloatySphere>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Setup>
      <FloatySphere />
    </Setup>
  ),
}

export const WithHtml: Story = {
  render: () => (
    <Setup>
      <FloatySphere>{HtmlContent}</FloatySphere>
    </Setup>
  ),
}

export const HalfWidth: Story = {
  render: () => (
    <Setup halfWidth>
      <FloatySphere />
    </Setup>
  ),
}

export const HalfHeight: Story = {
  render: () => (
    <Setup halfHeight>
      <FloatySphere />
    </Setup>
  ),
}

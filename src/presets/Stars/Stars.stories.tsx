import type { Meta, StoryObj } from '@storybook/react'
import { Stars } from './Stars'
import { Setup, HtmlContent } from '../../core/Setup/Setup'

const meta = {
  title: 'Stars',
  component: Stars,
} satisfies Meta<typeof Stars>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Setup>
      <Stars />
    </Setup>
  ),
}

export const WithHtml: Story = {
  render: () => (
    <Setup>
      <Stars>{HtmlContent}</Stars>
    </Setup>
  ),
}

export const HalfWidth: Story = {
  render: () => (
    <Setup halfWidth>
      <Stars />
    </Setup>
  ),
}

export const HalfHeight: Story = {
  render: () => (
    <Setup halfHeight>
      <Stars />
    </Setup>
  ),
}

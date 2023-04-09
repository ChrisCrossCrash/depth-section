import type { Meta, StoryObj } from '@storybook/react'
import { TheGrid } from './TheGrid'
import { Setup, HtmlContent } from '../../core/Setup/Setup'

const meta = {
  title: 'TheGrid',
  component: TheGrid,
} satisfies Meta<typeof TheGrid>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Setup>
      <TheGrid />
    </Setup>
  ),
}

export const WithHtml: Story = {
  render: () => (
    <Setup>
      <TheGrid>{HtmlContent}</TheGrid>
    </Setup>
  ),
}

export const HalfWidth: Story = {
  render: () => (
    <Setup halfWidth>
      <TheGrid />
    </Setup>
  ),
}

export const HalfHeight: Story = {
  render: () => (
    <Setup halfHeight>
      <TheGrid />
    </Setup>
  ),
}

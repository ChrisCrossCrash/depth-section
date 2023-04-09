import type { Meta, StoryObj } from '@storybook/react'
import { Fragmented } from './Fragmented'
import { Setup, HtmlContent } from '../../core/Setup/Setup'

const meta = {
  title: 'Fragmented',
  component: Fragmented,
} satisfies Meta<typeof Fragmented>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Setup>
      <Fragmented />
    </Setup>
  ),
}

export const WithHtml: Story = {
  render: () => (
    <Setup>
      <Fragmented>{HtmlContent}</Fragmented>
    </Setup>
  ),
}

export const HalfWidth: Story = {
  render: () => (
    <Setup halfWidth>
      <Fragmented />
    </Setup>
  ),
}

export const HalfHeight: Story = {
  render: () => (
    <Setup halfHeight>
      <Fragmented />
    </Setup>
  ),
}

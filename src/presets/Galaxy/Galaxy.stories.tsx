import type { Meta, StoryObj } from '@storybook/react'
import { Galaxy } from './Galaxy'
import { Setup, HtmlContent } from '../../core/Setup/Setup'

const meta = {
  title: 'Galaxy',
  component: Galaxy,
} satisfies Meta<typeof Galaxy>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Setup>
      <Galaxy />
    </Setup>
  ),
}

export const WithHtml: Story = {
  render: () => (
    <Setup>
      <Galaxy>{HtmlContent}</Galaxy>
    </Setup>
  ),
}

export const HalfWidth: Story = {
  render: () => (
    <Setup halfWidth>
      <Galaxy />
    </Setup>
  ),
}

export const HalfHeight: Story = {
  render: () => (
    <Setup halfHeight>
      <Galaxy />
    </Setup>
  ),
}

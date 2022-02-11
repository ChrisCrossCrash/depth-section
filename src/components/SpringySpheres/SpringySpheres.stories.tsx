import { ComponentStory, ComponentMeta } from '@storybook/react'
import { SpringySpheres } from './SpringySpheres'
import { Setup } from '../Setup/Setup'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'SpringySpheres',
  component: SpringySpheres,
  decorators: [(storyFn) => <Setup>{storyFn()}</Setup>],
} as ComponentMeta<typeof SpringySpheres>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SpringySpheres> = (args) => (
  <SpringySpheres {...args} />
)

export const Default = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {}

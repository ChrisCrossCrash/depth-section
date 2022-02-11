import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Fragmented } from './Fragmented'
import { Setup } from '../Setup/Setup'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Fragmented',
  component: Fragmented,
  decorators: [(storyFn) => <Setup>{storyFn()}</Setup>],
} as ComponentMeta<typeof Fragmented>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Fragmented> = (args) => (
  <Fragmented {...args} />
)

export const Default = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {}

const HtmlContent = (
  <div
    style={{
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#fff',
      fontFamily: 'sans-serif',
      fontSize: '3rem',
    }}
  >
    <h1>Hello World!</h1>
  </div>
)

export const WithHtml = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithHtml.args = { children: HtmlContent }

import './Setup.css'
type SetupProps = { children: React.ReactNode }

export const Setup = (props: SetupProps) => (
  <div className='base'>
    <div className='filler'>
      <h1>Scroll down 👇</h1>
    </div>
    <div className='depth-section-container'>{props.children}</div>
  </div>
)

import './Setup.css'

export const HtmlContent = (
  <div
    style={{
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'sans-serif',
      fontSize: '3rem',
    }}
  >
    <h1>Hello World!</h1>
  </div>
)

type SetupProps = {
  children: React.ReactNode
  halfHeight?: boolean
  halfWidth?: boolean
  html?: boolean
}

export const Setup = (props: SetupProps) => (
  <div className='base'>
    <div className='filler'>
      <h1>Scroll down 👇</h1>
    </div>
    <div
      className={`depth-section-container ${
        props.halfHeight ? 'half-height' : ''
      } ${props.halfWidth ? 'half-width' : ''}`}
    >
      {props.children}
    </div>
  </div>
)

type SetupProps = { children: React.ReactNode }

export const Setup = (props: SetupProps) => (
  <div style={{ height: '300vh' }}>
    <div style={{ height: '80vh', color: 'white' }}>Scroll down...</div>
    <div style={{ height: '100vh' }}>{props.children}</div>
  </div>
)

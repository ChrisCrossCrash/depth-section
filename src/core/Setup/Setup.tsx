import styles from './Setup.module.scss'

export const HtmlContent = (
  <div className={styles.htmlContent}>
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
  <div className={styles.scrollContainerOuter}>
    <div className={styles.scrollContainerInner}>
      <div className={styles.filler}>
        <h1>Scroll down 👇</h1>
      </div>
      <div
        className={`${styles.depthSectionContainer} ${
          props.halfHeight ? styles.halfHeight : ''
        } ${props.halfWidth ? styles.halfWidth : ''}`}
      >
        {props.children}
      </div>
    </div>
  </div>
)

type ScrollContainerProps = {
  children: React.ReactNode
  outerHeight: 'string'
  innerHeight: 'string'
}

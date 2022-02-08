import { useEffect, useRef } from 'react'

const useGetVh = () => {
  const ruler = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!ruler.current) {
      ruler.current = document.querySelector('#vh-ruler')
    }
    if (!ruler.current) {
      const outer = document.createElement('div')
      const inner = document.createElement('div')
      outer.appendChild(inner)

      outer.style.position = 'absolute'
      outer.style.height = '0'
      outer.style.overflow = 'hidden'

      inner.style.height = '100vh'
      inner.id = 'vh-ruler'

      document.body.appendChild(outer)
      ruler.current = inner
    }
  })

  /** Return 100vh in px units.
   *
   * This is not the same as `window.innerHeight`. Why? Read this:
   * https://developers.google.com/web/updates/2016/12/url-bar-resizing
   */
  const getVh = () => ruler.current?.clientHeight || 0

  return getVh
}

export { useGetVh }

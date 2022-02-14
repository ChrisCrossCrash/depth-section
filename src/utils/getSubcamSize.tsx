import type { RootState } from '@react-three/fiber'

/** Return the height of the subcam. */
export const getSubcamHeight = ({ viewport, size }: RootState) => {
  return (viewport.height / 3) * (size.height / window.innerHeight)
}

/** Return the width of the subcam. */
export const getSubcamWidth = ({ viewport, size }: RootState) => {
  const heightFraction = size.height / window.innerHeight
  return (heightFraction * viewport.width) / 3
}

/** Return the height and width of the subcam. */
export const getSubcamSize = (state: RootState) => {
  const width = getSubcamWidth(state)
  const height = getSubcamHeight(state)

  return [width, height] as [width: number, height: number]
}

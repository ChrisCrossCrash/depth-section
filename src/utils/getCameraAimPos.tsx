import { RootState } from '@react-three/fiber'
import { getSubcamWidth } from './getSubcamSize'

/** Return the y position along the xy plane in which the camera is pointed */
export const getCameraAimPosX = (state: RootState) => {
  const pxPerMeter = state.size.width / getSubcamWidth(state)
  const left = state.gl.domElement.getBoundingClientRect().left
  const windowWidth = document.body.clientWidth / pxPerMeter

  // get everything in terms of it's distance from the left edge of the window.
  const posLeft = -windowWidth / 2

  // Get the pixel distance from the left edge of the screen to the center of the canvas.
  const pxDistance = left + state.size.width / 2

  // convert the pixel distance to meters.
  const aimPosX = pxDistance / pxPerMeter

  // The result is the distance from the left edge to the center of the camera in meters.
  return posLeft + aimPosX
}

/** Return the y position along the xy plane in which the camera is pointed */
export const getCameraAimPosY = (state: RootState) => {
  const o = state.gl.domElement.getBoundingClientRect().top
  const w = window.innerHeight
  /** The scroll porgress, where -1 is entering an 1 is leaving screen. */
  const mappedProgress = (w - o) / w - 1
  // What is shown on the canvas is the subcam, which is 1/3 of the full
  // camera height, so we must divide viewport.height by 3 to get the height
  // of the subcam view in meters.

  /** Extra offset to account for when the element's height is not 100vh */
  const extraOffsetPx = -(window.innerHeight - state.size.height) / 2
  const pxPerMeter = state.size.height / state.viewport.height
  /** The amount needed to account for when the canvas is not 100vh. */
  const extraOffsetMeters = extraOffsetPx / pxPerMeter / 6
  return (mappedProgress * state.viewport.height) / 3 - extraOffsetMeters
}

/** Return the x and y positions along the xy plane in which the camera is pointed */
export const getCameraAimPos = (state: RootState) => {
  const x = getCameraAimPosX(state)
  const y = getCameraAimPosY(state)

  return [x, y] as [x: number, y: number]
}

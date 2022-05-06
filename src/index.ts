import { DepthSection } from './core/DepthSection/DepthSection'
import { Fragmented } from './presets/Fragmented/Fragmented'
import { FloatySphere } from './presets/FloatySphere/FloatySphere'
import { Stars } from './presets/Stars/Stars'
import { Galaxy } from './presets/Galaxy/Galaxy'
import { TheGrid } from './presets/TheGrid/TheGrid'
import { RPlace } from './presets/RPlace/RPlace'

import {
  getSubcamHeight,
  getSubcamWidth,
  getSubcamSize,
} from './utils/getSubcamSize'
import {
  getCameraAimPosX,
  getCameraAimPosY,
  getCameraAimPos,
} from './utils/getCameraAimPos'

export {
  DepthSection,
  // Pre-made depth sections
  Fragmented,
  FloatySphere,
  Stars,
  Galaxy,
  TheGrid,
  RPlace,
  // Utils
  getSubcamHeight,
  getSubcamWidth,
  getSubcamSize,
  getCameraAimPosX,
  getCameraAimPosY,
  getCameraAimPos,
}

import { DirectionI } from './DirectionI'
import { RouteI } from './RouteI'
import { StopI } from './StopI'

export interface StateI {
  routes: RouteI[]
  selectedRoute: number
  directions: DirectionI[]
  selectedDirections: number
  stops: StopI[]
  selectedStops: number
  type: string
}

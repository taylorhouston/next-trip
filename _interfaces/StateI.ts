import { DepartureI } from './DepartureI'
import { DirectionI } from './DirectionI'
import { RouteI } from './RouteI'
import { StopI } from './StopI'

export interface StateI {
  routes?: RouteI[]
  selectedRoute?: number
  directions?: DirectionI[]
  selectedDirection?: number
  stops?: StopI[]
  departures?: DepartureI[]
  selectedStops?: number
  type?: string
}

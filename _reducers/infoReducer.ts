import { DepartureI } from '../_interfaces/DepartureI'
import { DirectionI } from '../_interfaces/DirectionI'
import { RouteI } from '../_interfaces/RouteI'
import { StateI } from '../_interfaces/StateI'
import { StopI } from '../_interfaces/StopI'

export const INFO_DIRECTION_UPDATE = 'INFO_DIRECTION_UPDATE'
export const INFO_STOP_UPDATE = 'INFO_STOP_UPDATE'
export const INFO_ROUTE_UPDATE = 'INFO_ROUTE_UPDATE'
export const INFO_SET_CURRENT_ID = 'INFO_SET_CURRENT_ID'
export const INFO_DEPARTURE_UPDATE = 'INFO_DEPARTURE_UPDATE'

export type Action =
  | { type: typeof INFO_DIRECTION_UPDATE; directions: DirectionI[] }
  | { type: typeof INFO_STOP_UPDATE; stops: StopI[] }
  | { type: typeof INFO_ROUTE_UPDATE; routes: RouteI[] }
  | { type: typeof INFO_DEPARTURE_UPDATE; data: { departures: DepartureI[] } }
  | { type: typeof INFO_SET_CURRENT_ID; selected: string; id: string | number }

export const infoReducer = (state: StateI, action: Action) => {
  switch (action.type) {
    case INFO_DIRECTION_UPDATE:
      return { ...state, directions: action.directions }
    case INFO_STOP_UPDATE:
      return { ...state, stops: action.stops }
    case INFO_ROUTE_UPDATE:
      return { ...state, routes: action.routes }
    case INFO_DEPARTURE_UPDATE:
      return { ...state, departures: action.data.departures }
    case INFO_SET_CURRENT_ID:
      return { ...state, [`selected${action.selected}`]: action.id }
    default:
      return state
  }
}

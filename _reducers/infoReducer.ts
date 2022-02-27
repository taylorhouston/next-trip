import { Reducer } from 'react'
import { StateI } from '../_interfaces/StateI'

export enum InfoAction {
  DIRECTION_UPDATE = 'DIRECTION_UPDATE',
  STOP_UPDATE = 'STOP_UPDATE',
  ROUTE_UPDATE = 'ROUTE_UPDATE',
  SET_CURRENT_ID = 'SET_CURRENT_ID',
  DEPARTURE_UPDATE = 'DEPARTURE_UPDATE',
  STOP_CURRENT = 'STOP_CURRENT',
}

// potential type for payload that didn't seem to work.
// type PayloadType =
//   | DirectionI[]
//   | StopI[]
//   | RouteI[]
//   | DepartureI[]
//   | SelectedInfo

export type Action = {
  type: InfoAction
  payload: any
}

export const infoReducer: Reducer<StateI, Action> = (
  state: StateI,
  action: Action
) => {
  switch (action.type) {
    case InfoAction.DIRECTION_UPDATE:
      return { ...state, directions: action.payload }
    case InfoAction.STOP_UPDATE:
      return { ...state, stops: action.payload }
    case InfoAction.ROUTE_UPDATE:
      return { ...state, routes: action.payload }
    case InfoAction.DEPARTURE_UPDATE:
      return { ...state, departures: action.payload }
    case InfoAction.SET_CURRENT_ID:
      return {
        ...state,
        [`selected${
          'selected' in action.payload ? action.payload.selected : ''
        }`]: 'id' in action.payload ? action.payload.id : '',
      }
    case InfoAction.STOP_CURRENT:
      return {
        ...state,
        currentStop: action.payload,
      }
    default:
      return state
  }
}

import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import UserEvent from '@testing-library/user-event'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { createMockRouter } from '../_tests/createMockRouter'
import Home from '../pages/index'

global.fetchData = global.fetch = jest.fn((url: string) =>
  Promise.resolve({
    json: () => {
      switch (url) {
        case 'https://svc.metrotransit.org/nextripv2/directions/3':
          return Promise.resolve([
            {
              direction_id: 1,
              direction_name: 'North',
              agency_id: 2,
            },
            {
              direction_id: 3,
              direction_name: 'South',
              agency_id: 3,
            },
          ])
        case 'https://svc.metrotransit.org/nextripv2/stops/3/3':
          return Promise.resolve([
            { place_code: 'ICE', description: 'Tundra' },
            { place_code: 'SWT', description: 'Sweet Chocolate' },
          ])
        case 'https://svc.metrotransit.org/nextripv2/1/1/ICE':
          return Promise.resolve({
            stops: [
              {
                stop_id: 51405,
                latitude: 44.854277,
                longitude: -93.238877,
                description: 'MOA Transit Station',
              },
            ],
            alerts: [],
            departures: [
              {
                actual: true,
                trip_id: '20247224-DEC21-RAIL-Weekday-01',
                stop_id: 51405,
                departure_text: '14 Min',
                departure_time: 1645546140,
                description: 'to Mall of America',
                route_id: '901',
                route_short_name: 'Blue',
                direction_id: 1,
                direction_text: 'SB',
                schedule_relationship: 'Scheduled',
              },
              {
                actual: true,
                trip_id: '20247222-DEC21-RAIL-Weekday-01',
                stop_id: 51405,
                departure_text: '22 Min',
                departure_time: 1645546620,
                description: 'to Mall of America',
                route_id: '901',
                route_short_name: 'Blue',
                direction_id: 1,
                direction_text: 'SB',
                schedule_relationship: 'Scheduled',
              },
              {
                actual: false,
                trip_id: '20247149-DEC21-RAIL-Weekday-01',
                stop_id: 51405,
                departure_text: '10:27',
                departure_time: 1645547220,
                description: 'to Mall of America',
                route_id: '901',
                route_short_name: 'Blue',
                direction_id: 1,
                direction_text: 'SB',
                schedule_relationship: 'Scheduled',
              },
              {
                actual: false,
                trip_id: '20247151-DEC21-RAIL-Weekday-01',
                stop_id: 51405,
                departure_text: '10:39',
                departure_time: 1645547940,
                description: 'to Mall of America',
                route_id: '901',
                route_short_name: 'Blue',
                direction_id: 1,
                direction_text: 'SB',
                schedule_relationship: 'Scheduled',
              },
              {
                actual: false,
                trip_id: '20247153-DEC21-RAIL-Weekday-01',
                stop_id: 51405,
                departure_text: '10:51',
                departure_time: 1645548660,
                description: 'to Mall of America',
                route_id: '901',
                route_short_name: 'Blue',
                direction_id: 1,
                direction_text: 'SB',
                schedule_relationship: 'Scheduled',
              },
              {
                actual: false,
                trip_id: '20247156-DEC21-RAIL-Weekday-01',
                stop_id: 51405,
                departure_text: '11:03',
                departure_time: 1645549380,
                description: 'to Mall of America',
                route_id: '901',
                route_short_name: 'Blue',
                direction_id: 1,
                direction_text: 'SB',
                schedule_relationship: 'Scheduled',
              },
              {
                actual: false,
                trip_id: '20247154-DEC21-RAIL-Weekday-01',
                stop_id: 51405,
                departure_text: '11:15',
                departure_time: 1645550100,
                description: 'to Mall of America',
                route_id: '901',
                route_short_name: 'Blue',
                direction_id: 1,
                direction_text: 'SB',
                schedule_relationship: 'Scheduled',
              },
              {
                actual: false,
                trip_id: '20247155-DEC21-RAIL-Weekday-01',
                stop_id: 51405,
                departure_text: '11:27',
                departure_time: 1645550820,
                description: 'to Mall of America',
                route_id: '901',
                route_short_name: 'Blue',
                direction_id: 1,
                direction_text: 'SB',
                schedule_relationship: 'Scheduled',
              },
            ],
          })
      }
    },
  })
)

describe('Home', () => {
  it('renders a heading', async () => {
    await render(
      <RouterContext.Provider
        value={createMockRouter({
          query: { route: '1', direction: '1', stop: 'ICE' },
        })}
      >
        <Home
          routes={[
            {
              route_id: 2,
              route_label: 'Pickles',
              agency_id: 2,
            },
            {
              route_id: 3,
              route_label: 'Banana',
              agency_id: 3,
            },
          ]}
        />
      </RouterContext.Provider>
    )

    await waitFor(() => {
      UserEvent.selectOptions(screen.getByTestId('routeSelect'), '3')
      UserEvent.selectOptions(screen.getByTestId('directionSelect'), '3')
      expect(screen.getByTestId('directionSelect')).toBeInTheDocument()

      expect(screen.getByTestId('stopSelect')).toBeInTheDocument()
      UserEvent.selectOptions(screen.getByTestId('stopSelect'), 'ICE')
      expect(screen.getByText('Station')).toBeInTheDocument()
    })
  })
})

import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import UserEvent from '@testing-library/user-event'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { createMockFetch } from '../_tests/createMockFetch'
import { createMockRouter } from '../_tests/createMockRouter'
import Home from '../pages/index'

global.fetch = createMockFetch

beforeEach(() => {
  jest.useFakeTimers()
})

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
              route_id: '2',
              route_label: 'Pickles',
              agency_id: 2,
            },
            {
              route_id: '3',
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
      expect(screen.getByText('MOA Transit Station')).toBeInTheDocument()
    })
  })
})

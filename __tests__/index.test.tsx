import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import UserEvent from '@testing-library/user-event'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { ThemeProvider } from 'styled-components'
import { createMockFetch } from '../_tests/createMockFetch'
import { createMockRouter } from '../_tests/createMockRouter'
import Home from '../pages/index'
import { theme } from '../theme'

global.fetch = createMockFetch

beforeEach(() => {
  jest.useFakeTimers()
})

describe('Home', () => {
  test('renders and goes through the select fields', async () => {
    await render(
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    )
    // happy path
    await waitFor(() => {
      UserEvent.selectOptions(screen.getByTestId('routeSelect'), '3')
      UserEvent.selectOptions(screen.getByTestId('directionSelect'), '3')
      UserEvent.selectOptions(screen.getByTestId('stopSelect'), 'ICE')
      expect(screen.getByText('MOA Transit Station')).toBeInTheDocument()
    })
    // change select box and make sure values default back to starting option
    await waitFor(() => {
      UserEvent.selectOptions(screen.getByTestId('routeSelect'), '2')
      const option = screen.getByRole('option', {
        name: 'Pickles',
      }) as HTMLOptionElement
      expect(option.selected).toBeTruthy()
    })

    await waitFor(() => {
      const directionOption = screen.getByRole('option', {
        name: 'select direction',
      }) as HTMLOptionElement
      expect(directionOption.selected).toBeTruthy()
    })

    await waitFor(() => {
      UserEvent.selectOptions(screen.getByTestId('directionSelect'), '1')
      const stopOption = screen.getByRole('option', {
        name: 'select stop',
      }) as HTMLOptionElement
      expect(stopOption.selected).toBeTruthy()
    })
  })

  test('render no results scenario', () => {
    render(
      <ThemeProvider theme={theme}>
        <RouterContext.Provider
          value={createMockRouter({
            query: { route: '2', direction: '1', stop: 'ICEF' },
          })}
        >
          <Home
            routes={[
              {
                route_id: '3',
                route_label: 'Banana',
                agency_id: 3,
              },
            ]}
          />
        </RouterContext.Provider>
      </ThemeProvider>
    )
    waitFor(() => {
      expect(
        screen.getByText('Sadly, no results were found here.')
      ).toBeInTheDocument()
    })
  })
})

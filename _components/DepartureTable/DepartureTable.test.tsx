import '@testing-library/jest-dom'
import { screen, render } from '@testing-library/react'
import { DepartureTable } from './DepartureTable'

describe('DepartureTable', () => {
  test('data appears in table in proper order', () => {
    const departures = [
      {
        route_short_name: 'BLUE',
        description: 'to the future',
        departure_text: 'DUE',
      },
      {
        route_short_name: 'GREEN',
        description: 'to the present',
        departure_text: '2:40',
      },
      {
        route_short_name: 'RED',
        description: 'to the past',
        departure_text: '4:00',
      },
    ]
    render(<DepartureTable departures={departures} />)
    const row = screen.getAllByRole('row')

    expect(row[1].textContent).toBe('BLUEto the futureDUE')
    expect(row[2].textContent).toBe('GREENto the present2:40')
    expect(row[3].textContent).toBe('REDto the past4:00')
  })
})

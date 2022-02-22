import { render, screen } from '@testing-library/react'
import UserEvent from '@testing-library/user-event'
import { InfoSelectBox } from './InfoSelectBox'

describe('InfoSelectBox', () => {
  test('select values', () => {
    const testData = [
      {
        fakeValue: 'this is a value',
        fakeLabel: 'this is another value',
      },
      {
        fakeValue: 'fake value 2',
        fakeLabel: 'this is another fake value',
      },
    ]
    const testChange = jest.fn()

    render(
      <InfoSelectBox
        selectLabel={'test'}
        onChange={testChange}
        value=""
        label="fakeLabel"
        data={testData}
      />
    )
    UserEvent.selectOptions(screen.getByTestId('testSelect'), 'fake value 2')
    expect(testChange).toBeCalledTimes(0)
    expect(
      screen.getByRole('option', { name: 'this is another fake value' })
        .selected
    ).toBe(true)
    expect(testChange).toBeCalled()
  })
})

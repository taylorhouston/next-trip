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
        value="fakeValue"
        label="fakeLabel"
        data={testData}
      />
    )
    expect(testChange).toBeCalledTimes(0)
    UserEvent.selectOptions(screen.getByTestId('testSelect'), 'fake value 2')
    const option = screen.getByRole('option', {
      name: 'this is another fake value',
    }) as HTMLOptionElement
    expect(option.selected).toBe(true)
    expect(testChange).toBeCalled()
  })
})

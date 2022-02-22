import { ChangeEventHandler } from 'react'
import styled from 'styled-components'

interface Props {
  selectLabel: string
  onChange: ChangeEventHandler
  label: string
  value: string
  data: any[]
}
export const InfoSelectBox = ({
  selectLabel,
  onChange,
  label,
  value,
  data,
}: Props) => {
  return (
    <Container$>
      <label>select {selectLabel}</label>
      <Select$ onChange={onChange} data-testid={`${selectLabel}Select`}>
        <option value="">select {selectLabel}</option>
        {data.map((datum: any, index: number) => (
          <option value={datum[value]} key={`${selectLabel}${index}`}>
            {datum[label]}
          </option>
        ))}
      </Select$>
    </Container$>
  )
}

const Select$ = styled.select`
  height: 40px;
  font-size: 16px;
`
const Container$ = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`

import styled from 'styled-components'
import { DepartureI } from '../../_interfaces/DepartureI'

interface PropTypes {
  departures: DepartureI[]
}

export const DepartureTable = ({ departures }: PropTypes) => {
  return (
    <Table$>
      <thead>
        <HeadTR$>
          <TH$>route</TH$>
          <TH$>destination</TH$>
          <THLast$>departs</THLast$>
        </HeadTR$>
      </thead>
      <tbody>
        {departures.map((departure: DepartureI, index: number) => (
          <TR$ key={`departure${index}`}>
            <RouteRow$>{departure.route_short_name}</RouteRow$>
            <DestinationRow$>{departure.description}</DestinationRow$>
            <DepartRow$>{departure.departure_text}</DepartRow$>
          </TR$>
        ))}
      </tbody>
    </Table$>
  )
}

const TR$ = styled.tr`
  height: 40px;
`
const HeadTR$ = styled(TR$)`
  background-color: lightblue;
`

const Table$ = styled.table`
  width: 100%;
  max-width: 768px;
  border-collapse: collapse;
`
const TD$ = styled.td`
  border-bottom: 1px solid #000;
  padding: 10px;
`

const TH$ = styled.th`
  text-align: left;
  padding: 10px;
`

const THLast$ = styled.th`
  padding: 10px;
  text-align: right;
`

const RouteRow$ = styled(TD$)`
  width: 15%;
`

const DestinationRow$ = styled(TD$)`
  width: 60%;
`

const DepartRow$ = styled(TD$)`
  width: 20%;
  text-align: right;
`

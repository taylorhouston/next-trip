import styled from 'styled-components'
import { ThemeProvider } from 'styled-components'
import { DepartureI } from '../../_interfaces/DepartureI'
import { theme } from '../../theme'

interface PropTypes {
  departures: DepartureI[]
}

export const DepartureTable = ({ departures }: PropTypes) => {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  )
}

const TR$ = styled.tr`
  height: 50px;
`
const HeadTR$ = styled(TR$)`
  background-color: ${(props) => props.theme.colors.lightBlue};
`

const Table$ = styled.table`
  width: 100%;
  max-width: 768px;
  font-size: 18px;
  border-collapse: collapse;
  & tr:nth-child(even) {
    background-color: ${(props) => props.theme.colors.white};
  }
`
const TD$ = styled.td`
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

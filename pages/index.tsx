import Head from 'next/head'
import { useRouter } from 'next/router'
import { useReducer, ChangeEvent, ChangeEventHandler } from 'react'
import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { DepartureTable } from '../_components/DepartureTable/DepartureTable'
import { InfoSelectBox } from '../_components/InfoSelectBox/InfoSelectBox'
import { DepartureI } from '../_interfaces/DepartureI'
import { DirectionI } from '../_interfaces/DirectionI'
import { RouteI } from '../_interfaces/RouteI'
import { StopI } from '../_interfaces/StopI'
import { infoReducer, InfoAction } from '../_reducers/infoReducer'

interface PageProps {
  routes: RouteI[]
}

const Home: ({ routes }: PageProps) => JSX.Element = ({
  routes,
}: PageProps) => {
  const [state, dispatch] = useReducer(infoReducer, {
    routes: routes,
  })
  const intervalId = useRef<number>(-1)
  const router = useRouter()

  useEffect(() => {
    const fetchDepartments = async () => {
      const response = await fetch(
        `https://svc.metrotransit.org/nextripv2/${router.query.route}/${router.query.direction}/${router.query.stop}`
      )
      const wholeJson = await response.json()
      const currentStop = wholeJson.stops[0].description
      const departures: DepartureI[] = wholeJson.departures

      dispatch({
        type: InfoAction.DEPARTURE_UPDATE,
        payload: departures,
      })
      dispatch({
        type: InfoAction.STOP_CURRENT,
        payload: currentStop,
      })
    }

    if (router.query.route || router.query.direction) {
      intervalId.current !== -1
        ? window.clearInterval(intervalId.current)
        : (intervalId.current = -1)
      fetchDepartments().catch(console.error)
      intervalId.current = window.setInterval(fetchDepartments, 30000)
    }
  }, [router.query.route, router.query.direction, router.query.stop])

  const onChange: ChangeEventHandler = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const res = await fetch(
      `https://svc.metrotransit.org/nextripv2/directions/${e.currentTarget.value}`
    )
    const directions: DirectionI[] = await res.json()

    dispatch({ type: InfoAction.DIRECTION_UPDATE, payload: directions })
    dispatch({
      type: InfoAction.SET_CURRENT_ID,
      payload: {
        selected: 'Route',
        id: e.target.value,
      },
    })
  }

  const onChangeDirection: ChangeEventHandler = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const res = await fetch(
      `https://svc.metrotransit.org/nextripv2/stops/${state.selectedRoute}/${e.target.value}`
    )
    const stops: StopI[] = await res.json()
    dispatch({ type: InfoAction.STOP_UPDATE, payload: stops })
    dispatch({
      type: InfoAction.SET_CURRENT_ID,
      payload: {
        selected: 'Direction',
        id: e.target.value,
      },
    })
  }

  const onChangeStop: ChangeEventHandler = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    await router.push(
      `?route=${state.selectedRoute}&direction=${state.selectedDirection}&stop=${e.target.value}`,
      undefined,
      { shallow: true }
    )
  }

  return (
    <PageContainer$>
      <Head>
        <title>Nextrip Duplicate</title>
        <meta name="description" content="Nextrip Duplicate" />
      </Head>

      <Main$>
        <SelectBoxContainer$>
          <InfoSelectBox
            selectLabel="route"
            onChange={onChange}
            label="route_label"
            value="route_id"
            data={routes}
          />
          {state.selectedRoute && (
            <InfoSelectBox
              selectLabel="direction"
              onChange={onChangeDirection}
              label="direction_name"
              value="direction_id"
              data={state.directions}
            />
          )}
          {state.selectedDirection && (
            <InfoSelectBox
              selectLabel="stop"
              onChange={onChangeStop}
              label="description"
              value="place_code"
              data={state.stops}
            />
          )}
        </SelectBoxContainer$>

        {state.departures && state.departures.length > 0 && (
          <TableContainer$>
            <H2$>{state.currentStop}</H2$>
            <DepartureTable departures={state.departures} />
          </TableContainer$>
        )}

        {state.departures && state.departures.length === 0 && (
          <H2$>Sadly, no results were found here.</H2$>
        )}
      </Main$>
    </PageContainer$>
  )
}
const PageContainer$ = styled.div`
  padding: 0 2rem;
`
const Main$ = styled.main`
  min-height: 100vh;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const SelectBoxContainer$ = styled.div`
  width: 400px;
`
const H2$ = styled.h2`
  padding: 10px;
  font-size: 20px;
  margin: 8px 0;
`

const TableContainer$ = styled.div`
  background-color: #eeeeee;
  max-width: 700px;
  width: 100%;
  margin: 10px;
`

export async function getServerSideProps() {
  const res = await fetch(`https://svc.metrotransit.org/nextripv2/routes`)
  const routes = await res.json()

  return {
    props: {
      routes,
    },
  }
}
export default Home

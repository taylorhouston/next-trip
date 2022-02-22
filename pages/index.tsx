import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useReducer, ChangeEvent, ChangeEventHandler } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import { DepartureTable } from '../_components/DepartureTable/DepartureTable'
import { InfoSelectBox } from '../_components/InfoSelectBox/InfoSelectBox'
import { DepartureI } from '../_interfaces/DepartureI'
import { DirectionI } from '../_interfaces/DirectionI'
import { RouteI } from '../_interfaces/RouteI'
import { StopI } from '../_interfaces/StopI'
import {
  infoReducer,
  INFO_DIRECTION_UPDATE,
  INFO_SET_CURRENT_ID,
  INFO_STOP_UPDATE,
  INFO_DEPARTURE_UPDATE,
} from '../_reducers/infoReducer'
import styles from '../styles/Home.module.css'

interface PageProps {
  routes: RouteI[]
}

const Home: NextPage<RouteI[]> = ({ routes }: PageProps) => {
  const [state, dispatch] = useReducer(infoReducer, { routes: routes })
  const router = useRouter()

  useEffect(() => {
    const fetchDepartments = async () => {
      const response: Response = await fetch(
        `https://svc.metrotransit.org/nextripv2/${router.query.route}/${router.query.direction}/${router.query.stop}`
      )

      const data: DepartureI[] = await response.json()
      dispatch({ type: INFO_DEPARTURE_UPDATE, data })
    }
    if (router.query.route || router.query.direction) {
      fetchDepartments().catch(console.error)
    }
  }, [router.query.route, router.query.direction, router.query.stop])

  const onChange: ChangeEventHandler = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const res: Response = await fetch(
      `https://svc.metrotransit.org/nextripv2/directions/${e.currentTarget.value}`
    ).catch(console.error)
    const directions: [DirectionI] = await res.json()
    dispatch({ type: INFO_DIRECTION_UPDATE, directions })
    dispatch({
      type: INFO_SET_CURRENT_ID,
      selected: 'Route',
      id: e.target.value,
    })
  }

  const onChangeDirection: ChangeEventHandler = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const res = await fetch(
      `https://svc.metrotransit.org/nextripv2/stops/${state.selectedRoute}/${e.target.value}`
    )
    const stops: StopI[] = await res.json()
    dispatch({ type: INFO_STOP_UPDATE, stops })
    dispatch({
      type: INFO_SET_CURRENT_ID,
      selected: 'Direction',
      id: e.target.value,
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
    <div className={styles.container}>
      <Head>
        <title>Nextrip Duplicate</title>
        <meta name="description" content="Nextrip Duplicate" />
      </Head>

      <main className={styles.main}>
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

        {state.departures && (
          <TableContainer$>
            <H2$>Station</H2$>
            <DepartureTable departures={state.departures} />
          </TableContainer$>
        )}
      </main>
    </div>
  )
}
const SelectBoxContainer$ = styled.div`
  width: 400px;
`
const H2$ = styled.h2`
  padding: 10px;
`

const TableContainer$ = styled.div`
  background-color: #f1f1f1;
  max-width: 600px;
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

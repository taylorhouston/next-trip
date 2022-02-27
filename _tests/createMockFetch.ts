export const createMockFetch = jest.fn((url: string) =>
  Promise.resolve({
    json: () => {
      switch (url) {
        case 'https://svc.metrotransit.org/nextripv2/directions/3':
          return Promise.resolve([
            {
              direction_id: 1,
              direction_name: 'North',
              agency_id: 2,
            },
            {
              direction_id: 3,
              direction_name: 'South',
              agency_id: 3,
            },
          ])
        case 'https://svc.metrotransit.org/nextripv2/directions/2':
          return Promise.resolve([
            {
              direction_id: 1,
              direction_name: 'East',
              agency_id: 3,
            },
            {
              direction_id: 3,
              direction_name: 'West',
              agency_id: 4,
            },
          ])
        case 'https://svc.metrotransit.org/nextripv2/stops/3/3':
          return Promise.resolve([
            { place_code: 'ICE', description: 'Tundra' },
            { place_code: 'SWT', description: 'Sweet Chocolate' },
          ])
        case 'https://svc.metrotransit.org/nextripv2/stops/2/1':
          return Promise.resolve([
            { place_code: 'ICEF', description: 'Fargo' },
            { place_code: 'BIT', description: 'Bitter Chocolate' },
          ])
        case 'https://svc.metrotransit.org/nextripv2/1/1/ICE':
          return Promise.resolve({
            stops: [
              {
                stop_id: 51405,
                latitude: 44.854277,
                longitude: -93.238877,
                description: 'MOA Transit Station',
              },
            ],
            alerts: [],
            departures: [
              {
                actual: true,
                trip_id: '20247224-DEC21-RAIL-Weekday-01',
                stop_id: 51405,
                departure_text: '14 Min',
                departure_time: 1645546140,
                description: 'to Mall of America',
                route_id: '901',
                route_short_name: 'Blue',
                direction_id: 1,
                direction_text: 'SB',
                schedule_relationship: 'Scheduled',
              },
              {
                actual: true,
                trip_id: '20247222-DEC21-RAIL-Weekday-01',
                stop_id: 51405,
                departure_text: '22 Min',
                departure_time: 1645546620,
                description: 'to Mall of America',
                route_id: '901',
                route_short_name: 'Blue',
                direction_id: 1,
                direction_text: 'SB',
                schedule_relationship: 'Scheduled',
              },
              {
                actual: false,
                trip_id: '20247149-DEC21-RAIL-Weekday-01',
                stop_id: 51405,
                departure_text: '10:27',
                departure_time: 1645547220,
                description: 'to Mall of America',
                route_id: '901',
                route_short_name: 'Blue',
                direction_id: 1,
                direction_text: 'SB',
                schedule_relationship: 'Scheduled',
              },
              {
                actual: false,
                trip_id: '20247151-DEC21-RAIL-Weekday-01',
                stop_id: 51405,
                departure_text: '10:39',
                departure_time: 1645547940,
                description: 'to Mall of America',
                route_id: '901',
                route_short_name: 'Blue',
                direction_id: 1,
                direction_text: 'SB',
                schedule_relationship: 'Scheduled',
              },
              {
                actual: false,
                trip_id: '20247153-DEC21-RAIL-Weekday-01',
                stop_id: 51405,
                departure_text: '10:51',
                departure_time: 1645548660,
                description: 'to Mall of America',
                route_id: '901',
                route_short_name: 'Blue',
                direction_id: 1,
                direction_text: 'SB',
                schedule_relationship: 'Scheduled',
              },
              {
                actual: false,
                trip_id: '20247156-DEC21-RAIL-Weekday-01',
                stop_id: 51405,
                departure_text: '11:03',
                departure_time: 1645549380,
                description: 'to Mall of America',
                route_id: '901',
                route_short_name: 'Blue',
                direction_id: 1,
                direction_text: 'SB',
                schedule_relationship: 'Scheduled',
              },
            ],
          })
        case 'https://svc.metrotransit.org/nextripv2/2/1/ICEF':
          return Promise.resolve({
            stops: [
              {
                stop_id: 51405,
                latitude: 44.854277,
                longitude: -93.238877,
                description: 'MOA Transit Station',
              },
            ],
            alerts: [],
            departures: [],
          })
      }
    },
  })
) as jest.Mock

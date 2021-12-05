import { gql } from 'apollo-server'
import fetch from 'node-fetch'
import { BASE_URL } from '../utils/config.js'
import { endDate, filterTimeStamps, startDate } from '../services/dateService.js'
import { highestVolume, longestDecline, mostProfitableRange, pricesToObject } from '../services/priceService.js'
import { dateResolver } from './dateTime.js'

export const typeDefs = gql`

  scalar DateTime

  type Decline {
    longest: Int!
    start: DateTime!
    end: DateTime!
  }

  type Price {
    date: DateTime!
    price: Float!
  }

  type HighestVolume {
    date: DateTime!
    volume: Float!
  }

  type ProfitRange {
    rangeStart: DateTime!
    rangeEnd: DateTime!
    difference: Float!
  }

  type Bitcoin {
    decline: Decline!
    prices: [Price]
    highestVolume: HighestVolume!
    profitRange: ProfitRange!
  }

  type Query {
    statistics: Bitcoin
  }
`
const year = '2021'
const month = '5'
const day = '21'

const year2 = '2021'
const month2 = '5'
const day2 = '28'

export const resolvers = {
  Query: {
    statistics: async () => {

      const start = startDate(year, month, day)
      const end = endDate(year2, month2, day2)

      try {
        const response = await fetch(`${BASE_URL}${start}&to=${end}`)
        const data = await response.json()
        const { longest, start: declineStart, end: declineEnd } = longestDecline(filterTimeStamps(data.prices))
        const prices = pricesToObject(filterTimeStamps(data.prices))
        const volume = highestVolume(filterTimeStamps(data.total_volumes))
        const { rangeStart, rangeEnd, difference } = mostProfitableRange(filterTimeStamps(data.prices))
        return {
          decline: { longest, start: declineStart, end: declineEnd },
          prices: prices,
          highestVolume: volume,
          profitRange: { rangeStart, rangeEnd, difference }
        }
      } catch {
        console.log("couldn't get data")
      }
    },
  },
  DateTime: dateResolver
}
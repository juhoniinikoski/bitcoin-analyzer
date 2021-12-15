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

  input Payload {
    day: Int!
    month: Int!
    year: Int!
  }

  type Query {
    statistics(
      start: Payload!
      end: Payload!
    ): Bitcoin
  }
`
const argsStart = { day: 1, month: 12, year: 2019 }
const argsEnd = { day: 13, month: 12, year: 2019 }

export const resolvers = {
  Query: {
    statistics: async (obj, args) => {

      const start = startDate(args.start.year, args.start.month, args.start.day)
      const end = endDate(args.end.year, args.end.month, args.end.day)

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
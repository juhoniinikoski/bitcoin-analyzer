import { gql } from 'apollo-server'
import fetch from 'node-fetch'
import { BASE_URL } from '../utils/config.js'
import { endDate, startDate } from '../services/dateService.js'
import { longestDecline } from '../services/priceService.js'

export const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`
const year = '2020'
const month = '3'
const day = '1'

const year2 = '2021'
const month2 = '8'
const day2 = '1'

export const resolvers = {
  Query: {
    books: async () => {

      const start = startDate(year, month, day)
      const end = endDate(year2, month2, day2)

      try {
        const response = await fetch(`${BASE_URL}${start}&to=${end}`)
        const data = await response.json()
        console.log(longestDecline(data.prices))
      } catch {
        console.log("couldn't get data")
      }
    },
  },
}
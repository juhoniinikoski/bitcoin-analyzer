import { makeExecutableSchema } from 'graphql-tools'
import { graphql } from 'graphql'
import { typeDefs, resolvers } from './schema'

const longRangeTest = {
    id: 'Data for long range',
    query: `
      query {
        statistics(
          start: { day: 12, month: 12, year: 2020 }
          end: { day: 12, month: 12, year: 2021 })
        {
          start
          end
          prices {
            date
            price
          }
        }
      }
    `,
}

describe('Resolver tests', () => {
    // array of all test cases, just 1 for now
    const cases = [longRangeTest]
    // reading the actual schema
    // const typeDefs = fs.readFileSync('./src/schemas/Movie.graphql', 'utf8')
    // make the actual schema and resolvers executable
    const schema = makeExecutableSchema({ typeDefs, resolvers })
    
    // running the test for each case in the cases array
    cases.forEach(obj => {
        const { id, query } = obj

        test(`query: ${id}`, async () => {
            const result = await graphql(schema, query)
            console.log(result)
            return expect(result).toHaveLength(366)
        })
    })
})
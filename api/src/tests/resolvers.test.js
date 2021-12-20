import { makeExecutableSchema } from '@graphql-tools/schema'
import { graphql } from 'graphql'
import { typeDefs, resolvers } from '../graphql/schema'

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
    length: 366
}

const midRangeTest = {
    id: 'Data for mid range',
    query: `
      query {
        statistics(
          start: { day: 1, month: 1, year: 2020 }
          end: { day: 1, month: 2, year: 2020 })
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
    length: 32
}

const shortRangeTest = {
    id: 'Data for short range',
    query: `
      query {
        statistics(
          start: { day: 1, month: 1, year: 2020 }
          end: { day: 3, month: 1, year: 2020 })
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
    length: 3
}

const shortestRangeTest = {
    id: 'Data for shortest range',
    query: `
      query {
        statistics(
          start: { day: 18, month: 12, year: 2021 }
          end: { day: 19, month: 12, year: 2021 })
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
    length: 2
}

describe('Range tests', () => {
    // array of all test cases
    const cases = [longRangeTest, midRangeTest, shortRangeTest, shortestRangeTest]

    // make the actual schema and resolvers executable
    const schema = makeExecutableSchema({ typeDefs, resolvers })
    
    // running the test for each case in the cases array
    cases.forEach(obj => {
        const { id, query, length } = obj

        test(`query: ${id}`, async () => {
            const result = await graphql(schema, query)
            const stats = result.data.statistics
            return expect(stats.prices).toHaveLength(length)
        })
    })
})

const bearishTest1 = {
  id: 'Bearish 1',
  query: `
    query {
      statistics(
        start: { day: 1, month: 3, year: 2020 }
        end: { day: 1, month: 8, year: 2021 })
      {
        start
        end
        decline {
          longest
        }
      }
    }
  `,
  length: 8
}

const bearishTest2 = {
  id: 'Bearish 2',
  query: `
    query {
      statistics(
        start: { day: 19, month: 1, year: 2020 }
        end: { day: 21, month: 1, year: 2020 })
      {
        start
        end
        decline {
          longest
        }
        profitRange {
          profit
          rangeStart
          rangeEnd
        }
      }
    }
  `,
  profit: 0,
  length: 2
}

describe('Bearish tests', () => {
  // array of all test cases
  const cases = [bearishTest1, bearishTest2]

  // make the actual schema and resolvers executable
  const schema = makeExecutableSchema({ typeDefs, resolvers })
  
  // running the test for each case in the cases array
  cases.forEach(obj => {
      const { id, query, length } = obj

      test(`query: ${id}`, async () => {
          const result = await graphql(schema, query)
          const stats = result.data.statistics
          return expect(stats.decline.longest).toEqual(length)
      })
  })
})

const rangeTest1 = {
  id: 'Range 1',
  query: `
    query {
      statistics(
        start: { day: 24, month: 9, year: 2021 }
        end: { day: 26, month: 10, year: 2021 })
      {
        start
        end
        decline {
          longest
        }
        profitRange {
          profit
          rangeStart
          rangeEnd
        }
      }
    }
  `,
  start: 29,
  end: 21,
}

const rangeTest2 = {
  id: 'Range 2',
  query: `
    query {
      statistics(
        start: { day: 21, month: 10, year: 2021 }
        end: { day: 6, month: 11, year: 2021 })
      {
        start
        end
        decline {
          longest
        }
        profitRange {
          profit
          rangeStart
          rangeEnd
        }
      }
    }
  `,
  start: 28,
  end: 3,
}

const rangeTest3 = {
  id: 'Range 3',
  query: `
    query {
      statistics(
        start: { day: 2, month: 12, year: 2021 }
        end: { day: 5, month: 12, year: 2021 })
      {
        start
        end
        decline {
          longest
        }
        profitRange {
          profit
          rangeStart
          rangeEnd
        }
      }
    }
  `,
  start: 2,
  end: 2,
}

describe('Profit tests', () => {
  // array of all test cases
  const cases = [rangeTest1, rangeTest2, rangeTest3]

  // make the actual schema and resolvers executable
  const schema = makeExecutableSchema({ typeDefs, resolvers })
  
  // running the test for each case in the cases array
  const { query, profit } = bearishTest2
  const id = "Negative profit"

  test(`query: ${id}`, async () => {
    const result = await graphql(schema, query)
    const stats = result.data.statistics
    return expect(stats.profitRange.profit).toEqual(profit)
  })

  cases.forEach(obj => {
      const { query, start, end, id } = obj

      test(`query: ${id} start day`, async () => {
          const result = await graphql(schema, query)
          const stats = result.data.statistics
          return expect(stats.profitRange.rangeStart[0].getDate()).toEqual(start)
      })

      test(`query: ${id} end day`, async () => {
          const result = await graphql(schema, query)
          const stats = result.data.statistics
          return expect(stats.profitRange.rangeEnd[0].getDate()).toEqual(end)
      })
  })
})
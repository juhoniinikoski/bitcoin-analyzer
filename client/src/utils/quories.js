import { gql } from '@apollo/client'

export const GET_STATS = gql`
  query statistics(
    $start: Payload!
    $end: Payload!
  ) {
    statistics(
      start: $start
      end: $end
    ) {
      start
      end
      prices {
        date
        price
      }
      decline {
        longest
        start
        end
      }
      highestVolume {
        date
        volume
      }
      profitRange {
        profit
        rangeStart
        rangeEnd
      }
    }
  }
`
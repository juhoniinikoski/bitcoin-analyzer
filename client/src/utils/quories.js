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
        difference
        rangeStart
        rangeEnd
      }
    }
  }
`
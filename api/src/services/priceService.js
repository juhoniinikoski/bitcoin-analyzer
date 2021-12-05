
export const longestDecline = (prices) => {
  
  let longest = 0
  let length = 0
  let start = prices[0][0]
  let end = prices[0][0]
  for (let i = 1; i < prices.length; i++) {
    // prices[i][0] = date, prices[i][1] = price
    if (prices[i][1] < prices[i - 1][1]) {
      length += 1
      if (length > longest) {
        start = prices[i - length][0]
        end = prices[i][0]
        longest = length
      }
    } else {
      length = 0
    }
  }

  return { longest, start, end }

}

export const pricesToObject = (prices) => {
  const mapped = prices.map(p => {
    return {
      date: p[0],
      price: p[1]
    }
  })
  return mapped
}

export const highestVolume = (volumes) => {
  const volumeList = volumes.map(v => parseFloat(v[1]))
  const max = Math.max(...volumeList)
  const index = volumeList.indexOf(max)
  const date = volumes[index][0]
  return {date, volume: max}
}

export const mostProfitableRange = (prices) => {
  var min = [{ id: 0, price: prices[0][1] }]
  var max = [{ id: 0, price: prices[0][1] }]
  var differences = []
  var id = 0
  for (let i = 1; i < prices.length; i++) {
    if (prices[i][1] < min[id].price) {
      differences[id] = max[id].price - min[id].price
      id += 1
      min[id] = { id: i, price: prices[i][1] }
      max[id] = { id: i, price: prices[i][1] }
    }
    if (prices[i][1] > max[id].price) {
      max[id] = { id: i, price: prices[i][1] }
    }
  }
  differences[id] = max[id].price - min[id].price
  
  const index = differences.indexOf(Math.max(...differences))
  const rangeStart = prices[min[index].id]
  const rangeEnd = prices[max[index].id]
  return { rangeStart, rangeEnd, difference: differences[index] }
}
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
        console.log("päivitettiin " + length)
      }
    } else {
      longest = Math.max(longest, length)
      length = 0
    }
  }
  return { longest, start, end }

}
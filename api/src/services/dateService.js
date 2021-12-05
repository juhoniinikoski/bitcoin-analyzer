export const startDate = (year, month, day) => parseInt((Date.UTC(year, month - 1, day) / 1000).toFixed(0))

// added 1 hour to endDate for making sure that it contains data for the last day
export const endDate = (year, month, day) => parseInt((Date.UTC(year, month - 1, day, '1') / 1000).toFixed(0))

export const unixToDate = (date) => new Date(date)

export const filterTimeStamps = (data) => {
  const dates = data.map(p => [unixToDate(p[0]), p[1]])
  const filtered = dates.filter(d => (d[0].getUTCHours() === 0))
  return filtered
}
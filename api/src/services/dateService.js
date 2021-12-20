export const startDate = (year, month, day) => parseInt((Date.UTC(year, month - 1, day) / 1000).toFixed(0))

// added 1 hour to endDate for making sure that it contains data for the last day
export const endDate = (year, month, day) => parseInt((Date.UTC(year, month - 1, day, '1') / 1000).toFixed(0))

export const unixToDate = (date) => new Date(date)

export const filterTimeStamps = (data) => {
  const dates = data.map(p => [unixToDate(p[0]), p[1]])

  // group timestamps by dates and pick just one first time
  // if there are multiple timestamps within first hour of the day
  var groups = {}

  dates.forEach(element => {
    const day = element[0].getUTCDate()
    const month = element[0].getUTCMonth() + 1
    const year = element[0].getUTCFullYear()
    const date = `${year}-${month}-${day}`
    if (!(date in groups)) {
        groups[date] = element
    }
  })

  const filtered = Object.values(groups)
  
  return filtered
}
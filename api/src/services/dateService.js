export const startDate = (year, month, day) => parseInt((Date.UTC(year, month - 1, day) / 1000).toFixed(0))

// added 1 hour to endDate for making sure that it contains data for the last day
export const endDate = (year, month, day) => parseInt((Date.UTC(year, month - 1, day, '1') / 1000).toFixed(0))
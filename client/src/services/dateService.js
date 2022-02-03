

const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

const isNumeric = (char) => {
  return !isNaN(char - parseInt(char))
}

export const validate = (date, setValidated) => {
  
  var validated = date

  if (!date.every(d => isNumeric(d))) {
    return validated.join(" / ")
  }

  const today = new Date()
  const yesterday = new Date(today)

  yesterday.setDate(yesterday.getDate() - 1)

  const currentYear = today.getFullYear()
  const currentDay = today.getDate()
  const currentMonth = today.getMonth() + 1

  const normalDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  const daysLeap = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  const days = isLeapYear(validated[2]) ? daysLeap : normalDays

  if (parseInt(validated[2]) > currentYear) {
    validated[2] = `${currentYear}`
  }

  if (parseInt(validated[2]) < 2013) {
    validated[2] = 2013
  }

  if (parseInt(validated[0]) < 0) {
    validated[0] = "01"
  }

  if (parseInt(validated[1]) < 0) {
    validated[1] = "01"
  }
  
  if (parseInt(validated[1]) > 12) {
    validated[1] = "12"
  }

  if (parseInt(validated[0]) > days[validated[1] - 1]) {
    validated[0] = days[validated[1] - 1]
  }

  if (parseInt(validated[2]) === currentYear && parseInt(validated[1]) >= currentMonth) {
    validated[0] = currentDay < 10 ? `0${currentDay}` : currentDay
    validated[1] = currentMonth < 10 ? `0${currentMonth}` : currentMonth
    validated[2] = currentYear
  }

  setValidated(true)
  return validated.join(" / ")
}

export const dateToUnix = (date) => {
  const {year, month, day} = date
  return parseInt((Date.UTC(year, month - 1, day) / 1000).toFixed(0))
}

export const checkDates = (start, end) => {

  const today = new Date()

  if (start > end) {
    return false
  } else if (start > today.getTime()) {
    return false
  } else if (end < 1367107200) {
    return false
  }
  return true
}

export const unixToDate = (unixDate) => {
  const date = new Date(unixDate * 1000)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return { year: year, month: month, day: day}
}
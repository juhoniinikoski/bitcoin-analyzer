

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

  if (parseInt(validated[2]) === currentYear && parseInt(validated[0]) > currentDay && parseInt(validated[1]) >= currentMonth) {
    validated[0] = currentDay
    validated[1] = currentMonth
    validated[2] = currentYear
  }

  setValidated(true)
  return validated.join(" / ")
}
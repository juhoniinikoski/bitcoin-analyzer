import React from 'react'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { colors } from '../styles/colors'
import { validate } from '../services/dateService'

const DateSelector= ({ date, setDate, validated, setValidated, placeholder }) => {

  const [prevLength, setPrevLength] = React.useState(0)

  const format = (raw) => {
    var formatted = raw
    if (raw.length >= prevLength) {
      if (prevLength === 1 || prevLength === 6) {
        formatted = raw + " / "
      }
    } else {
      if (prevLength === 5 || prevLength === 10) {
        formatted = raw.substring(0, raw.length - 3)
      }
    }
    setPrevLength(formatted.length)
    const parts = formatted.split("/").map(p => p.trim())
    if (parts.length === 3 && parts[2].length === 4 && parts[0].length === 2 && parts[1].length === 2) {
      formatted = validate(parts, setValidated)
    } else if (validated === true) {
      setValidated(false)
    }
    return formatted
  }

  const handleChange = (e) => {
    const value = e.target.value
    const formatted = format(value)
    setDate(formatted)
  }

  return (
    <div className='selector-container'>
      <div className='date-container'>
        <input
          type="text"
          maxLength={14}
          value={date}
          placeholder={placeholder}
          onChange={handleChange}
          style={{width: 150}}
        >
        </input>
      </div>
      <FaRegCalendarAlt size={20} color={colors.disabled} style={{marginRight: 8, cursor: "not-allowed"}}/>
    </div>
  )
}

export default DateSelector
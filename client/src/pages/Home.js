import React from 'react'
import DateSelector from '../components/DateSelector'

const Home = () => {

  const [startDate, setStartDate] = React.useState("")
  const [endDate, setEndDate] = React.useState("")
  const [startValidated, setStartValidated] = React.useState(false)
  const [endValidated, setEndValidated] = React.useState(false)

  const [valid, setValid] = React.useState(false)

  React.useEffect(() => {
    if (startValidated && endValidated) {

      const startParts = startDate.split("/").map(p => p.trim())
      const endParts = endDate.split("/").map(p => p.trim())

      if (startParts[2] < endParts[2]) {
        setValid(true)
      } else if (startParts[2] === endParts[2] && startParts[1] < endParts[1]) {
        setValid(true)
      } else if (startParts[2] === endParts[2] && startParts[1] === endParts[1] && startParts[0] < endParts[0]) {
        setValid(true)
      }
    
    } else if (valid === true) {
      setValid(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valid, startValidated, endValidated])


  return (
    <div>
      <h1>Hi there! 👋</h1>
      <h2>Check out the <b>Bitcoin</b> statistics to analyze its marketvalue within a given date range.</h2>
      <h2>Start by defining a range you want to inspect from below.</h2>
      <p className='helper-text'>Select the beginning date of the range</p>
      <DateSelector date={startDate} setDate={setStartDate} validated={startValidated} setValidated={setStartValidated}/>
      <p className='helper-text'>Select the ending date of the range</p>
      <DateSelector date={endDate} setDate={setEndDate} validated={endValidated} setValidated={setEndValidated}/>
    </div>
  )
}

export default Home
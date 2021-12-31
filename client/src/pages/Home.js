import React from 'react'
import DateSelector from '../components/DateSelector'
import Layout from '../components/layout'
import { textContent } from '../content/textContent'
import { MdDone, MdNotInterested } from 'react-icons/md'
import { colors } from '../styles/colors'
import { useNavigate, useParams } from 'react-router-dom'
import { dateToUnix } from '../services/dateService'

const Home = () => {

  const params = useParams()
  const language = params.language

  const [startDate, setStartDate] = React.useState("")
  const [endDate, setEndDate] = React.useState("")
  const [startValidated, setStartValidated] = React.useState(false)
  const [endValidated, setEndValidated] = React.useState(false)

  const [valid, setValid] = React.useState(false)
  const navigate = useNavigate()

  const content = language === 'en' ? textContent.en : textContent.fi

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


  const handleSubmit = () => {

    const parsedStart = startDate.split("/")
      .map(value => value.trim())
      .map(value => parseInt(value))
    
    const parsedEnd = endDate.split("/")
      .map(value => value.trim())
      .map(value => parseInt(value))
    
    const start = { day: parsedStart[0], month: parsedStart[1], year: parsedStart[2] }
    const end = { day: parsedEnd[0], month: parsedEnd[1], year: parsedEnd[2] }

    navigate(`/${language}/statistics?start=${dateToUnix(start)}&end=${dateToUnix(end)}`, {
      state: {start: start, end: end}
    })
  }


  return (
    <Layout language={language}>
      <div>
        <h1>{content.greeting}</h1>
        <h2>{content.subtitle1_1}<b>Bitcoin</b>{content.subtitle1_2}</h2>
        <h2>{content.subtitle2}</h2>
        <form onSubmit={handleSubmit}>
          <p className='helper-text'>{content.input1}</p>
          <DateSelector
            date={startDate}
            setDate={setStartDate}
            validated={startValidated}
            setValidated={setStartValidated}
            placeholder={content.placeholder}/>
          <p className='helper-text'>{content.input2}</p>
          <DateSelector
            date={endDate}
            setDate={setEndDate}
            validated={endValidated}
            setValidated={setEndValidated}
            placeholder={content.placeholder}/>
          <button className='submit-button' disabled={!valid} type="submit">
            {valid ? <MdDone size={22} color={colors.primaryDark}/> :
            <MdNotInterested size={22} color={colors.disabled}/>}
            <p style={{color: valid ? colors.primaryDark : colors.disabled}}>{content.submit}</p>
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default Home
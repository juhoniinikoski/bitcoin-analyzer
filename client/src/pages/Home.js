import React from 'react'
import DateSelector from '../components/DateSelector'

const Home = () => {

  return (
    <div>
      <h1>Hi there! 👋</h1>
      <h2>Check out the <b>Bitcoin</b> statistics to analyze its marketvalue within a given date range.</h2>
      <h2>Start by defining a range you want to inspect from below.</h2>
      <p className='helper-text'>Select the beginning date of the range</p>
      <DateSelector />
      <p className='helper-text'>Select the ending date of the range</p>
      <DateSelector />
    </div>
  )
}

export default Home
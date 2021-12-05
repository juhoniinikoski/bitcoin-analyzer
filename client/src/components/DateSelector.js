import React from 'react'
import { FaAngleDown } from 'react-icons/fa'

const DateSelector= () => (
  <div className='selector-container'>
    <div className='selector-item' style={{flex: 6, marginRight: 10}}>
      <div className='selector-content'>
        <p>01</p>
        <FaAngleDown style={{marginTop: 2}}/>
      </div>
    </div>
    <div className='selector-item' style={{flex: 10, marginRight: 10, marginLeft: 10}}>
      <div className='selector-content'>
        <p>September</p>
        <FaAngleDown style={{marginTop: 2}}/>
      </div>
    </div>
    <div className='selector-item' style={{flex: 7, marginLeft: 10}}>
      <div className='selector-content'>
        <p>2021</p>
        <FaAngleDown style={{marginTop: 2}}/>
      </div>
    </div>
  </div>
)

export default DateSelector
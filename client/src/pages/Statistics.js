import React from "react"
import { useQuery } from '@apollo/client'
import { GET_STATS } from '../utils/quories'
import { useLocation, useParams } from 'react-router-dom'
import Layout from "../utils/layout"
import { textContent } from "../content/textContent"

const Statistics = () => {

  const location = useLocation()
  const { language } = useParams()

  return (
    <Layout language={language}>
      <div>
        {location.state ? <div>
          <Stats state={location.state} language={language}/>
        </div>
        :
        <div>
          Ei oo state
        </div>}
      </div>
    </Layout>
  )
}

const Stats = ({ state, language }) => {

  const {start, end} = state

  const { data, loading } = useQuery(GET_STATS, {
    variables: {start, end},
    fetchPolicy: "cache-and-network",
  })

  const stats = data?.statistics
  const content = language === 'en' ? textContent.en : textContent.fi

  if (loading) {
    return (
      <div>Loading</div>
    )
  }

  return (
    <div>
      <h1>Päivämäärät tähän</h1>
      <div style={{display: 'flex', marginTop: 48}}>
        <div style={{flex: 2}}>
          <h3>{content.bearish}</h3>
            <li>{stats.decline.longest} {content.days}</li>
            <li style={{marginBottom: 36}}>{content.from} {stats.decline.start.split("T")[0]} {content.to} {stats.decline.end.split("T")[0]}</li>
          <h3>{content.volume}</h3>
            <li>{stats.highestVolume.volume} €</li>
            <li style={{marginBottom: 36}}>{content.in} {stats.highestVolume.date.split("T")[0]}</li>
          <h3>{content.profit}</h3>
            <p style={{marginBottom: 16}}>{content.profitTip}</p>
            <li>{content.buy} {stats.profitRange.rangeStart[0].split("T")[0]}</li>
            <li>{content.sell} {stats.profitRange.rangeEnd[0].split("T")[0]}</li>
            <p style={{marginTop: 16}}>{content.revenue} {stats.profitRange.difference} €</p>
        </div>
        <div style={{backgroundColor: 'blue', flex: 3}}>
          Hei
        </div>
      </div>
    </div>
  )
}

export default Statistics
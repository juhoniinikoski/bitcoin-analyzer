import React from "react"
import { useQuery } from '@apollo/client'
import { GET_STATS } from '../utils/quories'
import { useLocation, useParams } from 'react-router-dom'
import Layout from "../components/layout"
import { textContent } from "../content/textContent"
import { LineChart } from 'react-chartkick'
import 'chartkick/chart.js'

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

  // removes T from timestamp and instead of separating numbers with "-", separates them with "/"
  const formatDate = (date) => date.split("T")[0].split("-").reverse().join("/")

  // adds commas and rounds to 2 decimal for more clear representation of large numbers
  const formatFloat = (price) => price.toLocaleString("en", { maximumFractionDigits: 2 })

  const formatPrices = (prices) => Object.fromEntries(
    // removes time from timestamp and creates map for chart data
    prices.map(p => [p.date.substring(0, p.date.length - 14), p.price])
  )

  if (loading) {
    return (
      <div>Loading</div>
    )
  }

  return (
    <div>
      <h1 style={{marginBottom: 48}}>{formatDate(stats.start)} - {formatDate(stats.end)}</h1>
      <LineChart data={formatPrices(stats.prices)} points={false} suffix=" €" thousands="," round={2}/>
      <div style={{display: 'flex', marginTop: 48}}>
        <div className="data-container" style={{marginRight: 8}}>
          <p>{content.volume}</p>
          <h3>{formatFloat(stats.highestVolume.volume)} €</h3>
          <p>{content.in} {formatDate(stats.highestVolume.date)}</p>
        </div>
        <div className="data-container" style={{marginLeft: 8}}>
          <p>{content.bearish}</p>
          <h3>{stats.decline.longest} {content.days}</h3>
          <p>{formatDate(stats.decline.start)} - {formatDate(stats.decline.end)}</p>
        </div>
      </div>
      {stats.profitRange.profit === 0 ?
          <p>{content.negative}</p>
          : 
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
            <p>{content.profitTip1} <b>{formatFloat(stats.profitRange.profit)} %</b> {content.profitTip2}</p>
            <div style={{display: 'flex', marginTop: 48, width: '100%'}}>
              <div className="data-container" style={{marginRight: 8, height: 115}}>
                <p>{content.buy}</p>
                <h3>{formatDate(stats.profitRange.rangeStart[0])}</h3>
              </div>
              <div className="data-container" style={{marginLeft: 8, height: 115}}>
                <p>{content.sell}</p>
                <h3>{formatDate(stats.profitRange.rangeEnd[0])}</h3>
              </div>
            </div>
          </div>
        }
    </div>
  )
}

export default Statistics
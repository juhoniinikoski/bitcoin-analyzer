import React from "react"
import { useQuery } from '@apollo/client'
import { GET_STATS } from '../utils/quories'
import { useParams } from 'react-router-dom'
import Layout from "../components/layout"
import { colors}  from '../styles/colors'
import { textContent } from "../content/textContent"
import { LineChart } from 'react-chartkick'
import ClipLoader from "react-spinners/ClipLoader";
import 'chartkick/chart.js'
import { checkDates, unixToDate } from "../services/dateService"

const Statistics = () => {

  const { language } = useParams()
  const content = language === 'en' ? textContent.en : textContent.fi

  const params = new URLSearchParams(window.location.search)
  const start = params.get('start')
  const end = params.get('end')

  const valid = checkDates(start, end)

  return (
    <Layout language={language}>
      <div>
        {valid ? <div>
          {/* start ja end parametreinä */}
          <Stats start={unixToDate(start)} end={unixToDate(end)} language={language}/>
        </div>
        :
        <div>
          {content.noContent}
        </div>}
      </div>
    </Layout>
  )
}

const Stats = ({ start, end, language }) => {

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
      <div className="loader-container">
        <ClipLoader />
      </div>
    )
  }

  return (
    <div>
      <h1>{formatDate(stats.start)} - {formatDate(stats.end)}</h1>
      <p style={{fontWeight: 'bold', color: colors.disabled, marginBottom: 48}}>Bitcoin</p>
      <LineChart data={formatPrices(stats.prices)} points={false} suffix=" €" thousands="," round={2}/>
      <div className="stat-container">
        <div className="data-container-left" >
          <p>{content.volume}</p>
          <h3>{formatFloat(stats.highestVolume.volume)} €</h3>
          <p>{content.in} {formatDate(stats.highestVolume.date)}</p>
        </div>
        <div className="data-container-right" >
          <p>{content.bearish}</p>
          <h3>{stats.decline.longest} {content.days}</h3>
          <p>{formatDate(stats.decline.start)} - {formatDate(stats.decline.end)}</p>
        </div>
      </div>
      {stats.profitRange.profit === 0 ?
          <p style={{marginBottom: 48}}>{content.negative}</p>
          : 
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
            <p>{content.profitTip1} <b>{formatFloat(stats.profitRange.profit)} %</b> {content.profitTip2}</p>
            <div className="stat-container" style={{width: '100%'}}>
              <div className="data-container-left" style={{height: 115}}>
                <p>{content.buy}</p>
                <h3>{formatDate(stats.profitRange.rangeStart[0])}</h3>
              </div>
              <div className="data-container-right" style={{height: 115}}>
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
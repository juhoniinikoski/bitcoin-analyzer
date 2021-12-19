import React from 'react'
import Home from './pages/Home'
import Statistics from './pages/Statistics'
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Navigate,
  useParams
} from "react-router-dom"

const App = () => {

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/:language/statistics/" element={<Validator component={<Statistics />} />}/>
        <Route path="/:language" element={<Validator component={<Home />}/>} />
        <Route path="/" element={<Navigate replace to="/en" />} />
      </Switch>
    </Router>
  )
}

const Validator = ({ component }) => {
  const params = useParams()
  if (params.language === 'en' || params.language === 'fi') {
    return <>{component}</>
  } else {
    return <Navigate replace to="/en" />
  }
}

export default App
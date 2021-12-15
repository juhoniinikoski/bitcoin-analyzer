import React from 'react'
import Home from './pages/Home'
import Statistics from './pages/Statistics'
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Navigate
} from "react-router-dom"

const App = () => {

  return (
    <Router>
      <Switch>
        <Route path="/:language/statistics/" element={<Statistics />}/>
        <Route path="/:language" element={<Home />} />
        <Route path="/" element={<Navigate replace to="/en" />} />
      </Switch>
    </Router>
  )
}

export default App
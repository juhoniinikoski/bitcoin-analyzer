import ReactDOM from 'react-dom'
import App from './App'
import './styles/styles.css'
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"

const client = new ApolloClient({
  // uri: 'http://localhost:4000/graphql',
  uri: 'https://bitcoin-analyzer-app.herokuapp.com/graphql',
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)

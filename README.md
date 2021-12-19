<div id="top"></div>


<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h1 align="center">Bitcoin Analyzor</h1>

  <p align="center">
    <a href="http://juhoniinikoski.github.io/bitcoin-analyzer">http://juhoniinikoski.github.io/bitcoin-analyzer</a>
    <!-- <br />
    <a href="https://github.com/juhoniinikoski/bitcoin-analyzer/tree/main/client">Client docs</a>
    ·
    <a href="https://github.com/juhoniinikoski/bitcoin-analyzer/tree/main/api">API docs</a> -->
  </p>
</div>

<!-- ABOUT THE PROJECT -->
## About The Project

This Bitcoin Analyzer utilizes [CoinGecko's](https://www.coingecko.com/en/api/documentation) public API to offer tool to analyze Bitcoin.
It includes information about the longest bearish trend and the highest trading volume within given date range.
This application also suggest dates that would have been optimal to buy and sell Bitcoin to gain largest profit possible within given date range. If the whole date range has a bearish trend, then there is no suggestion about optimal dates as they don't exist.

### Built With

* [React](https://reactjs.org)
* [GraphQL](https://graphql.org)
* [Apollo](https://www.apollographql.com)
* [Chartkick](https://chartkick.com)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## 🚀 Getting started

This application is hosted on Github Pages. You can use the application at [http://juhoniinikoski.github.io/bitcoin-analyzer](http://juhoniinikoski.github.io/bitcoin-analyzer)

In order to test the application in your local environment, you should run both client and API locally. To get a local copy up and running, follow these simple example steps.

### ✔️ Requirements

Node (versions `17.X.X` are tested, but earlier versions _should_ work as well) and npm. If you haven't installed Node or npm, [nvm](https://github.com/nvm-sh/nvm) is an easy to use tool for installing both. Nvm is also handy if you want to quickly switch between different Node versions.

#### API

1. Clone this repository and run `npm install` in the `api` directory.

2. Run `npm start` to start the server. After the server has started, you should be able to access the [Apollo Sandbox](https://www.apollographql.com/docs/studio/explorer/sandbox/) at http://localhost:4000/graphql to query the server. Please use Chrome of Firefox with Apollo Sandbox as Safari won't work correctly with it.

#### Client

1. Clone this repository (if you haven't already) and run `npm install` in the `client` directory.

2. Run `npm start` to start the app. After the app has started you should be able to access it at http://localhost:3000/.

3. (Optional) If you want to test application with locally run server, please go to `index.js` file and change ApolloClient uri to `uri: 'http://localhost:4000/graphql'`. Note that you should be running server as shown above.


<p align="right">(<a href="#top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Juho Niinikoski - niinikoskijuho@gmail.com

<p align="right">(<a href="#top">back to top</a>)</p>

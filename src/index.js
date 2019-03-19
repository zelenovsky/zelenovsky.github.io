import React from 'react'
import { render } from 'react-dom'
import {
    ApolloClient,
    HttpLink,
    InMemoryCache
} from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'


import './stuff/font.css'
import './stuff/variables.css'
import './index.css'
import App from './components/App'
import {
    GITHUB_URI,
    TOKEN
} from './constants'
import registerServiceWorker from './registerServiceWorker'

const link = new HttpLink({
    uri: GITHUB_URI,
    headers: {
        authorization: `Bearer ${ TOKEN }`
    }
})

const cache = new InMemoryCache()

const client = new ApolloClient({
    link,
    cache
})

render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
)
registerServiceWorker()

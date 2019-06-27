import { Provider } from 'react-redux'
import React from 'react'

import store from './store'
import Router from './routes'
import Alert from './components/Alert'

import './App.sass'

const App = () => (
  <Provider store={store}>
    <main className='app'>
      <Router />
    </main>
    {/* <Alert /> */}
  </Provider>
)
export default App

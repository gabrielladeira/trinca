import { ConnectedRouter } from 'connected-react-router'
import { BrowserRouter, Route } from 'react-router-dom'
import React from 'react'

import history from './history'
import Main from '../screens/Main'
import BarbecueSummary from '../screens/BarbecueSummary'

const Router = () => (
  <ConnectedRouter history={history}>
    <BrowserRouter>
      <Route exact path='/' component={Main} />
      <Route path='/barbecue/:barbecueId' component={BarbecueSummary} />
    </BrowserRouter>
  </ConnectedRouter>
)

export default Router

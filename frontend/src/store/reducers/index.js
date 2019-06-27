import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import history from '../../routes/history'
import initialState from './initialState'
import appState from './appState'
import barbecue from './barbecue'

export default combineReducers({
  router: connectRouter(history),
  initialState,
  appState,
  barbecue
})

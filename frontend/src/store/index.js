import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import ReduxThunk from 'redux-thunk'

import history from '../routes/history'
import reducers from './reducers'

const middlewares = [routerMiddleware(history), ReduxThunk]
const store = createStore(
  reducers,
  applyMiddleware(...middlewares)
)
window.store = store
export default store

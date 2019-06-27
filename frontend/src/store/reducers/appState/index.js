import { handleActions } from 'redux-actions'

import { showAlertAppState, hideAlertAppState } from './actions'
import initialState from '../initialState'

export const showAlert = (state, { payload }) => {
  const { alert } = payload
  const { open, title, description, primaryAction = null } = alert

  return {
    ...state,
    alert: {
      open,
      title,
      description,
      primaryAction
    }
  }
}

export const hideAlert = (state) => {
  return {
    ...state,
    alert: {
      open: false,
      title: null,
      description: null,
      primaryAction: null
    }
  }
}

export default handleActions({
  [showAlertAppState]: showAlert,
  [hideAlertAppState]: hideAlert
}, initialState.appState)

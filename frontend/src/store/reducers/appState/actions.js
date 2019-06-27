import { createAction } from 'redux-actions'

/**
 * create type and actions
 */

export const showAlertAppState = createAction('SHOW_ALERT_APP_STATUS')
export const hideAlertAppState = createAction('HIDE_ALERT_APP_STATUS')

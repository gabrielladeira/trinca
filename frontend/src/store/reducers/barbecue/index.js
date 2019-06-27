import { handleActions } from 'redux-actions'

import { reloadSchedulesBarbecue } from './actions'
import initialState from '../initialState'

const sortBarbecueSchedules = (schedules) => {
  return schedules.sort((a, b) => {
    if (a.scheduledTo >= b.scheduledTo) {
      return 1
    }
    return -1
  })
}

export const reloadSchedules = (state, { payload }) => {
  const { schedules: schedulesPayload } = payload
  const schedules = sortBarbecueSchedules(schedulesPayload)
  const [next] = schedules
  const comming = schedules.slice(1)

  return {
    ...state,
    schedules,
    next,
    comming,
  }
}

export default handleActions({
  [reloadSchedulesBarbecue]: reloadSchedules
}, initialState.barbecue)

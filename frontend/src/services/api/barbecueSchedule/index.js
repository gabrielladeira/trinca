import * as baseApiClient from './../baseApiClient'

const getNextBarbecueSchedules = async () => {
  const { status, data } = await baseApiClient.get('barbecue')

  if (status !== 200) {
    throw Error('Não foi possível carregar os próximos Churrascos')
  }

  return data
}

const getBarbecueSchedule = async (id) => {
  const { status, data } = await baseApiClient.get(`barbecue/${id}`)

  if (status !== 200) {
    throw Error('Não foi possível carregar os detalhes deste Churrasco')
  }

  return data
}

const createBarbecueSchedule = async (barbecueSchedule) => {
  const { status, data } = await baseApiClient.post('barbecue', barbecueSchedule)

  if (status !== 200) {
    return false
  }

  return true
}

const addParticipant = async (barbecueSchedule, participant) => {
  const { id } = barbecueSchedule
  const { status, data } = await baseApiClient.post(`barbecue/${id}/participants`, participant)

  if (status !== 200) {
    return false
  }

  return true
}

const updateParticipants = async (barbecueSchedule, participants) => {
  const { id } = barbecueSchedule
  const { status, data } = await baseApiClient.put(`barbecue/${id}/participants`, participants)

  if (status !== 200) {
    return false
  }

  return true
}

export {
  getNextBarbecueSchedules,
  getBarbecueSchedule,
  createBarbecueSchedule,
  addParticipant,
  updateParticipants
}

import React from 'react'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import { Card, CardActions, CardContent, Button } from '@material-ui/core'

import { sumPaidValues } from '../../helpers'

import './BarbecueCard.sass'

const BarbecueCard = ({ barbecueSchedule, onAddParticipantClick, history }) => {
  const { description, participants = [], scheduledTo, id } = barbecueSchedule

  const handleAddParticipantClick = () => {
    onAddParticipantClick(barbecueSchedule)
  }

  const handleSeeMoreClick = () => {
    history.push(`/barbecue/${id}`)
  }

  return (
    <Card className='barbecue-card'>
      <CardContent className='barbecue-card-content'>
        <span>{description}</span>
        <span>{moment(scheduledTo).format('DD/MM/YYYY')}</span>
        <span>{participants.length} participante(s) confirmado(s)</span>
        <span>Total arrecadado: R$ {sumPaidValues(participants)}</span>
      </CardContent>
      <CardActions className='card-actions'>
        <Button onClick={handleAddParticipantClick}>+ Participantes</Button>
        <Button onClick={handleSeeMoreClick}>Ver</Button>
      </CardActions>
    </Card >
  )
}

export default withRouter(BarbecueCard)

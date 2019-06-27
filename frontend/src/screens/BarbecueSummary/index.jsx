import React, { Component } from 'react'
import moment from 'moment'
import {
  Card,
  CardContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core'
import { DeleteOutline, EditOutlined } from '@material-ui/icons'

import { sumPaidValues, sumTotalValues, calculateWhoWillDrink, calculateWhoWillNotDrink } from '../../helpers'
import * as apiServices from '../../services/api'

import './BarbecueSummary.sass'

class BarbecueSummary extends Component {
  state = {
    barbecue: {}
  }

  componentDidMount() {
    this.load()
  }

  load = async () => {
    const { match: { params } } = this.props
    const { barbecueId } = params
    const barbecue = await apiServices.barbecueSchedule.getBarbecueSchedule(barbecueId)

    this.setState({
      barbecue
    })
  }

  handleDelete = (index) => async () => {
    const allow = window.confirm('Deseja realmente remover o participante?')
    if (allow) {
      const { barbecue } = this.state
      barbecue.participants.splice(index, 1)
      await apiServices.barbecueSchedule.updateParticipants(barbecue, barbecue.participants)
      this.setState({
        barbecue
      })
    }
  }

  handleEdit = (index) => async () => {
    alert('Ainda não implementado :(')
  }

  render() {
    const {
      description = '',
      observations = '',
      scheduledTo = null,
      suggestedPriceWithDrinks = 0,
      suggestedPriceWithoutDrinks = 0,
      participants = []
    } = this.state.barbecue

    return (
      <section className='barbecue-summary' >
        <h1>Churras da Trinca</h1>
        <h2>{description}</h2>
        <div className='wrapper'>
          <div>Dia {moment(scheduledTo).format('DD/MM/YYYY')}</div>
          <p>{observations}</p>
          <div>Quantos Pila?</div>
          <div className='suggested-price'>
            <div>Com bebida: R$ <span>{suggestedPriceWithDrinks}</span></div>
            <div>Sem bebida: R$ <span>{suggestedPriceWithoutDrinks}</span></div>
          </div>

          <Card className='summary-card'>
            <CardContent className='summary-content'>
              <div>{participants.length} participante(s) confirmado(s)</div>
              <div>Valor a ser arrecadado: R$ {sumTotalValues(participants)}</div>
              <div>Valor já pago: {sumPaidValues(participants)}</div>
              <div>Total de bebuns : {calculateWhoWillDrink(participants)}</div>
              <div>Total de saudáveis: {calculateWhoWillNotDrink(participants)}</div>
            </CardContent>
          </Card >

          <div className='participants-container'>
            <h3>Participantes</h3>
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell align='right'>Contribuícão</TableCell>
                    <TableCell align='right'>Bebida</TableCell>
                    <TableCell align='right'>Pago</TableCell>
                    <TableCell align='right'>Observação</TableCell>
                    <TableCell align='right'>{}</TableCell>
                    <TableCell align='right'>{}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {participants.map((row, index) => (
                    <TableRow key={row.name}>
                      <TableCell component='th' scope='row'>{row.name}</TableCell>
                      <TableCell align='right'>R$ {row.valueToPay}</TableCell>
                      <TableCell align='right'>{row.willDrink ? 'Sim' : 'Não'}</TableCell>
                      <TableCell align='right'>{row.paid ? 'Sim' : 'Não'}</TableCell>
                      <TableCell align='right'>{row.observations}</TableCell>
                      <TableCell align='center'>
                        <IconButton>
                          <EditOutlined onClick={this.handleEdit(index)} />
                        </IconButton>
                      </TableCell>
                      <TableCell align='center'>
                        <IconButton onClick={this.handleDelete(index)}>
                          <DeleteOutline />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </div>
        </div>
      </section>
    )
  }
}

export default BarbecueSummary

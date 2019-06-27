import React, { Component } from 'react'
import moment from 'moment'
import { TextField } from '@material-ui/core'

import FormatCurrency from '../FormatCurrency'
import CustomButton from '../CustomButton'

import * as apiServices from '../../services/api'

import './BarbecueScheduleForm.sass'

class BarbecueScheduleForm extends Component {
  state = {
    newBarbecue: {},
    canSubmit: false
  }

  handleConfirm = async () => {
    const { newBarbecue } = this.state
    if (!this.validateForm(newBarbecue)) {
      return
    }

    const ok = await apiServices.barbecueSchedule.createBarbecueSchedule(newBarbecue)
    this.props.onSubmited(ok, ok ? newBarbecue : null)
  }

  validateForm = (barbecueSchedule) => {
    const { scheduledTo, description } = barbecueSchedule
    const isValidScheduledTo = !!(scheduledTo && moment(scheduledTo).isSameOrAfter(new Date(), 'day'))
    const isValidDescription = !!description

    return isValidScheduledTo && isValidDescription
  }

  handleChange = name => (evt) => {
    const { newBarbecue } = this.state
    newBarbecue[name] = evt.target.value

    this.setState({
      newBarbecue,
      canSubmit: this.validateForm(newBarbecue)
    })
  }

  render() {
    const { newBarbecue, canSubmit } = this.state
    return (
      <div className='barbecue-form'>
        <h3>Novo Churras</h3>
        <TextField
          id='barbecue-schedule-to'
          type='date'
          label='Quando? *'
          value={newBarbecue.scheduledTo}
          className='field'
          onChange={this.handleChange('scheduledTo')}
          InputLabelProps={{
            shrink: true,
          }} />
        <TextField
          id='barbecue-description'
          label='Porque? *'
          value={newBarbecue.description}
          className='field'
          onChange={this.handleChange('description')}
          InputLabelProps={{
            shrink: true,
          }} />
        <TextField
          id='standard-name'
          label='Obs'
          className='barbecue-observations'
          value={newBarbecue.observations}
          onChange={this.handleChange('observations')}
          InputLabelProps={{
            shrink: true,
          }} />

        <div className='suggested-price'>
          <label>Valor de contribuíção sugerido</label>
          <div className='suggested-price-options'>
            <TextField
              id='barbecue-suggested-price-with-drink'
              label='Com bebida'
              value={newBarbecue.suggestedPriceWithDrinks}
              className='field'
              onChange={this.handleChange('suggestedPriceWithDrinks')}
              InputProps={{
                inputComponent: FormatCurrency
              }}
              InputLabelProps={{
                shrink: true,
              }} />
            <TextField
              id='barbecue-suggested-price-without-drink'
              label='Sem bebida'
              className='field'
              value={newBarbecue.suggestedPriceWithouDrinks}
              onChange={this.handleChange('suggestedPriceWithouDrinks')}
              InputProps={{
                inputComponent: FormatCurrency
              }}
              InputLabelProps={{
                shrink: true
              }} />
          </div>
        </div>
        <div className='actions'>
          <CustomButton key='confirm-barbecue' primary isLoading={false} enable={canSubmit} title={'Confirmar'}
            onClick={this.handleConfirm} />
        </div>
      </div>
    )
  }
}

export default BarbecueScheduleForm

import React, { Component } from 'react'
import moment from 'moment'

import { TextField, FormControl, FormControlLabel, FormLabel, Checkbox, RadioGroup, Radio } from '@material-ui/core'

import FormatCurrency from '../FormatCurrency'
import CustomButton from '../CustomButton'

import * as apiServices from '../../services/api'

import './AddParticipantForm.sass'

class AddParticipantForm extends Component {
  state = {
    barbecueSchedule: {},
    newParticipant: {},
    canSubmit: false
  }

  componentDidMount() {
    const { barbecueSchedule } = this.props

    this.setState({
      barbecueSchedule
    })
  }

  handleConfirm = async () => {
    const { barbecueSchedule, newParticipant } = this.state
    if (!this.validateForm(newParticipant)) {
      return
    }

    const ok = await apiServices.barbecueSchedule.addParticipant(barbecueSchedule, newParticipant)
    this.props.onSubmited(ok, ok ? newParticipant : null)
  }

  validateForm = (participant) => {
    const { name, valueToPay, willDrink } = participant

    return !!(name && valueToPay && willDrink)
  }

  handleChange = name => (evt) => {
    const { newParticipant } = this.state

    newParticipant[name] = evt.target.value

    this.setState({
      newParticipant,
      canSubmit: this.validateForm(newParticipant)
    })
  }

  toggleCheckbox = name => (evt) => {
    const { newParticipant } = this.state

    newParticipant[name] = !newParticipant[name]

    this.setState({
      newParticipant,
      canSubmit: this.validateForm(newParticipant)
    })
  }

  render() {
    const { newParticipant, canSubmit } = this.state
    return (
      <div className='add-participant-form'>
        <h3>Adicionar Participante</h3>
        <TextField
          id='participant-name'
          label='Nome *'
          value={newParticipant.name}
          className='field'
          onChange={this.handleChange('name')}
          InputLabelProps={{
            shrink: true,
          }} />
        <TextField
          id='participant-contribution'
          label='Valor da Contribuíção *'
          className='field'
          value={newParticipant.valueToPay}
          onChange={this.handleChange('valueToPay')}
          InputProps={{
            inputComponent: FormatCurrency
          }}
          InputLabelProps={{
            shrink: true
          }} />

        <FormControlLabel
          className='opt-in-paid'
          control={
            <Checkbox checked={newParticipant.paid} onChange={this.toggleCheckbox('paid')} value={newParticipant.paid} />
          }
          label='Pago' />

        <FormControl className='opt-drink' component="fieldset">
          <FormLabel component="legend">Incluir bebida? *</FormLabel>
          <RadioGroup
            name="willDrink"
            value={newParticipant.willDrink}
            onChange={this.handleChange('willDrink')}>
            <FormControlLabel value={'true'} control={<Radio />} label="Sim, com bebida" />
            <FormControlLabel value={'false'} control={<Radio />} label="Não, sem Bebida" />
          </RadioGroup>
        </FormControl>

        <TextField
          id='participant-ps'
          label='Obs'
          value={newParticipant.observations}
          className='field'
          onChange={this.handleChange('observations')}
          InputLabelProps={{
            shrink: true,
          }} />

        <div className='actions'>
          <CustomButton key='confirm-participant' primary isLoading={false} enable={canSubmit} title={'Confirmar'}
            onClick={this.handleConfirm} />
        </div>
      </div>
    )
  }
}

export default AddParticipantForm

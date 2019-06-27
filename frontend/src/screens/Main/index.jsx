import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Add } from '@material-ui/icons'

import BarbecueCard from '../../components/BarbecueCard'
import FloatButton from '../../components/FloatButton'
import Modal from '../../components/Modal'
import BarbecueScheduleForm from '../../components/BarbecueScheduleForm'
import AddParticipantForm from '../../components/AddParticipantForm'

import { reloadSchedulesBarbecue } from '../../store/reducers/barbecue/actions'
import * as apiServices from '../../services/api'

import './Main.sass'

class MainContainer extends Component {
  state = {
    modalBarbecueScheduleFormActive: false,
    modalAddParticipantFormActive: false
  }

  componentDidMount() {
    this.load()
  }

  load = async () => {
    const barbecueSchedules = await apiServices.barbecueSchedule.getNextBarbecueSchedules()
    const { reloadSchedules } = this.props
    reloadSchedules({ schedules: barbecueSchedules })
  }

  handleAddNewBarbecueClick = () => {
    this.setState({ modalBarbecueScheduleFormActive: true })
  }

  handleModalClose = () => {
    this.setState({
      modalBarbecueScheduleFormActive: false,
      modalAddParticipantFormActive: false
    })
  }

  handleParticipantFormSubmitClick = (barbecueSchedule) => {
    this.setState({
      modalAddParticipantFormActive: true,
      barbecueSchedule
    })
  }

  handleModalAddParticipantFormClose = () => {
    this.setState({ modalAddParticipantFormActive: false })
  }

  handleFormSubmit = (success) => {
    if (success) {
      this.load()
      this.handleModalClose()
    }
  }

  render() {
    const { next, comming } = this.props

    const { barbecueSchedule } = this.state

    return (
      <section className='main' >
        <h1>Churras da Trinca</h1>
        <div>
          <h2>Próximo Churras</h2>
          {next && <BarbecueCard barbecueSchedule={next} onAddParticipantClick={this.handleParticipantFormSubmitClick} />}
          {!next && <div>Nenhum churrasco próximo :(</div>}
        </div>
        {
          comming && comming.lenght &&
          <div>
            <h2>A Seguir</h2>
            <div className='comming-soon-barbecues'>
              {comming && comming.map(x => {
                return (<div className='comming-soon-card'>
                  <BarbecueCard barbecueSchedule={x} onAddParticipantClick={this.handleParticipantFormSubmitClick} />
                </div>)
              })}
            </div>
          </div>
        }
        <FloatButton title={'Adicionar nova data para churrasco'} icon={Add} onClick={this.handleAddNewBarbecueClick} />

        <Modal open={this.state.modalBarbecueScheduleFormActive} onClose={this.handleModalClose}>
          <BarbecueScheduleForm onSubmited={this.handleFormSubmit} />
        </Modal>

        <Modal open={this.state.modalAddParticipantFormActive} onClose={this.handleModalAddParticipantFormClose}>
          <AddParticipantForm barbecueSchedule={barbecueSchedule} onSubmited={this.handleFormSubmit} />
        </Modal>
      </section>
    )
  }
}

const mapStateToProps = state => {
  const { barbecue } = state
  return barbecue;
}

const mapDispatchToProps = {
  reloadSchedules: reloadSchedulesBarbecue
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)

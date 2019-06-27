import React from 'react'
import { connect } from 'react-redux'

import store from './../../store'
// import { hideAlertAppState } from './../../store/reducers/appState/actions'

import Modal from './../Modal'
import CustomButton from './../CustomButton'

import './Alert.sass'

const closeAlert = () => {}//store.dispatch({ type: hideAlertAppState })

const buildDefaultAction = () => {
  const enable = true
  return <CustomButton key='default-action' className={'alert-button'} enable={enable} title={'Entendi'} onClick={closeAlert} />
}

const buildPrimaryAction = (primaryAction) => {
  const enable = true
  const { title, action } = primaryAction

  const onClick = () => {
    action()
    closeAlert()
  }

  return <CustomButton key='primary-action' primary className={'alert-button'} enable={enable} title={title} onClick={onClick} />
}

const buildCancelAction = () => {
  const enable = true
  return <CustomButton key='cancel-action' className={'alert-button'} enable={enable} title={'Cancelar'} onClick={closeAlert} />
}

const Alert = ({ open, title, description, primaryAction }) => {
  return (
    <div className='alert-modal'>
      <Modal open={open} onClose={closeAlert}>
        <div className='alert-modal-content'>
          <label>{title}</label>
          <p>{description}</p>
          <div className='actions'>
            {!!primaryAction &&
              <>
                {buildCancelAction()}
                {buildPrimaryAction(primaryAction)}
              </>
            }
            {!primaryAction &&
              buildDefaultAction(primaryAction)
            }
          </div>
        </div>
      </Modal>
    </div >
  )
}

const mapStateToProps = state => {
  const { alert } = state.appState
  return alert
}

export default connect(mapStateToProps)(Alert)

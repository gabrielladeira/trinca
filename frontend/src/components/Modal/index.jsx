import React from 'react'
import { Modal as ModalCore } from '@material-ui/core'

import './Modal.sass'

const Modal = ({ open, onClose, children }) => {
  return (
    <ModalCore className='modal' open={open} onClose={onClose}>
      <div className='modal-wrapper'>
        {children}
      </div>
    </ModalCore>
  )
}

export default Modal

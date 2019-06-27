import React from 'react'
import { IconButton, Tooltip } from '@material-ui/core'

import './FloatButton.sass'

const FloatButton = (props) => {
  const { title, icon } = props
  const Icon = icon
  const handleClick = (evt) => {
    evt.preventDefault()
    props.onClick()
  }
  return (
    <div className='float-button-wrapper'>
      <Tooltip title={title} aria-label={title}>
        <IconButton onClick={(event) => handleClick(event)}>
          <Icon />
        </IconButton>
      </Tooltip>
    </div>
  )
}


export default FloatButton

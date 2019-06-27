import React from 'react'
import classNames from 'classnames'
import { Button, CircularProgress } from '@material-ui/core'

import './CustomButton.sass'

export const CustomButtonTypes = {
  Primary: 'primary',
  Secondary: 'secondary'
}

const CustomButton = ({
  primary,
  title,
  className = '',
  enable = true,
  isLoading = false,
  onClick }) => {
  const type = primary ? CustomButtonTypes.Primary : CustomButtonTypes.Secondary
  return (
    <div className={classNames('custom-button', className)} >
      <Button
        onClick={onClick}
        className={classNames('default', type, { disabled: !enable, 'loading-active': isLoading })}
        disabled={!enable}
      >
        <span className='title'>{title}</span>
      </Button>
      <CircularProgress className={`loading ${isLoading ? 'show' : ''}`}
        size={16}
        thickness={5} />
    </div >
  )
}

export default CustomButton

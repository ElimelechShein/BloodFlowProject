import React from 'react'

const Button = ({children,...propsl}) => {
  return (
    <button className="Button" {...propsl} >{children}</button>
  )
}

export default Button


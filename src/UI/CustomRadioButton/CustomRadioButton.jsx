import React from 'react'
import style from './CustomRadioButton.module.scss'

const CustomRadioButton = React.forwardRef(({current, icon, ...props}, ref)=>{
  return (
    <label className={`${style.radio_wrap} ${current ? style.current : ''}`}>
      <input ref={ref} className={style.radio} type="radio" {...props} />
      <img className={style.icon} src={`https://clanner-server.onrender.com${icon}`} alt="class icon" />
    </label>
  )
})

export default CustomRadioButton
import React from "react";
import style from './CustomInput.module.scss'


const CustomInput = React.forwardRef(({label, error, ...props}, ref)=>{
  return (
  <div className={style.inputWrap}>
    {label ? <label className={style.label}>{label}</label> : null}
    <input className={style.input} ref={ref} {...props}/>
    <span className={style.warning}>{error}</span>
  </div>
  )
})

export default CustomInput
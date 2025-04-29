import React from "react";
import style from './InputForm.module.scss'


const InputForm = React.forwardRef(({label, error, ...props}, ref)=>{
  return (
  <div className={style.inputWrap}>
    <label className={style.label}>{label}</label>
    <input className={style.input} ref={ref} {...props}/>
    <span className={style.warning}>{error}</span>
  </div>
  )
})

export default InputForm
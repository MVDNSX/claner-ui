
import style from './CustomButton.module.scss'

function CustomButton({text, border, ...props}) {
  return (
    <button className={`${style.btn} ${border ? style.bordered : null}`} {...props}>{text}</button>
  )
}

export default CustomButton
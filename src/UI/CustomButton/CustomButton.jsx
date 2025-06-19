
import style from './CustomButton.module.scss'

function CustomButton({loading, text, border, ...props}) {
  return (
    <button className={`${style.btn} ${border ? style.bordered : null} ${loading ? style.disabled : ''}`} {...props} >
      {loading ? <div className={style.loader}></div> : text}
      
    </button>
  )
}

export default CustomButton

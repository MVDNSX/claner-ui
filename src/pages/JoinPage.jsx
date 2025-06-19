import React from 'react'
import EntryForm from '../Components/EntryForm/EntryForm'
import style from './pageStyle.module.scss'

function JoinPage() {
  return (
    <div className={style.layout}>
      <div className={style.cards_wrap}>
        <div className={style.card}>Форма вступления</div>
        <div className={style.card}>Мои заявки</div>
        <div className={style.card}>Правила клана</div>
        <div className={style.card}>Офицеры</div>
      </div>
    </div>
    

  )
}

export default JoinPage

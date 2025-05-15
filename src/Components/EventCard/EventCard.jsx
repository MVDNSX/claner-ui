import React from 'react'
import style from './EventCard.module.scss'
import sademan from '../../assets/sszzsad.jpg'

export default function EventCard({eventData}) {
  const eventStartDate = new Date(eventData.start_date).toLocaleString('ru-RU', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit'
  })
  return (
    <div className={style.card}>
          <div className={style.image}>
            <img src={sademan} alt="" />
          </div>
          <div className={style.label_wrap}>
            <div className={style.label}>{eventStartDate}</div>
            <div className={style.label}>Нет отметки</div>
          </div>
          <h3 className={style.heading}>{eventData.event_name}</h3>
          <div className={style.controls}>
            <button className={style.btn_skip}>Не участвую</button>
            <button className={style.btn_going}>Участвую</button>
          </div>
        </div>
  )
}

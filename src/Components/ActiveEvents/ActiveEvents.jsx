import style from './ActiveEvents.module.scss'
import useActiveEventStore from '../../store/useActiveEventStore'
import EventCard from '../EventCard/EventCard'

export default function ActiveEvents() {
  const activeEvents = useActiveEventStore((state) => state.activeEvents)

  return (
    <div className={style.active_events}>
        <div className={style.heading}>Предстоящие события</div>
        <div className={style.events_wrap}>
          {activeEvents.map((item, index) => {
           return <EventCard key={index} eventData={item}/>
          })}
        </div>
      </div>
  )
}

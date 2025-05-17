import style from './ActiveEvents.module.scss'
import useActiveEventStore from '../../store/useActiveEventStore'
import EventCard from '../EventCard/EventCard'

export default function ActiveEvents() {
  const activeEvents = useActiveEventStore((state) => state.activeEvents)

  return (
    <div className={style.active_events}>
        <h2 className={style.heading}>Предстоящие события</h2>
        <div className={style.events_wrap}>
          {activeEvents.map((item, index) => {
           return <EventCard key={index} eventData={item}/>
          })}
          {activeEvents.map((item, index) => {
           return <EventCard key={index} eventData={item}/>
          })}
        </div>
      </div>
  )
}

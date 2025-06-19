import style from './EventCard.module.scss'
import CustomButton from '../../UI/CustomButton/CustomButton'
import useAttendancesStore from '../../store/useAttendancesStore'
import useGlobalStore from '../../store/useGlobalStore'
import EventMore from '../EventMore/EventMore'
import {EVENT_START_DATE, BASE_URL, STATUS_STRING } from '../../config'
import useProfileMemberStore from '../../store/useProfileMemberStore'
import { useTelegram } from '../../hooks/useTelegram'

export default function EventCard({eventData}) {
const {start_date, banner_url, opponent, commentary, event_name, id} = eventData

const attendance_info = useAttendancesStore(state => state.getPartyByEventId(id))


const handleClickCard = () => {
  if(!attendance_info){
    alert('Вы не отметились на ивент')
    return 
  }
  if(attendance_info.status === false){
    alert('Вы отказались от участия')
    return
  }
  if(attendance_info.status === true && !attendance_info.party_id){
    alert('Пати еще не назначена') 
    return
  }

  openModal(<EventMore eventName={event_name} opponent={opponent} partyId={attendance_info.party_id}/>)
}

const { tg } = useTelegram();
const openModal = useGlobalStore((state)=>state.openModal) 

const status_member_event = useAttendancesStore((state) => state.getCheckStatus(id))

const changeEventStatus = useAttendancesStore(state => state.changeMemberStatusEvent)

const onGoing = () => {
  if(status_member_event === true) return
  changeEventStatus({event_id: id, status: true}, tg)
}
const onSkip = () => {
  if(status_member_event === false) return
  changeEventStatus({event_id: id, status: false}, tg)
}

  return (
    <div className={style.card} onClick={handleClickCard}>
      <img src={`${BASE_URL}${banner_url}`} alt="" />
      <div className={style.label_wrap}>
        <div className={style.label}>{EVENT_START_DATE(start_date)}</div>
        <div className={style.label}>{STATUS_STRING[status_member_event]}</div>
      </div>
      <div className={style.title}>
        <h3 className={style.heading}>{opponent ? `${event_name}: vs ${opponent}` : `${event_name}`}</h3>
        <div>{commentary}</div>
      </div>

      <div className={style.controls} onClick={(e) =>{e.stopPropagation()}}>
        <CustomButton border text='Не участвую' onClick={onSkip}/>
        <CustomButton text='Участвую' onClick={onGoing}/>
      </div>
    </div>
  )
}

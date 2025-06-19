import React, { useEffect, useState } from 'react'
import CustomButton from '../../UI/CustomButton/CustomButton'
import style from './EventMore.module.scss'
import ListItem from '../ListItem/ListItem'
import usePartyStore from '../../store/usePartyStore'

export default function EventMore({eventName, opponent, partyId}) {

  
  const fetchPartyById = usePartyStore(state => state.fetchPartyById)
  const partyCache = usePartyStore(state => state.parties[partyId])
  const isLoading = usePartyStore(state => state.isLoading)

  const [party, setParty] = useState(partyCache)

  const handleCopyNickNames = () => {
    const nicknames = party.Members.map(member => member.nickname).join(',')
    navigator.clipboard.writeText(nicknames).then(() => {
      alert('Никнеймы скопированы в буфер обмена!')
    })
    .catch((err) => {
      console.error('Ошибка при копировании:', err)
    })    
  }

  useEffect(()=>{
    if(partyCache){
      setParty(partyCache)
      return
    }

    const loadParty = async () => {
      const loadedParty = await fetchPartyById(partyId)
      setParty(loadedParty)
    }

    loadParty()

  }, [partyId, fetchPartyById])
  
  return (
    isLoading || !party 
    ? <div className={`${style.event_info} ${style.centered}`}>
        <span className={style.loader}></span>
        <div>Загружаем состав пати...</div>
      </div> 
    : <div className={style.event_info}>
        <h3 className={style.heading}>{opponent ? `${eventName}: vs ${opponent}` : `${eventName}`}</h3>
        <div>Состав пати: <span className={party.Members.length < 10 ? style.count : style.max_count}>{party.Members.length}</span> / <span className={style.max_count}>10</span></div>
        <ul className={style.content}>
          {party.Members.map((member)=> <ListItem key={member.id} member={member} leader_id={party.leader_id} />)}
        </ul>
        <div className={style.control}>
          <CustomButton text={'Скопировать никнеймы'} onClick={handleCopyNickNames}/>
        </div>
      </div>
  )
}


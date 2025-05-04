import React from 'react'
import useProfileMemberStore from '../store/useProfileMemberStore'
import useReferencesStore from '../store/useReferencesStore'
import useActiveEventStore from '../store/useActiveEventStore'


function MemberPage() {
  const member = useProfileMemberStore((state) => state.member)
  const getClassName = useReferencesStore(state => state.getClassName)
  const memberClass = getClassName(member.class_id)

  const getClanRole = useReferencesStore(state => state.getClanRole)
  const memberRole = getClanRole(member.role_id)

  const activeEvents = useActiveEventStore((state) => state.activeEvents)
  console.log(activeEvents)
  const formatted = new Date(activeEvents[0].start_date).toLocaleString().split(', ')
  const date = formatted[0]
  const time = formatted[1]
  console.log(date)
  console.log(time)

  return (
    <>
      <div>MemberPage</div>

      <div>{member.nickname}</div>
      <div>{memberClass}</div>
      <div>{memberRole}</div> 
      <div>{`ПА: ${member.pa}`}</div>
      <div>{`ПЗ: ${member.pz}`}</div>
      <div>{`БД: ${member.fs}`}</div>

      <div className="card_event">
        <div>{activeEvents[0].event_name}</div>
        <div>{date}</div>
        <div>{time}</div>
      </div>
    </>
  )
}

export default MemberPage
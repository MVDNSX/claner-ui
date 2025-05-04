import React from 'react'
import style from './pageStyle.module.scss'
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
    <div className={style.layout}>
      <div className={style.member}>

        <div className={style.member_info}>
          <div className={style.member_image}>
            <img src="https://placehold.co/150x150/191C1C/191C1C" alt="" />
          </div>
          <div className={style.member_description}>
            <span className={style.member_icon}></span>
            <span className={style.member_nickname}>{member.nickname}</span>
          </div>
          <div className={style.member_role}>{memberRole} клана</div>
        </div>
        
        <div className={style.member_stats}>
          <div className={style.stat_block}>
            <div className={style.stat_value}>{member.pa}</div>
            <div className={style.stat_name}>Показатель атаки</div>
          </div>
          <div className={style.stat_block}>
            <div className={style.stat_value}>{member.pz}</div>
            <div className={style.stat_name}>Показатель защиты</div>
          </div>
          <div className={style.stat_block}>
            <div className={style.stat_value}>{member.fs}</div>
            <div className={style.stat_name}>Боевой дух</div>
          </div>
        </div>

        <div className={style.member_edit}></div>
      </div>
    </div>
  )
}

export default MemberPage
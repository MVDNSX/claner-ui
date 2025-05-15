import React from 'react'
import style from './pageStyle.module.scss'
import MemberProfile from '../Components/MemberProfile/MemberProfile'
import ActiveEvents from '../Components/ActiveEvents/ActiveEvents'


function MemberPage() {
  return (
    <div className={style.layout}>
      <MemberProfile/>
      <ActiveEvents/>
    </div>
  )
}

export default MemberPage
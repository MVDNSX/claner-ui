import React from 'react'
import style from './pageStyle.module.scss'
import MemberProfile from '../Components/MemberProfile/MemberProfile'
import ActiveEvents from '../Components/ActiveEvents/ActiveEvents'
import Modal from '../Components/Modal/Modal'


function MemberPage() {
  return (
    <div className={style.layout}>
      <MemberProfile/>
      <ActiveEvents/>
      <Modal/>
    </div>
  )
}

export default MemberPage
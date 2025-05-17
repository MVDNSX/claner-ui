import React from 'react'
import style from './MemberProfile.module.scss'
import useReferencesStore from '../../store/useReferencesStore'
import useProfileMemberStore from '../../store/useProfileMemberStore'
import ModalPortal from '../Modal/Modal'
import useGlobalStore from '../../store/useGlobalStore'
import { FaUserEdit } from "react-icons/fa";
import EditProfile from '../editProfileModal/EditProfileModal'
import CustomButton from '../../UI/CustomButton/CustomButton'

export default function MemberProfile() {

  const member = useProfileMemberStore((state) => state.member)
  const getClassName = useReferencesStore(state => state.getClassName)
  const memberClass = getClassName(member.class_id)

  const openModal = useGlobalStore((state)=>state.openModal)

  return (
    <div className={style.member}>

      <div className={style.main}>
        <div className={style.left}>
          <img className={style.avatar} src="https://placehold.co/300x300/10131A/10131A" alt="" />
        </div>
        <div className={style.right}>
          <div className={style.description}>
            <span className={style.nickname}>{member.nickname}</span>
            <img className={style.icon} src={`https://clanner-server.onrender.com${memberClass.icon_url}`} alt="" />  
          </div>

          <div className={style.parameters}>
            <div className={style.parameter}>
              <div className={style.title}>Показатель атаки</div>
              <div className={style.value}>{member.pa}</div>
            </div>
            <div className={style.parameter}>
              <div className={style.title}>Показатель защиты</div>
              <div className={style.value}>{member.pz}</div>
            </div>
            <div className={style.parameter}>
              <div className={style.title}>Боевой дух</div>
              <div className={style.value}>{member.fs}</div>
            </div>
          </div>
        </div>
      </div>

      <div className={style.controls}>
        <CustomButton onClick={openModal} text='Обновить'/>
      </div>
    </div>
  )
}




{/*<div className={style.member_info}>

              <div className={style.member_image}>
                <img src="https://placehold.co/150x150/191C1C/191C1C" alt="" />
              </div>

              <div className={style.member_description}>
                <div className={style.member_icon}>
                  <img src={`https://clanner-server.onrender.com${memberClass.icon_url}`} alt="" />
                </div>
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

            <button className={style.edit_btn} onClick={openModal}>
              <FaUserEdit size={'2em'} />
            </button>*/}
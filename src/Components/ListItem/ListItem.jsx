import useReferencesStore from '../../store/useReferenceStore'
import style from './ListItem.module.scss'
function ListItem({member, leader_id}) {
  const {nickname, class_id} = member
  const classIcon = useReferencesStore(state => state.getClassIcon(class_id))
  return (
    <li className={member.id === leader_id ? `${style.list_item} ${style.top}` : `${style.list_item}`}>
      <img className={style.icon} src={`https://clanner-server.onrender.com${classIcon}`} alt="" />
      <span className={style.nick}>{nickname}</span>
      {member.id === leader_id ? <img className={style.leader} src={`https://clanner-server.onrender.com/icons/leader.png`} alt="123" /> : null}
    </li>
  )
}

export default ListItem
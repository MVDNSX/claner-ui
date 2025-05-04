import { useEffect, useState } from 'react'
import './App.css'
import AppRouter from './router/AppRouter'
import useProfileMemberStore from './store/useProfileMemberStore'
import useReferencesStore from './store/useReferencesStore'
import useAttendancesStore from './store/useAttendancesStore'
import useActiveEventStore from './store/useActiveEventStore'



function App() {

  const env_url='https://clanner-server.onrender.com/api/member/authMember'

  const [route, setRoute] = useState(null)
  const setMember = useProfileMemberStore( (state) => state.setMember)
  const setRoles = useReferencesStore((state) => state.setRoles)
  const setClasses = useReferencesStore((state) => state.setClasses)
  const setActiveEvents = useActiveEventStore((state) => state.setActiveEvents)
  const setAttendances = useAttendancesStore((state) => state.setAttendances)

  useEffect(()=>{
    const fetchAuthUser = async () => {
      try {
        //const tg = window.Telegram?.WebApp;
        //const user_id = tg.initDataUnsafe.user.id
        const user_id = '5616481223'

        if(!user_id) throw new Error('Нет данных telegram')

        const response = await fetch(env_url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            telegram_id: user_id
          })
        })
        if(!response.ok) throw new Error('Ошибка запроса')
        
        const data = await response.json()
        setMember(data.member)
        setRoles(data.clanRoles)
        setClasses(data.gameClasses)
        setActiveEvents(data.activeEvents)
        setAttendances(data.attendances)

        if(data.status === 'not_found') setRoute('join');
        else if(data.status === 'ok' && data.member.role_id === 1) setRoute('member');
        else if(data.status === 'ok' && data.member.role_id === 2) setRoute('member');
        else throw new Error('Неизвестный ответ')
        
      } catch (error) {
        console.error('*** ошибка fetchAuthUser ***', error)
        setRoute('Error')
      }
    }

    fetchAuthUser()

  },[setMember, setRoles, setClasses, setActiveEvents, setAttendances])
  
  if(route === null) return <>Loading...</>

  return <AppRouter route={route}/>
}

export default App

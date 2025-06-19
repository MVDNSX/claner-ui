import './App.css'
import { useEffect, useState } from 'react'
import { useTelegram } from './hooks/useTelegram'
import { fetchInitialData } from './api/fetchInitialData'
import { ROUTES } from './config'
import Loader from './Components/Loader/Loader'
import AppRouter from './router/AppRouter'

import useProfileMemberStore from './store/useProfileMemberStore'
import useReferenceStore from './store/useReferenceStore'
import useActiveEventStore from './store/useActiveEventStore'
import useAttendancesStore from './store/useAttendancesStore'
import useAuthStore from './store/useAuthStore'

function App() {
  
  const [route, setRoute] = useState(null)
  const { tg, id: user_id, isTelegramAgent } = useTelegram();

  const setMember = useProfileMemberStore( (state) => state.setMember)
  const {setRoles, setClasses} = useReferenceStore((state) => state)
  const setActiveEvents = useActiveEventStore((state) => state.setActiveEvents)
  const setAttendances = useAttendancesStore((state) => state.setAttendances)
  const setToken = useAuthStore(state => state.setToken)

  useEffect(()=>{

    //if(!isTelegramAgent){
    //  window.location.href = "https://t.me/aura_clan_bot?startapp";
    //}
    const loadData = async () => {
      try {
        let user_id = '5616481223' // fallback для теста

        if(isTelegramAgent){
          tg.disableVerticalSwipes();
          tg.lockOrientation()
          //tg.requestFullscreen()
          tg.ready()
          user_id = tg.initDataUnsafe.user.id
        }
      

        const telegram_id = user_id;
        if (!telegram_id) throw new Error('Нет telegram ID');

        const data = await fetchInitialData(telegram_id)

        if(data.status === 'not_found'){
          setRoute(ROUTES.JOIN);
          return
        } 

        setMember(data?.member)
        setRoles(data?.roles)
        setClasses(data?.classes)
        setActiveEvents(data?.events)
        setAttendances(data?.attendances)
        setToken(data?.token)

        if(data.status === 'ok' && data.member.role_id === 1) setRoute(ROUTES.MEMBER);
        if(data.status === 'ok' && data.member.role_id === 2) setRoute(ROUTES.OFFICER);
        else throw new Error('Неизвестный ответ')
        
      } catch (error) {
        console.error('*** ошибка fetchInitialData ***', error)
        setRoute(ROUTES.ERROR)
      }
    }

    loadData()

  },[])
  
  if(route === null) return <Loader/>

  return <AppRouter route={route}/>
}

export default App
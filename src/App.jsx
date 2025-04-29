import { useEffect, useState } from 'react'
import './App.css'


function App() {

  const env_url='https://clanner-server.onrender.com/api/member/auth'

  const [route, setRoute] = useState(null)

  useEffect(()=>{
    const fetchAuthUser = async () => {
      try {
        const tg = window.Telegram?.WebApp;
        const user_id = tg.initDataUnsafe.user.id

        if(!user_id) throw new Error('Нет данных telegram')

        const response = await fetch(env_url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:{
            telegram_id: user_id
          }
        })
        if(!response) throw new Error('Ошибка запроса')
        
        const data = await response.json()
        if(data.status === 'not_found') setRoute('join');
        else if(data.status === 'ok' && data.role === 'Член') setRoute('member');
        else if(data.status === 'ok' && data.role === 'Офицер') setRoute('Officer');
        else throw new Error('Неизвестный ответ')
        
      } catch (error) {
        console.error('*** ошибка fetchAuthUser ***', error)
        setRoute('Error')
      }
    }

    fetchAuthUser()

    if(!route) return <>Loading...</>

    return <AppRouter route={route}/>
  },[])

  //const Telegram = window.Telegram.WebApp

  //const init = () => {
  //  console.log(Telegram)
  //  Telegram.lockOrientation();
  //  Telegram.disableVerticalSwipes()
  //  Telegram.MainButton.setParams({
  //    text: 'Отправить заявку',
  //    color: '#c0c0c0',
  //    text_color: '#212432',
  //    has_shine_effect: false,
  //    is_active: true,
  //    is_visible: true,
  //  }),

  //  Telegram.SecondaryButton.setParams({
  //    text: 'Сбросить',
  //    has_shine_effect: false,
  //    is_active: true,
  //    is_visible: true,
  //    color: '#c0c0c0',
  //    text_color: '#212432',
  //  }),
    
  //  Telegram.onEvent('viewportChanged', )
  //  Telegram.ready()
  //}


  //const [status, setStatus] = useState('loading')
  //const [user, setUser] = useState(null)
  useEffect(()=>{

    if(Telegram){
      init()
    }

    const fetchUserData = async () => {
      try {
        const telegram_id = (Telegram.initDataUnsafe.user.id).toString()
        console.log(telegram_id)
        const url = 'https://clanner-server.onrender.com/api/member/getProfileMember'

        if(!telegram_id){
          throw new Error('Не удалось получить данные пользователя телеграм')
        }

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            telegram_id
          })
        })

        if(!response.ok){
          throw new Error('Ошибка запроса на сервер')
        }

        const data = await response.json()
        console.log(data)

        if(data.member_role.role_name === 'Член'){
          setStatus(data.member_role.role_name)
        }
        else if(data.member_role.role_name === 'Офицер'){
          setStatus(data.member_role.role_name)
        }else{
          setStatus('not_found')
        }

      } catch (error) {
        console.error('Ошибка сервера', error)
        setStatus('error')
      }
    }

    fetchUserData()

  }, [])

  //useEffect(()=>{
  //  if(Telegram){
  //    init()
  //  }
  //},[])



  if(status === 'loading') return (<>Загрузка...</>)
  if(status === 'not_found') return (<EntryForm/>)
  if(status === 'Член') return (<>Член клана</>)
  if(status === 'Офицер') return (<>Офицер клана</>)
  if(status === 'error') return (<>Error</>)
}

export default App

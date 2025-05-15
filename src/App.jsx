import { useEffect, useRef, useState } from 'react'
import './App.css'
import AppRouter from './router/AppRouter'
import useProfileMemberStore from './store/useProfileMemberStore'
import useReferencesStore from './store/useReferencesStore'
import useAttendancesStore from './store/useAttendancesStore'
import useActiveEventStore from './store/useActiveEventStore'
import CustomButton from './UI/CustomButton/CustomButton'
import CustomInput from './UI/CustomInput/CustomInput'



//function App() {

//  const env_url='https://clanner-server.onrender.com/api/member/authMember'

//  const [route, setRoute] = useState(null)
//  const setMember = useProfileMemberStore( (state) => state.setMember)
//  const setRoles = useReferencesStore((state) => state.setRoles)
//  const setClasses = useReferencesStore((state) => state.setClasses)
//  const setActiveEvents = useActiveEventStore((state) => state.setActiveEvents)
//  const setAttendances = useAttendancesStore((state) => state.setAttendances)

//  useEffect(()=>{
//    const fetchAuthUser = async () => {
//      try {
//        const tg = window.Telegram?.WebApp;
//        console.log(tg)
        
//        tg.disableVerticalSwipes()
//        //tg.requestFullscreen()
//        //tg.lockOrientation()
//        //const user_id = tg.initDataUnsafe.user.id
//        const user_id = '5616481223'

//        if(!user_id) throw new Error('Нет данных telegram')

//        const response = await fetch(env_url, {
//          method: 'POST',
//          headers: {
//            'Content-Type': 'application/json'
//          },
//          body: JSON.stringify({
//            telegram_id: user_id
//          })
//        })
//        if(!response.ok) throw new Error('Ошибка запроса')
        
//        const data = await response.json()
//        setMember(data.member)
//        setRoles(data.clanRoles)
//        setClasses(data.gameClasses)
//        setActiveEvents(data.activeEvents)
//        setAttendances(data.attendances)

//        if(data.status === 'not_found') setRoute('join');
//        else if(data.status === 'ok' && data.member.role_id === 1) setRoute('join');
//        else if(data.status === 'ok' && data.member.role_id === 2) setRoute('member');
//        else throw new Error('Неизвестный ответ')
        
//      } catch (error) {
//        console.error('*** ошибка fetchAuthUser ***', error)
//        setRoute('Error')
//      }
//    }

//    fetchAuthUser()

//  },[setMember, setRoles, setClasses, setActiveEvents, setAttendances])
  
//  if(route === null) return <>Loading...</>

//  return <AppRouter route={route}/>
//}

import scrollIntoView from 'scroll-into-view-if-needed';
import { useSpring,config, animated } from '@react-spring/web'
import useGlobalStore from './store/useGlobalStore'
import { useDrag } from '@use-gesture/react'

function App() {
  const [vv, setVV] = useState(window.visualViewport?.height ?? 0);
  const currentInputRef = useRef();
  const scrollContainerRef = useRef()

  

  const isOpen = useGlobalStore(state => state.isModalOpen)
  const onClose = useGlobalStore(state => state.closeModal)
  const openModal = useGlobalStore(state => state.openModal)
  console.log(isOpen)
  const handleClose=(e)=>{
    e.stopPropagation()
    onClose()
  }

  const backdropStyle = useSpring({
    backdropFilter: isOpen ? 'blur(4px)' : 'blur(0px)',
    config: config.stiff,
  })

  const [modalStyle, api] = useSpring(
    () => ({
      height: isOpen ? 70 : 0,
      y:0,
      config: { tension: 210, friction: 26 }
    }),
    [isOpen]
  )
  const bind = useDrag(
    ({ movement: [, my], last, cancel }) => {
      if (my < 0) {
        // запретить тянуть вверх
        cancel()
        api.start({ y: 0 })
        return
      }

      if (last) {
        if (my > 150) {
          // закрыть если перетянули вниз более чем на 150px
          api.start({
            height: 0,
            y: 0,
            onRest: () => onClose(),
            
          })
        } else {
          // вернуть обратно
          api.start({ y: 0})
        }
      } else {
        // во время перетаскивания просто обновляем y (сдвиг вниз)
        api.start({ y: my})
      }
    },
    {
    axis: 'y', // ограничиваем только по оси Y
    bounds: { top: 0 }, // запрещаем тянуть вверх
  }
  )

  
  

  scrollIntoView(currentInputRef, {
    behavior: 'smooth',
    block: 'center',
    boundary: scrollContainerRef
  })

  const handleInputFocus = (e) => {
    currentInputRef.current = e.target;
      scrollIntoView(currentInputRef.current, {
      behavior: 'smooth',
      block: 'center',
      boundary: scrollContainerRef.current
    })
  };

    useEffect(()=>{
        const tg = window.Telegram?.WebApp;
        
        tg.disableVerticalSwipes()
    },[])

  useEffect(() => {
    const viewport = window.visualViewport;
    let prevHeight = viewport.height;

    const handleResize = () => {
      const currentHeight = viewport.height;
      const lifted = viewport.offsetTop > 0;
      const reduced = currentHeight < prevHeight;

      // Скроллим вверх, если клавиатура сдвинула экран
      if (lifted || reduced) {
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      }

      setVV(currentHeight);
      prevHeight = currentHeight;
      scrollIntoView(currentInputRef.current, {
        behavior: 'smooth',
        block: 'center',
        boundary: scrollContainerRef.current
      })
    };

    viewport.addEventListener('resize', handleResize);

    return () => {
      viewport.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="container">
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repudiandae aliquid at. Recusandae eos dicta ut illum quidem praesentium delectus fuga eum quos. Quaerat unde facere fuga vitae perspiciatis dolore?</p>
      <br />
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repudiandae aliquid at. Recusandae eos dicta ut illum quidem praesentium delectus fuga eum quos. Quaerat unde facere fuga vitae perspiciatis dolore?</p>
      <br />
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repudiandae aliquid at. Recusandae eos dicta ut illum quidem praesentium delectus fuga eum quos. Quaerat unde facere fuga vitae perspiciatis dolore?</p>
      <br />
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repudiandae aliquid at. Recusandae eos dicta ut illum quidem praesentium delectus fuga eum quos. Quaerat unde facere fuga vitae perspiciatis dolore?</p>
      <br />
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repudiandae aliquid at. Recusandae eos dicta ut illum quidem praesentium delectus fuga eum quos. Quaerat unde facere fuga vitae perspiciatis dolore?</p>
      <br />
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repudiandae aliquid at. Recusandae eos dicta ut illum quidem praesentium delectus fuga eum quos. Quaerat unde facere fuga vitae perspiciatis dolore?</p>
      <br />
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repudiandae aliquid at. Recusandae eos dicta ut illum quidem praesentium delectus fuga eum quos. Quaerat unde facere fuga vitae perspiciatis dolore?</p>
      <br />
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repudiandae aliquid at. Recusandae eos dicta ut illum quidem praesentium delectus fuga eum quos. Quaerat unde facere fuga vitae perspiciatis dolore?</p>
      <br />

      <animated.div className="wrapper" style={backdropStyle} onClick={openModal}>
          <animated.div className="modal" style={{ height: modalStyle.height.to(h => `${h}%`), transform: modalStyle.y.to(y => `translateY(${y}px)`) }} >
            <div className="line" {...bind()}>
              <span></span>
            </div>
            <div ref={scrollContainerRef} className="content">
              <CustomInput label="Ник:" onFocus={handleInputFocus} />
              <CustomInput label="Показатель атаки:" onFocus={handleInputFocus} />
              <CustomInput label="Показатель защиты:" onFocus={handleInputFocus} />
              <CustomInput label="Боевой дух:" onFocus={handleInputFocus} />
              <CustomInput label="Класс:" onFocus={handleInputFocus} />
              <CustomInput label="6" onFocus={handleInputFocus} />
              <CustomInput label="7" onFocus={handleInputFocus} />
              <CustomInput label="8" onFocus={handleInputFocus} />
            </div>
            <div className="controls">
              <CustomButton text="Отправить" onClick={handleClose} />
            </div>
          </animated.div>
    </animated.div>
    </div>
  );
}

export default App;

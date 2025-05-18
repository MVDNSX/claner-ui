import scrollIntoView from 'scroll-into-view-if-needed';
import { useSpring,config, animated, useTransition, useSpringRef, useChain } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import useGlobalStore from '../../store/useGlobalStore'
import style from './Modal.module.scss'
import { useEffect, useRef, useState } from 'react'
import CustomInput from '../../UI/CustomInput/CustomInput'
import CustomButton from '../../UI/CustomButton/CustomButton'

export default function Modal({ children }) {

  const [vv, setVV] = useState(window.visualViewport?.height ?? 0);
  const currentInputRef = useRef();
  const scrollContainerRef = useRef()

  const isOpen = useGlobalStore(state => state.isModalOpen)
  const onClose = useGlobalStore(state => state.closeModal)

  const backdropRef = useSpringRef()
  const transitions = useTransition(isOpen, {
    from: { opacity: 0, backdropFilter: 'blur(0px)' },
    enter: { opacity: 1, backdropFilter: 'blur(4px)' },
    leave: { opacity: 0, backdropFilter: 'blur(0px)' },
    config: { duration: 150 },
  })

  const modalRef = useSpringRef()
  const [modalStyle, api] = useSpring(
      () => ({
        ref: modalRef,
        height: isOpen ? 70 : 0,
        y:0,
        config: { tension: 210, friction: 26 }
      }),
      [isOpen]
    )
  
  useChain(isOpen ? [backdropRef, modalRef] : [modalRef, backdropRef], [0, 0.15])

  const handleClose=(e)=>{
    e.stopPropagation()
    onClose()
  }


  
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



  const handleInputFocus = (e) => {
    currentInputRef.current = e.target;
      scrollIntoView(currentInputRef.current, {
      behavior: 'smooth',
      block: 'center',
      boundary: scrollContainerRef.current
    })
  };

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

  return transitions((backdropStyle, opened) => (
    opened && <animated.div className={style.wrapper_modal} style={backdropStyle} onClick={onClose}>
      <animated.div className={style.modal} style={{ height: modalStyle.height.to(h => `${h}%`), transform: modalStyle.y.to(y => `translateY(${y}px)`) }} onClick={(e) => e.stopPropagation()}>
            <div className={style.line} {...bind()}>
              <span></span>
            </div>
            <div ref={scrollContainerRef} className={style.content}>
              <CustomInput label="Ник:" onFocus={handleInputFocus} />
              <CustomInput label="Показатель атаки:" onFocus={handleInputFocus} />
              <CustomInput label="Показатель защиты:" onFocus={handleInputFocus} />
              <CustomInput label="Боевой дух:" onFocus={handleInputFocus} />
              <CustomInput label="Класс:" onFocus={handleInputFocus} />
              <CustomInput label="6" onFocus={handleInputFocus} />
              <CustomInput label="7" onFocus={handleInputFocus} />
              <CustomInput label="8" onFocus={handleInputFocus} />
            </div>
            <div className={style.controls}>
              <CustomButton text="Отправить" onClick={handleClose} />
            </div>
          </animated.div>
    </animated.div>
  ))
}
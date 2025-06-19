import style from './Loader.module.scss'
import { useSpring, animated } from '@react-spring/web';


function Loader() {

  const animation = useSpring({
    from: { backgroundPosition: '200% 50%' },
    to: { backgroundPosition: '0% 50%' }, // смещаем дальше правее
    config: { duration: 2000 },
    loop: true, // бесконечный цикл
  });

  return (
    <div className={style.loader}>
      <animated.h1 className={style.title} style={animation}>Aura</animated.h1>
    </div>
  )
}

export default Loader
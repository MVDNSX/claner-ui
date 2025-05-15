import { CupertinoPane } from 'cupertino-pane'
import { Children, useEffect, useRef, useState } from 'react'
import useGlobalStore from '../../store/useGlobalStore'
import style from './ModalPortal.module.scss'


export default function ModalPortal({ children }) {
  const isOpen = useGlobalStore(state => state.isModalOpen);
  const onClose = useGlobalStore(state => state.closeModal);
  const paneRef = useRef(null)
  const paneInstance = useRef(null);

 const settings = {
  modal: {
    transition: 'zoom', // или 'fade', 'bounce'
  },
  backdrop: true,
  backdropOpacity: 0.1,
  backdropBlur: true,
  animationType: 'ease-in-out',
  showDraggable: false, // отключает перетаскивание
  buttonDestroy: false,
  fastSwipeClose: false,
  bottomClose: false,
  events: {
    onBackdropTap: () => onClose(),
    onDidDismiss: () => onClose(),
  },
};
    
    useEffect(()=>{
      if (paneRef.current && !paneInstance.current) {
        paneInstance.current = new CupertinoPane(paneRef.current, settings);
        
      }
      if(isOpen){
        paneInstance.current.present({animate: true})

        document.body.style.position = 'fixed'
        document.body.style.overflow = 'hidden'
      }else {
        paneInstance.current.destroy({ animate: true });
        document.body.style.position = ''
        document.body.style.overflow = ''


      }

      
    }, [isOpen])

  return (
    <div ref={paneRef} style={{ display: 'none' }}>
      <div className='modal'>
        <div className={`${style.handle} handle_line`}>
          <span className={style.line}></span>
        </div>
        <div className={style.content}>{children}</div>
      </div>
    </div>
  );
}
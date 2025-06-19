import React, { useEffect, useState } from 'react'

function AppTest() {
  
  
  useEffect(()=> {

    const isTelegram = !!window?.Telegram?.WebApp?.initData

    if(!isTelegram){
      window.location.href = "https://t.me/aura_clan_bot?startapp";
    }

  }, [])

  return (
    <div id='telegram-login-widget'>Запущенно через телеграм </div>
    
  )
}

export default AppTest
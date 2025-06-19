import useAuthStore from '../store/useAuthStore'

export const fetchApi = async (url, options = {}) => {
  const token = useAuthStore.getState().token

  try {
    const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })

  if(res.status === 401){
    const {clearToken, setSessionFailed} = useAuthStore.getState()
    console.warn('Время жизни токена истекло 401')
    clearToken()
    setSessionFailed(true)
    throw new Error('Unauthorized')
  }

  if(!res.ok){
    const errorText = await res.text()
    throw new Error(`Ошибка:  ${res.status} ${errorText}`)
  }

  return await res.json()
  } catch (error) {
    console.error('Ошибка при запросе', error)
    throw error
  }
  

}
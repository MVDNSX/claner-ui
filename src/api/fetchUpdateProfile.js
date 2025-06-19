import {UPDATE_PROFILE_URL} from '../config.js'
import useAuthStore from '../store/useAuthStore.js'

export const fetchUpdateProfile = async (memberData) => {
  const token = useAuthStore.getState().token

  const response = await fetch(UPDATE_PROFILE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({...memberData})

  })

  if (!response.ok) throw new Error('Ошибка запроса пати');

  return await response.json();
}
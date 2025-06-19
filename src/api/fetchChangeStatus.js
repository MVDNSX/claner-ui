import { UPDATE_STATUS_URL } from '../config';
import useAuthStore from '../store/useAuthStore'

export const fetchChangeStatus = async (data) => {
  const token = useAuthStore.getState().token

  const response = await fetch(UPDATE_STATUS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) throw new Error('Ошибка запроса');

  return await response.json();
};
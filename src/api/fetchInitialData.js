import { INIT_URL } from '../config';

export const fetchInitialData = async (userId) => {
  const response = await fetch(INIT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ telegram_id: userId })
  });

  if (!response.ok) throw new Error('Ошибка запроса');

  return await response.json();
};
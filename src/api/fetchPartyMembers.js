import { PARTY_URL } from '../config';
import useAuthStore from '../store/useAuthStore'

export const fetchPartyMembers = async (partyId) => {
  const token = useAuthStore.getState().token

  const response = await fetch(`${PARTY_URL}/${partyId}/members`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error('Ошибка запроса пати');

  return await response.json();
};
export const BASE_URL = 'https://clanner-server.onrender.com';
export const INIT_URL = 'https://clanner-server.onrender.com/api/init/auth';
export const UPDATE_STATUS_URL = 'https://clanner-server.onrender.com/api/attendance/updateStatus';
export const PARTY_URL = 'https://clanner-server.onrender.com/api/party';
export const UPDATE_PROFILE_URL = 'https://clanner-server.onrender.com/api/member/updateProfile';
export const ROUTES = {
    JOIN: 'join',
    MEMBER: 'member',
    OFFICER: 'officer',
    ERROR: 'error',
}

export const EVENT_START_DATE = (event_date) => {
    return new Date(event_date).toLocaleString('ru-RU', {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit'
      })
} 

  
export const STATUS_STRING = {
    true: 'Вы участвуете',
    false: 'Не участвуете',
    undefined: 'Нет отметки'
  };
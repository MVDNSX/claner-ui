import { create } from 'zustand';
import { useTelegram } from '../hooks/useTelegram';
import { fetchChangeStatus } from '../api/fetchChangeStatus'

const useAttendancesStore = create((set, get) => ({
  attendances: {},
  isLoading: false,

  setAttendance: (attendance) => {
    const {event_id} = attendance
    set((state) => ({
      attendances: {
        ...state.attendances,
        [event_id]: attendance
      }
    }))
  },
  setAttendances: (list) => {
    const mappedAttendance = {}
    list.map( (item) => mappedAttendance[item.event_id] = item)
    set({attendances: mappedAttendance})
  },

  getCheckStatus: (event_id) => {
    const attendances = get().attendances;
    const record = attendances[event_id]
    return record?.status;
  },

  getPartyByEventId: (event_id) => {
    const attendance = get().attendances[event_id];
    return attendance;
  },

  changeMemberStatusEvent: async (body, tg) => {
    
    set({isLoading: true})
    try {
      const data = await fetchChangeStatus(body)
      get().setAttendance(data.attendances)
      //tg.showAlert('Статус обновлён!');
    } catch (error) {
      console.error('Ошибка changeMemberStatusEvent!', error)
      //tg.showAlert('Ошибка: ' + error.message);
    } finally{
      set({isLoading:false})
    }
  }
}))

export default useAttendancesStore
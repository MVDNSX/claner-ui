import { create } from 'zustand';

const useAttendancesStore = create((set) => ({
  attendances: null,
  setAttendances: (attendances) => set({attendances})
}))

export default useAttendancesStore
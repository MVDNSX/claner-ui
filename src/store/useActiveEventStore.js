import { create } from 'zustand';

const useActiveEventStore = create((set) => ({
  activeEvents: null,
  setActiveEvents: (activeEvents) => set({activeEvents})
}))

export default useActiveEventStore
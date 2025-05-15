import { create } from 'zustand';

const useGlobalStore = create((set) => ({
  isModalOpen: false,
  openModal: () => set({isModalOpen:true}),
  closeModal: () => set({isModalOpen:false})
  
}))

export default useGlobalStore
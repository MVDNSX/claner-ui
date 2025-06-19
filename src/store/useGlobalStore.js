import { create } from 'zustand';

const useGlobalStore = create((set) => ({
  isModalOpen: false,
  modalContent: null, // сюда передаем React-компонент (элемент)
  openModal: (content) => set({ isModalOpen: true, modalContent: content }),
  closeModal: () => set({ isModalOpen: false, modalContent: null }),
}))

export default useGlobalStore
import {create} from 'zustand'
import { fetchUpdateProfile } from '../api/fetchUpdateProfile'
import usePartyStore from './usePartyStore'


const useProfileMemberStore = create( (set) => ({
  member: null,
  isLoading: false,
  setMember: (member) => set({member}),

  UpdateProfile: async (memberData) => {
    set({isLoading: true})
    try {
      const data = await fetchUpdateProfile(memberData)
      set({member:data.updatedMember})
      usePartyStore.getState().clearParties()
      window.Telegram?.WebApp?.showAlert('Данные обновлены!')
    } catch (error) {
      console.error('Ошибка fetchUpdateProfile!', error)
    } finally {
      set({isLoading: false})
    }
  }
}))

export default useProfileMemberStore
import {create} from 'zustand'

const useProfileMemberStore = create( (set) => ({
  member: null,
  setMember: (member) => set({member}),
  clearMember: () => set({member: null})
}))

export default useProfileMemberStore
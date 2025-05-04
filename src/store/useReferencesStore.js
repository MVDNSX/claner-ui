import {create} from 'zustand'

const useReferencesStore = create((set, get) => ({
  roles: null,
  classes: null,
  setRoles: (roles) => set({roles}),
  setClasses: (classes) => set({classes}),
  getClanRole: (id) => {
   const roles = get().roles
   return roles.find((r) => r.id === id).role_name || 'Роль не найдена'
  },
  getClassName: (id) => {
    const classes = get().classes
    return classes.find((c) => c.id === id).class_name || 'Класс не найден'
  }
}))

export default useReferencesStore
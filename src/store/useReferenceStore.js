import {create} from 'zustand'

const useReferencesStore = create((set, get) => ({
  roles: null,
  classes: null,
  setRoles: (roles) => set({roles}),
  setClasses: (classes) => set({classes}),
  getClassIcon: (class_id) => {
    const classes = get().classes;
    return classes.find((cl) => cl.id === class_id).icon_url
  }
}))

export default useReferencesStore
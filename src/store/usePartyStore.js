import {create} from 'zustand'
import { fetchPartyMembers } from '../api/fetchPartyMembers'

const usePartyStore = create((set, get)=>({
  parties: {},
  isLoading: false,

  setParty: (party) => {
    set(state => ({
      parties: {
        ...state.parties,
        [party.id]: party
      }
    }))
  },

  getPartyById: (party_id) => {
    return get().parties[party_id] || null
  },

  clearParties: () => set({ parties: {} }),

  fetchPartyById: async (party_id) => {
      const partyCache = get().parties[party_id]
      if(partyCache) return partyCache

      set({ loading: true});
      try {
        const data = await fetchPartyMembers(party_id)
        if(data?.party){
          get().setParty(data.party)
          return data.party
        } else {
        throw new Error('Неверный формат данных');
        }
        
      } catch (error) {
        console.error('Ошибка загрузки пати:', error);
        return null;
      } finally {
        set({ loading: false });
      }
  }

}))

export default usePartyStore
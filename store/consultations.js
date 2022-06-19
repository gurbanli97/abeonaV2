export const state = () => ({
    allConsultations: []
})



export const getters = {
    consultations: s => s.allConsultations,
}

export const mutations = {
   SET_CONSULTATIONS(state,items){
        state.allConsultations = items
    },
}
  
export const actions = {
    async fetchConsultations({commit}) {
        let response = await this.$axios.get('/api/v1/consultations')
        let items = response.data.data
        commit('SET_CONSULTATIONS',items);
        
      }      
}
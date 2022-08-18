export const state = () => ({
  allConsultations: [],
})

export const getters = {
  consultations: (s) => s.allConsultations,
}

export const mutations = {
  SET_CONSULTATIONS(state, { consultations }) {
    state.allConsultations = consultations.data
  },
}

export const actions = {
  async fetchConsultations({ commit }) {
    const { data: consultations } = await this.$axios.get('/api/v2/consultations')
    commit('SET_CONSULTATIONS', { consultations })
  },
}

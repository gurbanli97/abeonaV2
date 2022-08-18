export const state = () => ({
  allClients: [],
})

export const getters = {
  clients: (s) => s.allClients,
}

export const mutations = {
  SET_CLIENTS(state, { clients }) {
    state.allClients = clients
  },
}

export const actions = {
  async fetchClients({ commit }) {
    const { data: clients } = await this.$axios.get('/api/v1/clients')
    commit('SET_CLIENTS', { clients })
  },
}

export const state = () => ({
    allCustomers: []
})



export const getters = {
    customers: s => s.allCustomers,
}

export const mutations = {
   SET_CUSTOMERS(state,items){
        state.allCustomers = items
    },
}
  
export const actions = {
    async fetchCustomers({commit}) {
        let response = await this.$axios.get('/api/v1/customers')
        let items = response.data.data
        commit('SET_CUSTOMERS',items);
        
      },
}
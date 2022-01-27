export const state = () => ({
    allOrders: []
})



export const getters = {
    orders: s => s.allOrders,
}

export const mutations = {
   SET_ORDERS(state,items){
        state.allOrders = items
    },
}
  
export const actions = {
    async fetchOrders({commit}) {
        let response = await this.$axios.get('/api/v1/orders')
        let items = response.data.data
        commit('SET_ORDERS',items);
      },

      
    
}
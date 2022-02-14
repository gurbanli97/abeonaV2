export const state = () => ({
    allNotifications: []
})



export const getters = {
    notifications: s => s.allNotifications,
}

export const mutations = {
   SET_NOTIFICATIONS(state,items){
        state.allNotifications = items
    },
}
  
export const actions = {
    async fetchOrders({commit}) {
        let response = await this.$axios.get('/api/v1/orders')  
        let items = response.data.data
        commit('SET_ORDERS',items);
      },

      
    
}
export const state = () => ({
    sidebarIsActive: true
})



export const getters = {
     getItemById: ({items}) => (id) => {
         return items.find(item => item.id == id)
     },

}

export const mutations = {
    TOGGLE_SIDEBAR(state){
        state.sidebarIsActive = !state.sidebarIsActive
    }
}
  
export const actions = {
    
}
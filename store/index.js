export const state = () => ({
    sidebarIsActive: true,
})



export const getters = {
     sidebarIsActive: s => s.sidebarIsActive,

}

export const mutations = {
    TOGGLE_SIDEBAR(state){
        state.sidebarIsActive = !state.sidebarIsActive
    }
}
  
export const actions = {
    
}
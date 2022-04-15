export const state = () => ({
    sidebarIsActive: true,
    filtersActive: false,
    token: ''
})



export const getters = {
     sidebarIsActive: s => s.sidebarIsActive,
     filtersActive: s => s.filtersActive,
     token: s => s.token,
}

export const mutations = {
    TOGGLE_SIDEBAR(state){
        state.sidebarIsActive = !state.sidebarIsActive
    },
    TOGGLE_FILTERS(state){
        state.filtersActive = !state.filtersActive
    },
    SET_TOKEN(state,token){
        state.token = token
    }
}
  
export const actions = {
    
}
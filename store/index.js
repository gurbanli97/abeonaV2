export const state = () => ({
    sidebarIsActive: true,
    filtersActive: false
})



export const getters = {
     sidebarIsActive: s => s.sidebarIsActive,
     filtersActive: s => s.filtersActive,
}

export const mutations = {
    TOGGLE_SIDEBAR(state){
        state.sidebarIsActive = !state.sidebarIsActive
    },
    TOGGLE_FILTERS(state){
        state.filtersActive = !state.filtersActive
    }
}
  
export const actions = {
    
}
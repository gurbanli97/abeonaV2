export const state = () => ({
    allOrders: [],
    orderById: {},
    travelToOptions: [],
    visaTypeOptions: [],
    paymentStatusOptions: [],
    orderStatusOptions: [],
    visaStatusOptions: [],
    orderPriorityOptions: [],
    orderTypeOptions: [],
    orderSourceOptions: [],
    customerOptions: [],
    orderIdOptions: [],
    allCountries: [],
    visa_details: {},
    order_tasks: []
})

export const getters = {
    orders: s => s.allOrders,
    orderById: s => s.orderById,
    country_fullname: state => (alpha) =>{
        let country = state.allCountries.find(c => c.key === alpha)
        return country.value
    },
    travelToOptions: s => s.travelToOptions.map(obj => ({ id: obj.code, label: obj.county_name })),
    visaTypeOptions: s => s.visaTypeOptions.map(obj => ({ id: obj.visa_type, label: obj.visa_type })),
    paymentStatusOptions: s => s.paymentStatusOptions.map(obj => ({ id: obj.status_key, label: obj.status_value})),
    orderStatusOptions: s => s.orderStatusOptions.map(obj => ({ id: obj.status_key, label: obj.status_value })),
    visaStatusOptions: s => s.visaStatusOptions.map(obj => ({ id: obj.status_key, label: obj.status_value })),
    orderPriorityOptions: s => s.orderPriorityOptions.map(obj => ({ id: obj.priority_key, label: obj.priority_value })),
    orderTypeOptions: s => s.orderTypeOptions.map(obj => ({ id: obj.type_key, label: obj.type_value })),
    orderSourceOptions: s => s.orderSourceOptions.map(obj => ({ id: obj.source, label: obj.source })),
    customerOptions: s => s.customerOptions.map(obj => ({ id: obj.customer_id, label: obj.full_name })),
    orderIdOptions: s => s.orderIdOptions.map(obj => ({ id: obj.id, label: obj.id })),
    visa_details: s => s.visa_details,
    order_tasks: s => s.order_tasks
}

export const mutations = {
   SET_ORDERS(state,items){
        state.allOrders = items
   },
   SET_ORDER_BY_ID(state,item){
        state.orderById = item
   },
   SET_TRAVEL_TO_OPTIONS(state,items){
       state.travelToOptions = items
   },
   SET_VISA_TYPE_OPTIONS(state,items){
    state.visaTypeOptions = items
    },
    SET_PAYMENT_STATUS_OPTIONS(state,items){
        state.paymentStatusOptions = items
    },
    SET_ORDER_STATUS_OPTIONS(state,items){
        state.orderStatusOptions = items
    },
    SET_VISA_STATUS_OPTIONS(state,items){
        state.visaStatusOptions = items
    },
    SET_ORDER_PRIORITY_OPTIONS(state,items){
        state.orderPriorityOptions = items
    },
    SET_ORDER_TYPE_OPTIONS(state,items){
        state.orderTypeOptions = items
    },
    SET_ORDER_SOURCE_OPTIONS(state,items){
        state.orderSourceOptions = items
    },
    SET_CUSTOMER_OPTIONS(state,items){
        state.customerOptions = items
    },
    SET_ORDER_ID_OPTIONS(state,items){
        state.orderIdOptions = items
    },
    SET_COUNTRIES(state,items){
        state.allCountries = items
    },
    SET_VISA_DETAILS(state,items){
        state.visa_details = items
    },
    SET_ORDER_TASKS(state,items){
        state.order_tasks = items
    }
}
  
export const actions = {
    async fetchOrders({commit},filters = {}) {
        const url = this.$applyQueryToUrl("/api/v1.2/orders", filters);
        let response = await this.$axios.get(url)
        let items = response.data.data
        commit('SET_ORDERS',items);
    },
    async fetchOrderById({commit,dispatch},id) {
        let response = await this.$axios.get(`/api/v1/orders/${id}`)
        let item = response.data.data
        if(item.visa){
            await dispatch('fetchVisaDetails',item.visa)
        }
        commit('SET_ORDER_BY_ID',item)
    },   
    async fetchTravelToOptions({commit}) {
        let response = await this.$axios.get('/api/v1/orders/search?travel_to=all')
        let items = response.data.data
        commit('SET_TRAVEL_TO_OPTIONS',items);
    },   
    async fetchVisaTypeOptions({commit}) {
        let response = await this.$axios.get('/api/v1/orders/search?visa_type=all')
        let items = response.data.data
        commit('SET_VISA_TYPE_OPTIONS',items);
    },   
    async fetchPaymentStatusOptions({commit}) {
        let response = await this.$axios.get('/api/v1/orders/search?payment_status=all')
        let items = response.data.data
        commit('SET_PAYMENT_STATUS_OPTIONS',items);
    },
    async fetchOrderStatusOptions({commit}) {
        let response = await this.$axios.get('/api/v1/orders/search?order_status=all')
        let items = response.data.data
        commit('SET_ORDER_STATUS_OPTIONS',items);
    },   
    async fetchVisaStatusOptions({commit}) {
        let response = await this.$axios.get('/api/v1/orders/search?visa_status=all')
        let items = response.data.data
        commit('SET_VISA_STATUS_OPTIONS',items);
    }, 
    async fetchOrderPriorityOptions({commit}) {
        let response = await this.$axios.get('/api/v1/orders/search?order_priority=all')
        let items = response.data.data
        commit('SET_ORDER_PRIORITY_OPTIONS',items);
    }, 
    async fetchOrderTypeOptions({commit}) {
        let response = await this.$axios.get('/api/v1/orders/search?order_type=all')
        let items = response.data.data
        commit('SET_ORDER_TYPE_OPTIONS',items);
    }, 
    async fetchOrderSourceOptions({commit}) {
        let response = await this.$axios.get('/api/v1/orders/search?order_source=all')
        let items = response.data.data
        commit('SET_ORDER_SOURCE_OPTIONS',items);
    },
    async fetchCountries({commit}) {
        let response = await this.$axios.get('/api/v1/countries')
        let items = response.data.data
        commit('SET_COUNTRIES',items);
    },
    async fetchVisaDetails({commit},visa_id){
        let response = await this.$axios.get(`api/v1/customers/passports/visas/${visa_id}`)
        let items = response.data.data
        commit('SET_VISA_DETAILS',items);
    },
    async fetchOrderTasks({commit},order_id){
        let response = await this.$axios.get(`api/v1/tasks?order=${order_id}`)
        let items = response.data
        commit('SET_ORDER_TASKS',items);
    },

    async deleteTaskAttachment({commit},attachment_id){
        let response = await this.$axios.delete(`api/v1/attachments/${attachment_id}`)
        // let items = response.data
        // commit('SET_ORDER_TASKS',items);
    }
}
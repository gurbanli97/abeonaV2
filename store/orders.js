export const state = () => ({
    allOrders: [],
    pagination: {
        total: 0,
        limit: 10
    },
    orderGroupDetails: {},
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
    visa_details: [],
    trip_details: [],
    payment_details: [],
    passport_details: {},
    order_tasks: [],
})

export const getters = {
    orders: s => s.allOrders,
    orderGroupDetails: s => s.orderGroupDetails,
    pagination: s => s.pagination,
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
    trip_details: s => s.trip_details,
    passport_details: s => s.passport_details,
    payment_details: s => s.payment_details,
    order_tasks: s => s.order_tasks,
}

export const mutations = {
   SET_ORDERS(state,items){
        state.allOrders = items
   },
   SET_PAGINATION(state,total){
    state.pagination.total = total
   },
   SET_ORDER_BY_ID(state,item){
        state.orderById = item
   },
   SET_ORDER_GROUP_DETAILS(state,item){
    state.orderGroupDetails = item
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
    SET_ORDER_VISA_DETAILS(state,items){
        state.visa_details.push(items)
    },
    SET_ORDER_TRIP_DETAILS(state,items){
        state.trip_details = items
    },
    SET_ORDER_PASSPORT_DETAILS(state,item){
        state.passport_details = item
    },
    SET_ORDER_PAYMENT_DETAILS(state,items){
        state.payment_details = items
    },

    SET_ORDER_TASKS(state,items){
        state.order_tasks = items
    }
}
  
export const actions = {
    async fetchOrders({commit},filters = {}) {
        const url = this.$applyQueryToUrl("/api/v2/multiple-order", filters);
        let response = await this.$axios.get(url)
        let items = response.data.data
        commit('SET_ORDERS',items);
        commit('SET_PAGINATION',response.data.meta.total);
    },
    async fetchOrderById({commit,dispatch},id) {
        let response = await this.$axios.get(`/api/v2/order/${id}`)
        let item = response.data.data
        if(item.visa){
            await dispatch('fetchVisaDetails',item.visa)
        }
        commit('SET_ORDER_BY_ID',item)
    },
    async fetchOrderGroupDetails({commit},id){
          let response = await this.$axios.get(`/api/v2/order/${id}/order_group`)
          let item = response.data.data

          commit('SET_ORDER_GROUP_DETAILS',item)

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
    async fetchOrderVisaDetails({commit},order_id){
        let response = await this.$axios.get(`api/v2/order/${order_id}/visa`)
        let items = response.data.data
        commit('SET_ORDER_VISA_DETAILS',items);
    },
    async fetchOrderTripDetails({commit},order_id){
        let response = await this.$axios.get(`api/v2/order/${order_id}/trip`)
        let items = response.data.data
        commit('SET_ORDER_TRIP_DETAILS',items);
    },
    async fetchOrderPassportDetails({commit},order_id){
        let response = await this.$axios.get(`api/v2/order/${order_id}/passport`)
        let item = response.data.data
        commit('SET_ORDER_PASSPORT_DETAILS',item);
    },
    async fetchOrderPaymentDetails({commit},order_id){
        let response = await this.$axios.get(`api/v2/order/${order_id}/payments`)
        let items = response.data.data
        commit('SET_ORDER_PAYMENT_DETAILS',items);
    },
    async fetchOrderTasks({commit},order_id){
        let response = await this.$axios.get(`api/v2/order/${order_id}/tasks`)
        let items = response.data.data
        commit('SET_ORDER_TASKS',items);
    },

    async deleteTaskAttachment({commit},attachment_id){
        let response = await this.$axios.delete(`api/v1/attachments/${attachment_id}`)
        // let items = response.data
        // commit('SET_ORDER_TASKS',items);
    }
}
import { transformOptions } from '~/helpers/select_options'
export const state = () => ({
  allOrders: [],
  pagination: {
    total: 0,
    limit: 10,
  },
  orderGroupDetails: {},
  orderById: {},
  selectOptions: {
    travelTo: [],
    visaType: [],
    paymentStatus: [],
    orderStatus: [],
    orderType: [],
    orderSource: [],
    orderPriority: [],
    visaStatus: [],
    customers: [],
    orderId: [],
    taskStatus: [],
    users: [],
  },
  allCountries: [],
  visa_details: {},
  trip_details: [],
  payment_details: [],
  applicant_passports: [],
  order_tasks: [],
  order_task_by_id: {},
  user_list: [],
  document_list: [],
  task_comments: [],
  order_comments: [],
})

export const getters = {
  orders: (s) => s.allOrders,
  orderGroupDetails: (s) => s.orderGroupDetails,
  pagination: (s) => s.pagination,
  orderById: (s) => s.orderById,
  country_fullname: (state) => (alpha) => {
    let country = state.allCountries.find((c) => c.key === alpha)
    return country.value
  },
  travelToOptions: (s) => s.selectOptions.travelTo?.map(transformOptions),
  visaTypeOptions: (s) => s.selectOptions.visaType?.map(transformOptions),
  paymentStatusOptions: (s) => s.selectOptions.paymentStatus?.map(transformOptions),
  orderStatusOptions: (s) => s.selectOptions.orderStatus?.map(transformOptions),
  visaStatusOptions: (s) => s.selectOptions.visaStatus?.map(transformOptions),
  orderPriorityOptions: (s) => s.orderPriorityOptions?.map(transformOptions),
  orderTypeOptions: (s) => s.selectOptions.orderType?.map(transformOptions),
  orderSourceOptions: (s) => s.selectOptions.orderSource?.map(transformOptions),
  customerOptions: (s) => s.selectOptions.customers?.map(transformOptions),
  orderIdOptions: (s) => s.selectOptions.orderId?.map(transformOptions),
  visa_details: (s) => s.visa_details,
  trip_details: (s) => s.trip_details,
  applicant_passports: (s) => s.applicant_passports,
  payment_details: (s) => s.payment_details,
  order_tasks: (s) => s.order_tasks,
  task_comments: (s) => s.task_comments,
  order_comments: (s) => s.order_comments,
  user_list: (s) => s.user_list,
  document_list: (s) => s.document_list,
  documentListOptions: (s) => s.document_list?.map((obj) => ({ label: obj.name, value: obj.id })),
  taskStatusOptions: (s) => s.selectOptions.taskStatus?.map((obj) => ({ label: obj.value, value: obj.key })),
  userListOptions: (s) => s.selectOptions.users?.map((obj) => ({ label: obj.display_name, value: obj.id })),
  countryListOptions: (s) => s.allCountries?.map((obj) => ({ label: obj.value, value: obj.key })),
  order_task_by_id: (state) => (id) => {
    if (id) state.order_tasks.find((i) => i.id == id)
    else return
  },
  applicantVisaStatusOptions: (s) =>
    s.selectOptions.visaStatus.map((obj) => ({ label: obj.status_value, value: obj.status_key })),
}

export const mutations = {
  SET_ORDERS(state, { orders }) {
    state.allOrders = orders.data
  },
  SET_PAGINATION(state, { orders }) {
    state.pagination.total = orders.meta.total
  },
  SET_ORDER_BY_ID(state, { order }) {
    state.orderById = order.data
  },
  SET_ORDER_GROUP_DETAILS(state, { order_group }) {
    state.orderGroupDetails = order_group.data
  },
  SET_SELECT_OPTIONS(state, { key, options }) {
    state.selectOptions[key] = options.data
  },
  SET_CUSTOMER_OPTIONS(state, items) {
    state.customerOptions = items
  },
  SET_ORDER_ID_OPTIONS(state, items) {
    state.orderIdOptions = items
  },
  SET_COUNTRIES(state, { countries }) {
    state.allCountries = countries.data
  },
  SET_ORDER_VISA_DETAILS(state, { visa }) {
    state.visa_details = visa.data
  },
  SET_ORDER_TRIP_DETAILS(state, { trip }) {
    state.trip_details = trip.data
  },
  SET_APPLICANT_PASSPORTS(state, { passport }) {
    state.applicant_passports = passport.data
  },
  SET_ORDER_PAYMENT_DETAILS(state, { payment }) {
    state.payment_details = payment.data
  },

  SET_ORDER_TASKS(state, { tasks }) {
    state.order_tasks = tasks.data
  },
  SET_ORDER_TASK_BY_ID(state, { task }) {
    state.order_task_by_id = task.data
  },

  SET_TASK_COMMENTS(state, { taskComments }) {
    state.task_comments = taskComments.data
  },
  SET_ORDER_COMMENTS(state, { orderComments }) {
    state.order_comments = orderComments.data
  },
  SET_DOCUMENT_LIST(state, { documents }) {
    state.document_list = documents.data
  },
}

export const actions = {
  //////////////////Get actions
  async fetchOrders({ commit }, filters = {}) {
    const url = this.$applyQueryToUrl('/api/v2/multiple-order', filters)
    const { data: orders } = await this.$axios.get(url)
    commit('SET_ORDERS', { orders })
    commit('SET_PAGINATION', { orders })
  },
  async fetchOrderById({ commit, dispatch }, id) {
    const { data: order } = await this.$axios.get(`/api/v2/order/${id}`)
    if (order.data.applicant_visa) {
      await dispatch('fetchOrderVisaDetails', order.data.applicant_visa)
    }
    await dispatch('fetchApplicantPassports', order.data.applicant.id)
    commit('SET_ORDER_BY_ID', { order })
  },
  async fetchOrderGroupDetails({ commit }, id) {
    const { data: order_group } = await this.$axios.get(`/api/v2/order/${id}/order_group`)
    commit('SET_ORDER_GROUP_DETAILS', { order_group })
  },

  async fetchTravelToOptions({ commit }) {
    const { data: options } = await this.$axios.get('/api/v1/orders/search?travel_to=all')
    commit('SET_SELECT_OPTIONS', { key: 'travelTo', options })
  },

  async fetchVisaTypeOptions({ commit }) {
    const { data: options } = await this.$axios.get('/api/v1/orders/search?visa_type=all')
    commit('SET_SELECT_OPTIONS', { key: 'visaType', options })
  },

  async fetchPaymentStatusOptions({ commit }) {
    const { data: options } = await this.$axios.get('/api/v1/orders/search?payment_status=all')
    commit('SET_SELECT_OPTIONS', { key: 'paymentStatus', options })
  },

  async fetchOrderStatusOptions({ commit }) {
    const { data: options } = await this.$axios.get('/api/v2/order-statuses')
    commit('SET_SELECT_OPTIONS', { key: 'orderStatus', options })
  },

  async fetchVisaStatusOptions({ commit }) {
    const { data: options } = await this.$axios.get('/api/v1/orders/search?visa_status=all')
    commit('SET_SELECT_OPTIONS', { key: 'visaStatus', options })
  },

  async fetchOrderPriorityOptions({ commit }) {
    const { data: options } = await this.$axios.get('/api/v1/orders/search?order_priority=all')
    commit('SET_SELECT_OPTIONS', { key: 'orderPriority', options })
  },

  async fetchOrderTypeOptions({ commit }) {
    const { data: options } = await this.$axios.get('/api/v1/orders/search?order_type=all')
    commit('SET_SELECT_OPTIONS', { key: 'orderType', options })
  },

  async fetchOrderSourceOptions({ commit }) {
    const { data: options } = await this.$axios.get('/api/v1/orders/search?order_source=all')
    commit('SET_SELECT_OPTIONS', { key: 'orderSource', options })
  },

  async fetchCountries({ commit }) {
    const { data: countries } = await this.$axios.get('/api/v1/countries')
    commit('SET_COUNTRIES', { countries })
  },

  async fetchOrderVisaDetails({ commit }, order_id) {
    const { data: visa } = await this.$axios.get(`api/v2/order/${order_id}/visa`)
    commit('SET_ORDER_VISA_DETAILS', { visa })
  },

  async fetchOrderTripDetails({ commit }, order_id) {
    const { data: trip } = await this.$axios.get(`api/v2/order/${order_id}/trip`)
    commit('SET_ORDER_TRIP_DETAILS', { trip })
  },

  async fetchApplicantPassports({ commit }, applicant_id) {
    const { data: passport } = await this.$axios.get(`api/v2/applicants/${applicant_id}/passports`)
    commit('SET_APPLICANT_PASSPORTS', { passport })
  },

  async fetchOrderPaymentDetails({ commit }, order_id) {
    const { data: payment } = await this.$axios.get(`api/v2/order/${order_id}/payments`)
    commit('SET_ORDER_PAYMENT_DETAILS', { payment })
  },

  async fetchOrderTasks({ commit }, order_id) {
    const { data: tasks } = await this.$axios.get(`api/v2/order/${order_id}/tasks`)
    commit('SET_ORDER_TASKS', { tasks })
  },

  async fetchOrderTaskById({ commit }, task_id) {
    const { data: task } = await this.$axios.get(`api/v2/task/${task_id}`)
    commit('SET_ORDER_TASK_BY_ID', { task })
  },

  async fetchUserList({ commit, state }) {
    if (state.user_list.length) return
    const { data: options } = await this.$axios.get('/api/v2/user')
    commit('SET_SELECT_OPTIONS', { key: 'users', options })
  },

  async fetchTaskStatusList({ commit, state }) {
    if (state.selectOptions.taskStatus.length) return
    const { data: options } = await this.$axios.get('/api/v2/task/statusses')
    commit('SET_SELECT_OPTIONS', { key: 'taskStatus', options })
  },

  async fetchDocumentList({ commit }, order_id) {
    const { data: documents } = await this.$axios.get(`/api/v2/document?order_id=${order_id}`)
    commit('SET_DOCUMENT_LIST', { documents })
  },

  async fetchVisaStatusList({ commit, state }) {
    if (state.selectOptions.visaStatus.length) return
    const { data: options } = await this.$axios.get('/api/v2/applicants_visa/statuses')
    commit('SET_SELECT_OPTIONS', { key: 'visaStatus', options })
  },

  async fetchTaskComments({ commit }, task_id) {
    const { data: taskComments } = await this.$axios.get(`/api/v2/comments?task_id=${task_id}`)
    commit('SET_TASK_COMMENTS', { taskComments })
  },

  async fetchOrderComments({ commit }, order_id) {
    const { data: orderComments } = await this.$axios.get(`/api/v2/comments?order_id=${order_id}`)
    commit('SET_ORDER_COMMENTS', { orderComments })
  },

  //////////////////Post actions
  async createNewOrderTask(_, form) {
    try {
      let response = await this.$axios.post('/api/v2/task/', form)
      this.$toast.success(response.data.message)
    } catch (err) {
      this.$toast.error(err)
    }
  },

  async createNewTaskComment(_, form) {
    try {
      let response = await this.$axios.post('/api/v2/comments', form)
      this.$toast.success(response.data.message)
    } catch (err) {
      this.$toast.error(err)
    }
  },

  async createApplicantPassport({ dispatch }, form) {
    try {
      let response = await this.$axios.post('/api/v2/applicant-passport', form)
      this.$toast.success(response.data.message)
      await dispatch('fetchApplicantPassports', form.applicant_id)
    } catch (err) {
      this.$toast.error(err)
    }
  },

  //////////////////Update actions
  async updateOrderStatus(_, { status, order_id }) {
    try {
      let response = await this.$axios.patch(`/api/v2/order/${order_id}`, { status })
      this.$toast.success(response.data.message)
    } catch (err) {
      this.$toast.error(err)
    }
  },

  async updateExistingOrderTask(_, { task_id, form }) {
    try {
      let response = await this.$axios.patch(`/api/v2/task/${task_id}`, form)
      this.$toast.success(response.data.message)
    } catch (err) {
      this.$toast.error(err)
    }
  },

  async updateExistingVisaDetails(_, { visa_id, form }) {
    try {
      let response = await this.$axios.patch(`/api/v2/applicants_visa/${visa_id}`, form)
      this.$toast.success(response.data.message)
    } catch (err) {
      this.$toast.error(err)
    }
  },

  async updateExistingTripDetails(_, { trip_id, form }) {
    try {
      let response = await this.$axios.patch(`/api/v2/trip/${trip_id}`, form)
      this.$toast.success(response.data.message)
    } catch (err) {
      this.$toast.error(err)
    }
  },

  async updateDocumentStatus(_, { document_id, form }) {
    try {
      let response = await this.$axios.patch(`/api/v2/document/${document_id}`, form)
      this.$toast.success(response.data.message)
    } catch (err) {
      this.$toast.error(err)
    }
  },

  //////////////////Delete actions
  async deleteTaskAttachment(_, attachment_id) {
    await this.$axios.delete(`api/v2/attachment/${attachment_id}`)
  },

  async deleteTaskComment(_, comment_id) {
    try {
      await this.$axios.delete(`/api/v2/comments/${comment_id}`)
      this.$toast.success('Comment deleted succesfully')
    } catch (err) {
      this.$toast.error(err)
    }
  },

  async deleteVisaTripItem(_, trip_id) {
    try {
      await this.$axios.delete(`api/v2/trip/${trip_id}`)
      this.$toast.success('Trip item deleted succesfully')
    } catch (err) {
      this.$toast.error(err)
    }
  },
}

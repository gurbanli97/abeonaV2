<template>
  <div class="orders">
    <page-header :title="'Orders'" show-actions>
      <template #actions>
        <div class="order-group_switch">
          <span>Group</span>
          <label class="switch">
            <input v-model="showByGroup" type="checkbox" />
            <span class="slider round"></span>
          </label>
        </div>
        <button v-if="filtersActive" class="btn clear-filters" @click="clearFilters">
          <icon :name="'eraser-1'" />
          <span>Clear filters</span>
        </button>
        <button class="btn open-filters" @click="filtersActive = !filtersActive">
          <icon :name="!filtersActive ? 'filter-search' : 'close-circle'" />
          <span v-if="!filtersActive">Filters</span>
          <span v-else>Hide Filters</span>
        </button>
        <button class="btn btn-success excel-export" @click="$router.push('orders/add')">
          <Icon name="document-download" />
          Export as excel
        </button>
      </template>
    </page-header>
    <div class="container">
      <div class="orders-inner">
        <div class="table-wrap">
          <div class="table-responsive">
            <table class="table table-borderless">
              <thead>
                <tr v-if="filtersActive">
                  <th>
                    <client-only>
                      <treeselect
                        v-model="filters.client_id"
                        :multiple="true"
                        :clearable="true"
                        :searchable="true"
                        :limit="0"
                        :close-on-select="false"
                        :limit-text="(count) => `${count} items`"
                        :async="true"
                        :load-options="loadCustomerOptions"
                        placeholder="Client"
                        @input="handleSearch"
                      />
                    </client-only>
                  </th>
                  <th style="min-width: 150px">
                    <client-only>
                      <treeselect
                        v-model="filters.order_id"
                        :multiple="true"
                        :clearable="true"
                        :searchable="true"
                        :limit="0"
                        :close-on-select="false"
                        :limit-text="(count) => `${count} items`"
                        :async="true"
                        :load-options="loadOrderIdOptions"
                        placeholder="Order id"
                        @input="handleSearch"
                      />
                    </client-only>
                  </th>
                  <!-- <th>
                    <client-only>
                      <treeselect
                        v-model="filters.travel_to"
                        :multiple="true"
                        :clearable="true"
                        :searchable="true"
                        :limit="0"
                        :close-on-select="false"
                        :limit-text="(count) => `${count} items`"
                        :options="travelToOptions"
                        placeholder="Country"
                        @input="handleSearch"
                      />
                    </client-only>
                  </th> -->
                  <!-- <th>
                    <client-only>
                      <treeselect
                        v-model="filters.visa_type"
                        :multiple="true"
                        :clearable="true"
                        :searchable="true"
                        :limit="0"
                        :close-on-select="false"
                        :limit-text="(count) => `${count} items`"
                        :options="visaTypeOptions"
                        placeholder="Visa type"
                        @input="handleSearch"
                      />
                    </client-only>
                  </th> -->
                  <th>
                    <client-only>
                      <treeselect
                        v-model="filters.payment_status"
                        :multiple="true"
                        :clearable="true"
                        :searchable="true"
                        :limit="0"
                        :close-on-select="false"
                        :limit-text="(count) => `${count} items`"
                        :options="paymentStatusOptions"
                        placeholder="Payment status"
                        @input="handleSearch"
                      />
                    </client-only>
                  </th>
                  <th>
                    <client-only>
                      <treeselect
                        v-model="filters.status"
                        :multiple="true"
                        :clearable="true"
                        :searchable="true"
                        :limit="0"
                        :close-on-select="false"
                        :limit-text="(count) => `${count} items`"
                        :options="orderStatusOptions"
                        placeholder="Order status"
                        @input="handleSearch"
                      />
                    </client-only>
                  </th>
                  <!-- <th>
                    <client-only>
                      <treeselect
                        v-model="filters.visa_status"
                        :multiple="true"
                        :clearable="true"
                        :searchable="true"
                        :limit="0"
                        :close-on-select="false"
                        :limit-text="(count) => `${count} items`"
                        :options="visaStatusOptions"
                        placeholder="Visa status"
                        @input="handleSearch"
                      />
                    </client-only>
                  </th> -->
                  <th style="min-width: 240px">
                    <date-picker
                      v-model="order_dates"
                      value-type="format"
                      format="YYYY-MM-DD"
                      placeholder="Choose date"
                      range
                      @input="handleSearch"
                    />
                  </th>
                </tr>
                <tr v-else>
                  <th>Client</th>
                  <th>Order Id</th>
                  <th>Payment status</th>
                  <th>Order status</th>
                  <th>Order date</th>
                </tr>
              </thead>
              <tbody v-if="showByGroup">
                <tr v-for="order in orders" :key="order.id" @click="$router.push(`orders/group-order/${order.id}`)">
                  <td>
                    <ul>
                      <li>
                        <strong>{{ order.client.name || '---' }} {{ order.client.surname }}</strong>
                      </li>
                      <li>
                        <span>
                          Applicants:
                          <strong>{{ order.orders.length }}</strong>
                        </span>
                      </li>
                    </ul>
                  </td>
                  <td>
                    <strong>{{ order.id }}</strong>
                  </td>

                  <td class="payment-status_field">
                    <span>{{ $capitalizeString(order.payment_status) }}</span>
                  </td>
                  <td>
                    <span class="order-status_field">
                      <icon :name="iconType(order.status.status_value)" />
                      {{ order.status.status_value }}
                    </span>
                  </td>
                  <td>
                    <span>{{ $moment(order.order_date).format('DD.MM.YYYY - HH:mm') }}</span>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <template v-for="order in separatedOrders">
                  <tr v-for="item in order" :key="item.id" @click="$router.push(`/orders/${item.id}`)">
                    <td>
                      <strong>{{ item.client.name || '---' }} {{ item.client.surname }}</strong>
                    </td>
                    <td>
                      <strong>{{ item.id }}</strong>
                    </td>
                    <td class="payment-status_field">
                      <span>{{ $capitalizeString(item.payment_status) || '---' }}</span>
                    </td>
                    <td>
                      <span class="order-status_field">
                        <icon :name="iconType(item.status.value)" />
                        {{ item.status.value }}
                      </span>
                    </td>
                    <td>
                      <span>{{ $moment(item.order_date).format('DD.MM.YYYY - HH:mm') || '---' }}</span>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
        <div class="table_pagination">
          <client-only>
            <b-pagination
              v-model="currentPage"
              first-number
              last-number
              align="center"
              :total-rows="pagination.total"
              :per-page="pagination.limit"
            />
          </client-only>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Orders',
  async asyncData({ store }) {
    await Promise.all([
      store.dispatch('orders/fetchOrders', { limit: 10, page: 1 }),
      store.dispatch('orders/fetchTravelToOptions'),
      store.dispatch('orders/fetchVisaTypeOptions'),
      store.dispatch('orders/fetchPaymentStatusOptions'),
      store.dispatch('orders/fetchOrderStatusOptions'),
      store.dispatch('orders/fetchVisaStatusOptions'),
      store.dispatch('orders/fetchOrderPriorityOptions'),
      store.dispatch('orders/fetchOrderTypeOptions'),
      store.dispatch('orders/fetchOrderSourceOptions'),
    ])
  },
  data() {
    return {
      showByGroup: false,
      currentPage: 1,
      filtersActive: false,
      order_dates: [],
      filters: {
        date_from: null,
        date_to: null,
        travel_to: null,
        status: null,
        visa_type: null,
        visa_status: null,
        payment_status: null,
        client_id: null,
        order_id: null,
      },
    }
  },
  head: {
    title: 'Orders',
  },
  computed: {
    ...mapGetters({
      orders: 'orders/orders',
      travelToOptions: 'orders/travelToOptions',
      visaTypeOptions: 'orders/visaTypeOptions',
      paymentStatusOptions: 'orders/paymentStatusOptions',
      orderStatusOptions: 'orders/orderStatusOptions',
      visaStatusOptions: 'orders/visaStatusOptions',
      customerOptions: 'orders/customerOptions',
      orderPriorityOptions: 'orders/orderPriorityOptions',
      orderTypeOptions: 'orders/orderTypeOptions',
      orderSourceOptions: 'orders/orderSourceOptions',
      orderIdOptions: 'orders/orderIdOptions',
      pagination: 'orders/pagination',
    }),
    separatedOrders() {
      return this.orders.map((i) => i.orders)
    },
  },
  watch: {
    '$route.query'(query) {
      if (this.$route.path === '/orders') this.$store.dispatch('orders/fetchOrders', query)
    },
    currentPage() {
      this.$router.push({
        query: {
          page: this.currentPage,
          limit: this.pagination.limit,
          ...this.$mapObjectToQuery(this.filters),
        },
      })
    },
  },
  mounted() {
    this.$router.push({ query: null })
  },
  methods: {
    iconType(status) {
      switch (status) {
        case 'Completed':
          return 'tick-circle'
        case 'Pending':
          return 'clock'
        case 'Info Required':
          return 'tick-circle'
        case 'Cancelled':
          return 'close-circle-2'
        case 'Closed':
          return 'lock-bold'
        case 'On hold':
          return 'clock'
      }
    },
    // eslint-disable-next-line no-unused-vars
    loadCustomerOptions({ action, searchQuery, callback }) {
      this.$axios.get(`/api/v2/multiple-orders/search?client=${searchQuery}`).then((response) => {
        this.options = response.data.data
        const options = this.options.map((i) => ({
          id: `${i.client_id}`,
          label: `${i.full_name}`,
        }))
        callback(null, options)
      })
    },
    // eslint-disable-next-line no-unused-vars
    loadOrderIdOptions({ action, searchQuery, callback }) {
      this.$axios.get(`/api/v2/multiple-orders/search?order_group_id=${searchQuery}`).then((response) => {
        this.options = response.data.data
        const options = this.options.map((i) => ({
          id: `${i.id}`,
          label: `${i.id}`,
        }))
        callback(null, options)
      })
    },
    clearFilters() {
      for (const [key] of Object.entries(this.filters)) {
        this.$set(this.filters, key, null)
      }
      this.order_dates = []
      this.handleSearch()
    },
    handleSearch() {
      this.filters.date_from = this.order_dates[0]
      this.filters.date_to = this.order_dates[1]
      this.$nextTick(() => {
        this.$router.push({
          query: {
            // page: this.current_page,
            ...this.$mapObjectToQuery(this.filters),
          },
        })
      })
    },
  },
}
</script>

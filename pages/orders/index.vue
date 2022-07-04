<template>
  <div class="orders">
    <page-header :title="'Orders'" showActions>
      <div class="order-group_switch">
           <span>Group</span>
           <label class="switch">
            <input type="checkbox" v-model="showByGroup">
            <span class="slider round"></span>
          </label>
      </div>
      <button class="btn clear-filters" v-if="filtersActive" @click="clearFilters">
                  <icon :name="'eraser-1'"/>
                  <span>Clear filters</span>
      </button>
        <button class="btn open-filters" @click="filtersActive = !filtersActive">
                  <icon :name="!filtersActive ? 'filter-search' : 'close-circle'"/>
                  <span v-if="!filtersActive">Filters</span>
                  <span v-else>Hide Filters</span>
              </button>
      <button class="btn btn-success" @click="$router.push('orders/add')">Export as excel</button>
      
      
    </page-header>
    <div class="container">
      <div class="orders-inner">
        <div class="table-wrap">
          <div class="table-responsive">
            <table class="table table-borderless">
              <thead >
                <tr v-if="filtersActive">
                  <th>
                     <client-only>
                           <treeselect 
                          :multiple="true" 
                          :clearable="true"
                          :searchable="true"
                          :limit=0
                          :close-on-select="false"
                          :limit-text = "count => `${count} items`"
                          :async="true"
                          :load-options="loadCustomerOptions" 
                          placeholder="Customer"
                          v-model="filters.customer"
                          @input="handleSearch"
                          />
                       </client-only>
                  </th>
                   <th style="min-width: 150px">
                    <client-only>
                           <treeselect 
                          :multiple="true" 
                          :clearable="true"
                          :searchable="true"
                          :limit=0
                          :close-on-select="false"
                          :limit-text = "count => `${count} items`"
                          :async="true"
                          :load-options="loadOrderIdOptions" 
                          placeholder="Order id"
                          v-model="filters.order_id"
                          @input="handleSearch"
                          />
                       </client-only>
                  </th>
                    <th>
                       <client-only>
                           <treeselect 
                          :multiple="true" 
                          :clearable="true"
                          :searchable="true"
                          :limit=0
                          :close-on-select="false"
                          :limit-text = "count => `${count} items`"
                          :options="travelToOptions"
                          placeholder="Country"
                          v-model="filters.travel_to"
                          @input="handleSearch"
                          />
                       </client-only>
                  </th>
                    <th>
                      <client-only>
                           <treeselect 
                          :multiple="true" 
                          :clearable="true"
                          :searchable="true"
                          :limit=0
                          :close-on-select="false"
                          :limit-text = "count => `${count} items`"
                          :options="visaTypeOptions"
                          placeholder="Visa type"
                          v-model="filters.visa_type"
                          @input="handleSearch"
                          
                          />
                       </client-only>
                  </th>
                   <th>
                       <client-only>
                           <treeselect 
                          :multiple="true" 
                          :clearable="true"
                          :searchable="true"
                          :limit=0
                          :close-on-select="false"
                          :limit-text = "count => `${count} items`"
                          :options="paymentStatusOptions"
                          placeholder="Payment status"
                          v-model="filters.payment_status"
                          @input="handleSearch"
                          
                          />
                       </client-only>
                  </th>
                  <th>
                        <client-only>
                           <treeselect 
                          :multiple="true" 
                          :clearable="true"
                          :searchable="true"
                          :limit=0
                          :close-on-select="false"
                          :limit-text = "count => `${count} items`"
                          :options="orderStatusOptions"
                          placeholder="Order status"
                          v-model="filters.status"
                          @input="handleSearch"
                          
                          />
                       </client-only>
                  </th>
                   <th>
                       <client-only>
                           <treeselect 
                          :multiple="true" 
                          :clearable="true"
                          :searchable="true"
                          :limit=0
                          :close-on-select="false"
                          :limit-text = "count => `${count} items`"
                          :options="visaStatusOptions"
                          placeholder="Visa status"
                          v-model="filters.visa_status"
                          @input="handleSearch"
                          
                          />
                       </client-only>
                  </th>
                   <th style="min-width: 240px">
                        <date-picker
                          value-type="format" 
                          format="YYYY-MM-DD" 
                          placeholder="Choose date"
                          range
                          v-model="order_dates"
                          @input="handleSearch"
                          />
                  </th>
                </tr>
                <tr v-else>
                  <th>Customer</th>
                  <th>Order Id</th>
                  <th>Country</th>
                  <th>Visa type</th>
                  <th>Payment status</th>
                  <th>Order status</th>
                  <th>Visa status</th>
                  <th>Order date</th>
                  
                </tr>
              </thead>
              <tbody v-if="showByGroup">
                <tr v-for="order in groupOrders" :key="order.id" @click="$router.push(`orders/group-order/${order.id}`)">
                  <td>
                    <ul>
                      <li><strong>{{order.client.name}}{{order.client.surname}}</strong></li>
                      <li><span>Applicants:<strong>{{order.orders.length}}</strong></span></li>
                    </ul>
                  </td>
                  <td>
                    <strong>{{order.id}}</strong>
                  </td>
                   <td>
                    <!-- <span>{{order.trip.travel_to}}</span> -->
                  </td>
                   <td>
                    <!-- <strong>{{order.trip.visa_type}}</strong> -->
                  </td>
                   <td class="payment_status_field">
                    <!-- <span>{{order.payment_status}}</span> -->
                  </td>
                  <td>
                    <span class="order-status_field">
                      <!-- <icon 
                        :name="iconType(order.status)"
                      /> -->
                      <!-- {{order.status}} -->
                    </span>
                  </td>
                   <td>
                      <!-- <badge :category="'status'" :text="order.visa.status">
                          {{order.visa.status}}
                      </badge> -->
                  </td>
                    <td>
                    <span>{{$moment(order.order_date).format('DD.MM.YYYY - HH:mm')}}</span>
                  </td>
                </tr>
              </tbody>
               <tbody v-else>
                <tr v-for="order in orders" :key="order.id" @click="$router.push(`/orders/${order.id}`)">
                  <td>
                    
                      <strong>{{order.client.name}}{{order.client.surname}}</strong>
                  </td>
                  <td>
                    <strong>{{order.id}}</strong>
                  </td>
                   <td>
                    <!-- <span>{{order.trip.travel_to}}</span> -->
                  </td>
                   <td>
                    <!-- <strong>{{order.trip.visa_type}}</strong> -->
                  </td>
                   <td id="payment_status_field">
                    <!-- <span>{{order.payment_status}}</span> -->
                  </td>
                  <td>
                    <span class="order-status">
                      <!-- <icon 
                        :name="iconType(order.status)"
                      /> -->
                      <!-- {{order.status}} -->
                    </span>
                  </td>
                   <td>
                      <!-- <badge :category="'status'" :text="order.visa.status">
                          {{order.visa.status}}
                      </badge> -->
                  </td>
                    <td>
                    <span>{{$moment(order.order_date).format('DD.MM.YYYY - HH:mm')}}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
                <div class="table_pagination">
                   <client-only>
                    <b-pagination
                      first-number
                      last-number
                      align="center"
                      v-model="currentPage"
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
 
import DetailField from '../../components/elements/DetailField.vue'
import UserTable from '../../components/tables/UserTable.vue'
export default {
  components: { UserTable, DetailField},
  name: 'Orders',
  data(){
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
        customer: null,
        order_id: null,
      },
    }
  },
   watch: {
      "$route.query"(query) {
        if(this.$route.path === '/orders')
         this.$store.dispatch("orders/fetchOrders", query)
      },
      currentPage(){
        console.log('asdsad')
        this.$router.push({
            query: {
              page: this.currentPage,
              limit: this.pagination.limit,
              ...this.$mapObjectToQuery(this.filters)
            }
          });
      }
  },
  computed:{
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
      pagination: 'orders/pagination'
    }),
    groupOrders(){
      return this.orders.filter(i => i.is_multiple_order)
    },
    singleOrders(){
      return this.orders.filter(i => !i.is_multiple_order)
    }
  },
  methods: {
      iconType(status){
        switch(status){
          case 'Completed':
            return 'tick-circle'
          case 'Pending':
            return 'clock' 
          case 'Cancelled':
            return 'close-circle-2'  
          case 'Closed':
            return 'lock-bold'
           case 'On hold':
            return 'clock'      
        }
      },
      loadCustomerOptions({ action, searchQuery, callback }) {
          this.$axios.get(`/api/v1/orders/search?customer=${searchQuery}`).then(response => {
            this.options = response.data.data
            const options = this.options.map(i => ({
              id: `${i.customer_id}`,
              label: `${i.full_name}`,
            }))
           callback(null, options)
        })
      },
      loadOrderIdOptions({ action, searchQuery, callback }) {
          this.$axios.get(`/api/v1/orders/search?order_id=${searchQuery}`).then(response => {
            this.options = response.data.data
            const options = this.options.map(i => ({
              id: `${i.id}`,
              label: `${i.id}`,
            }))
           callback(null, options)
        })
      },
      clearFilters(){
        for(const [key,val] of Object.entries(this.filters)){
          this.$set(this.filters,key,null)
        }
         this.order_dates = []
         this.handleSearch()
      },
      handleSearch(){
        this.filters.date_from = this.order_dates[0]
        this.filters.date_to = this.order_dates[1]
        this.$nextTick(() => {
          this.$router.push({
            query: {
              // page: this.current_page,
              ...this.$mapObjectToQuery(this.filters)
            }
          });
        });
      },
  },
  mounted(){
    this.$router.push({query: null});
    console.log(this.groupOrders)
  },
 
  async asyncData({store}) {
    await Promise.all([
         store.dispatch("orders/fetchOrders"),
         store.dispatch("orders/fetchTravelToOptions"),
         store.dispatch("orders/fetchVisaTypeOptions"),
         store.dispatch("orders/fetchPaymentStatusOptions"),
         store.dispatch("orders/fetchOrderStatusOptions"),
         store.dispatch("orders/fetchVisaStatusOptions"),
         store.dispatch("orders/fetchOrderPriorityOptions"),
         store.dispatch("orders/fetchOrderTypeOptions"),
         store.dispatch("orders/fetchOrderSourceOptions"),
     ])
  },
}
</script>

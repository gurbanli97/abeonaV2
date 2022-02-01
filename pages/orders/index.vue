<template>
  <div class="orders">
      <page-header :title="'Orders'" :showActions="true"/>
    <div class="container">
      <data-table>
        <div class="data-table_row" v-for="order in orders" :key="order.id">
          <b-row>
            <b-col>
              <span>Customer</span>
              <strong>{{order.customer}}</strong>
            </b-col>
             <b-col>
              <span>Order ID</span>
              <strong>{{order.id}}</strong>
            </b-col>
             <b-col>
              <span>Travel to</span>
              <strong>{{order.travel_to}}</strong>
            </b-col>
             <b-col>
              <span>Visa Type</span>
              <strong>{{order.source}}</strong>
            </b-col>
             <b-col>
              <span>Order Type</span>
              <strong>{{order.source}}</strong>
            </b-col>
          </b-row >
            <b-row class="mt-3">
            <b-col>
              <span>Order date</span>
              <strong>{{order.customer}}</strong>
            </b-col>
             <b-col>
              <span>Source</span>
              <strong>{{order.id}}</strong>
            </b-col>
             <b-col>
              <span>Payment status</span>
              <strong>{{order.travel_to}}</strong>
            </b-col>
             <b-col>
              <span>Priority</span>
               <badge :category="'priority'" :text="'Online'"/>
            </b-col>
             <b-col>
              <span>Order status</span>
                <badge :category="'status'" :text="'Online'"/>
            </b-col>
          </b-row>
        </div>
          
      </data-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Orders',
  computed:{
    ...mapGetters({
      orders: 'orders/orders'
    })
  },

  async asyncData({store}) {
    await store.dispatch("orders/fetchOrders")
  },
}
</script>

<template>
   <div class="orders order_id">
      <page-header 
      :title="`${order.applicant.name} ${order.applicant.surname}`" 
      showBackButton
      showActions
      :showDetails="{
        country: country_fullname(order.details.destination),
        visa_type: order.details.visa_type
      }"
      >
      <div class="order-status_select">
      <span>Order status:</span>
        <client-only>
            <treeselect 
          :searchable="true"
          :close-on-select="true"
          :options="orderStatusOptions"
          v-model="orderStatus"
          />
        </client-only>
    </div>
    <button class="btn btn-success" @click="handleOrderStatusChange">Save</button>
    </page-header>
    <div class="container">
        <div class="order_id-inner">
          <order-details v-if="order.details.passport_no"/>
          <add-passport v-else/>
        </div>
    </div>
   </div>
</template>

<script>
import { mapGetters } from 'vuex' 
import OrderDetails from '../../components/orders/OrderDetails.vue'
import AddPassport from '../../components/orders/AddPassport.vue'
export default {
    name: 'ItemById',
    components: {AddPassport, OrderDetails},
    data(){
      return {
        orderStatus: ''
      }
    },
    computed:{
      ...mapGetters({
        order: 'orders/orderById',
        country_fullname: 'orders/country_fullname',
        orderStatusOptions: 'orders/orderStatusOptions',
      }),
     
    },
   methods: {
    async handleOrderStatusChange(){
      await this.$store.dispatch('orders/updateOrderStatus', {status: this.orderStatus,order_id: this.$route.params.id} )
    }
   },
   mounted(){
    this.orderStatus = this.order.status.key
   },
   async asyncData({params,store}) {
     await Promise.all([
        store.dispatch("orders/fetchOrderById",params.id),
        store.dispatch("orders/fetchCountries"),
        // store.dispatch("orders/fetchOrderVisaDetails",params.id),
        store.dispatch("orders/fetchOrderStatusOptions"),
        store.dispatch("orders/fetchOrderTripDetails",params.id),
        store.dispatch("orders/fetchOrderPassportDetails",params.id),
        store.dispatch("orders/fetchOrderPaymentDetails",params.id),
        store.dispatch('orders/fetchOrderTasks',params.id),
        store.dispatch('orders/fetchUserList'),
        store.dispatch('orders/fetchTaskStatusList'),
        store.dispatch('orders/fetchOrderComments',params.id),
        store.dispatch('orders/fetchDocumentList',params.id),
        store.dispatch('orders/fetchVisaStatusList')
     ])
  },
}
</script>

<style>

</style>
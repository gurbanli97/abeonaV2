<template>
   <div class="orders order_id">
      <page-header 
      :title="`${order.applicant.name} ${order.applicant.surname}`" 
      :showBackButton="true" 
      :showDetails="{
        country: country_fullname(order.details.destination),
        visa_type: order.details.visa_type
      }"
      >
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
      }
    },
    computed:{
      ...mapGetters({
        order: 'orders/orderById',
        country_fullname: 'orders/country_fullname',
      })
    },
   async asyncData({params,store}) {
     await Promise.all([
        store.dispatch("orders/fetchOrderById",params.id),
        store.dispatch("orders/fetchCountries"),
        store.dispatch("orders/fetchOrderVisaDetails",params.id),
        store.dispatch("orders/fetchOrderTripDetails",params.id),
        store.dispatch("orders/fetchOrderPassportDetails",params.id),
        store.dispatch("orders/fetchOrderPaymentDetails",params.id),
        store.dispatch('orders/fetchOrderTasks',params.id)
     ])
  },
}
</script>

<style>

</style>
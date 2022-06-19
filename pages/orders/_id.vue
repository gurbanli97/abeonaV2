<template>
   <div class="orders order_id">
      <page-header :title="`${order.details.customer_name} ${order.details.customer_surname}`" 
    :showBackButton="true" 
    :showDetails="{
      country: country_fullname(order.details.destination),
      visa_type: order.details.visa_type}"
    >
    </page-header>
    <div class="container">
        <div class="order_id-inner">
          <order-details v-if="!order.details.passport_no"/>
          <passport-details v-else/>
         
        </div>
    </div>
   </div>
</template>

<script>
import { mapGetters } from 'vuex' 
import OrderDetails from '../../components/orders/OrderDetails.vue'
import PassportDetails from '../../components/orders/PassportDetails.vue'
export default {
    name: 'ItemById',
    components: {PassportDetails, OrderDetails},
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
    methods: {
    },
   async asyncData({params,store}) {
     await Promise.all([
      store.dispatch("orders/fetchOrderById",params.id),
      store.dispatch("orders/fetchCountries")
     ])
  },
}
</script>

<style>

</style>
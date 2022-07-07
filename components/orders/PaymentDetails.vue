<template>
  <div class="payment-details">
    <div class="payment-details_inner">
      <user-table :fields="tableFields">
            <tbody>
              <tr v-for="payment in paymentDetails" :key="payment.id">
                <td>
                  <span>{{payment.id}}</span>
                </td>
                <td>
                  <span>{{order.id}} </span>
                </td>
                 <td>
                  <span>{{order.order_type}} </span>
                </td>
                 <td>
                  <strong>{{order.client.name}} {{order.client.surname}}</strong>
                </td>
                 <td>
                  <strong>{{payment.amount}}</strong>
                </td>
                 <td>
                  <strong>{{payment.amount}}</strong>
                </td>
                <td>
                  <strong>{{payment.payment_type}}</strong>
                </td>
                <td>
                    <badge :category="'status'" :text="$capitalizeString(payment.status)"/>
                </td>
              </tr>
            </tbody>
          </user-table>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex' 
import UserTable from '../tables/UserTable.vue'
export default {
  components: { UserTable },
  data(){
    return {
      tableFields: ['Invoice ID','Order ID','Order type','Customer','Invoice date','Amount','Payment type','Payment status']
    }
  },
  computed: {
    ...mapGetters({
      order: 'orders/orderById',
      paymentDetails: 'orders/payment_details'
    })
  },
}
</script>

<style>

</style>
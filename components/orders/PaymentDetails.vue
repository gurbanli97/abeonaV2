<template>
  <div class="payment-details">
    <div class="payment-details_inner">
      <button class="btn ml-auto add-invoice mt-2 mb-2">
        <icon name="plus-circle" />
        Add invoice
      </button>
      <DataTable :fields="tableFields">
        <tbody>
          <tr v-for="payment in paymentDetails" :key="payment.id">
            <td>
              <span>{{ payment.id }}</span>
            </td>
            <td>
              <span>{{ order.id }} </span>
            </td>
            <td>
              <span>{{ order.order_type }} </span>
            </td>
            <td>
              <strong>{{ order.client.name }} {{ order.client.surname }}</strong>
            </td>
            <td>
              <strong>{{ payment.amount }}</strong>
            </td>
            <td>
              <strong>{{ payment.amount }}</strong>
            </td>
            <td>
              <strong>{{ payment.payment_type }}</strong>
            </td>
            <td>
              <badge :category="'status'" :text="$capitalizeString(payment.status)" />
            </td>
          </tr>
        </tbody>
      </DataTable>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DataTable from '../tables/DataTable.vue'
export default {
  components: { DataTable },
  data() {
    return {
      tableFields: [
        'Invoice ID',
        'Order ID',
        'Order type',
        'Customer',
        'Invoice date',
        'Amount',
        'Payment type',
        'Payment status',
      ],
    }
  },
  computed: {
    ...mapGetters({
      order: 'orders/orderGroupDetails',
      paymentDetails: 'orders/payment_details',
    }),
  },
}
</script>

<style></style>

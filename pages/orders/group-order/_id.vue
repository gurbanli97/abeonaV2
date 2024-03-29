<template>
  <div class="orders group-order">
    <page-header show-back-button show-actions>
      <template #actions>
        <div class="order-status_select">
          <span>Order status:</span>
          <v-select />
        </div>
        <button class="btn btn-success">Save</button>
      </template>
    </page-header>
    <div class="container">
      <div class="group-order_inner">
        <b-tabs>
          <b-tab title="Order details">
            <div class="group-client_details">
              <h3>Client details</h3>
              <div class="row">
                <div class="col-12 d-flex justify-content-between flex-wrap">
                  <detail-field label="Name">
                    <strong>{{ orderDetails.client.name }}</strong>
                  </detail-field>
                  <detail-field label="Surname">
                    <strong>{{ orderDetails.client.surname }}</strong>
                  </detail-field>
                  <detail-field label="Phone">
                    <strong>{{ orderDetails.client.phone }}</strong>
                  </detail-field>
                  <detail-field label="Email">
                    <strong>{{ orderDetails.client.email }}</strong>
                  </detail-field>
                </div>
              </div>
            </div>
            <div class="group-applicant_details">
              <h3>Applicants</h3>
              <div class="table-wrap">
                <DataTable :fields="fields">
                  <tbody>
                    <tr
                      v-for="order in orderDetails.orders"
                      :key="order.id"
                      @click="$router.push(`/orders/${order.id}`)"
                    >
                      <td>
                        <strong>{{ order.applicant.name }} {{ order.applicant.surname }}</strong>
                      </td>
                      <td>
                        <strong>{{ order.applicant.id }}</strong>
                      </td>
                      <td>
                        <strong>{{ $getCountryName(order.details.destination) }}</strong>
                      </td>
                      <td>
                        <strong>{{ order.details.visa_type }}</strong>
                      </td>
                      <td class="payment-status_field">
                        <span>{{ $capitalizeString(orderDetails.payment_status) }}</span>
                      </td>
                      <td>
                        <span class="order-status_field">
                          <icon :name="iconType(orderDetails.status.status_value)" />
                          {{ orderDetails.status.status_value }}
                        </span>
                      </td>
                      <td>
                        <badge :category="'status'" :text="$capitalizeString(order.details.visa_status)" />
                      </td>
                    </tr>
                  </tbody>
                </DataTable>
              </div>
            </div>
          </b-tab>
          <b-tab title="Payment details">
            <PaymentDetails />
          </b-tab>
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PaymentDetails from '../../../components/orders/PaymentDetails.vue'
export default {
  components: { PaymentDetails },
  async asyncData({ store, params }) {
    await Promise.all([
      store.dispatch('orders/fetchOrderGroupDetails', params.id),
      store.dispatch('orders/fetchOrderPaymentDetails', params.id),
    ])
  },
  data() {
    return {
      fields: ['Name', 'Order Id', 'Travel to', 'Visa type', 'Payment status', 'Order status', 'Visa status'],
    }
  },
  computed: {
    ...mapGetters({
      orderDetails: 'orders/orderGroupDetails',
    }),
  },
  methods: {
    iconType(status) {
      switch (status) {
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
  },
}
</script>

<style></style>

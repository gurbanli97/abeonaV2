<template>
  <div class="orders order_id">
    <page-header
      :title="`${order.applicant.name} ${order.applicant.surname}`"
      show-back-button
      show-actions
      :show-details="{
        country: country_fullname(order.details.destination),
        visa_type: order.details.visa_type,
      }"
    >
      <template v-if="applicantPassports.length">
        <button class="btn btn-info application-form" @click.prevent="$router.push('/orders/application-form')">
          <icon name="document-text" />
          Application form
        </button>
        <div class="order-status_select">
          <span>Order status:</span>
          <client-only>
            <treeselect
              v-model="orderStatus"
              :searchable="true"
              :close-on-select="true"
              :options="orderStatusOptions"
            />
          </client-only>
          <button class="btn btn-success" @click="handleOrderStatusChange">Save</button>
        </div>
      </template>
    </page-header>
    <div class="container">
      <div class="order_id-inner">
        <OrderDetails v-if="applicantPassports.length" />
        <AddPassport v-else />
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
  components: { AddPassport, OrderDetails },
  async asyncData({ params, store }) {
    await Promise.all([
      store.dispatch('orders/fetchOrderById', params.id),
      store.dispatch('orders/fetchCountries'),
      store.dispatch('orders/fetchOrderStatusOptions'),
      store.dispatch('orders/fetchOrderTripDetails', params.id),
      store.dispatch('orders/fetchOrderTasks', params.id),
      store.dispatch('orders/fetchUserList'),
      store.dispatch('orders/fetchTaskStatusList'),
      store.dispatch('orders/fetchOrderComments', params.id),
      store.dispatch('orders/fetchDocumentList', params.id),
      store.dispatch('orders/fetchVisaStatusList'),
    ])
  },
  data() {
    return {
      orderStatus: '',
    }
  },
  computed: {
    ...mapGetters({
      order: 'orders/orderById',
      country_fullname: 'orders/country_fullname',
      orderStatusOptions: 'orders/orderStatusOptions',
      applicantPassports: 'orders/applicant_passports',
    }),
    // activePassport() {
    //   if (this.applicantPassports?.length) {
    //     return this.applicant_passports.find((passport) => passport.is_active)
    //   } else {
    //     return false
    //   }
    // },
  },
  mounted() {
    this.orderStatus = this.order.status.key
  },
  methods: {
    async handleOrderStatusChange() {
      await this.$store.dispatch('orders/updateOrderStatus', {
        status: this.orderStatus,
        order_id: this.$route.params.id,
      })
    },
  },
}
</script>

<style></style>

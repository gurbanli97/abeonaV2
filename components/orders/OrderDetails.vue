<template>
  <div class="order-details">
    <div class="order-details_inner">
      <b-tabs content-class="mt-3">
        <b-tab title="Applicant details" active>
          <div class="customer-info row">
            <div class="col-12 head d-flex justify-content-between">
              <h3>Applicant information</h3>
              <button class="btn">
                <icon :name="'edit-2'" />
                Edit
              </button>
            </div>
            <div class="col-12 mt-4 d-flex flex-wrap justify-content-between">
              <DetailField :label="'Name'">
                <strong>{{ order.applicant.name }}</strong>
              </DetailField>
              <DetailField :label="'Surname'">
                <strong>{{ order.applicant.surname }}</strong>
              </DetailField>
              <DetailField :label="'Phone'">
                <strong>{{ order.applicant.phone }}</strong>
              </DetailField>
              <DetailField :label="'Passport number'">
                <strong>{{ order.details.passport_no }}</strong>
              </DetailField>
              <DetailField :label="'Email'">
                <strong>{{ order.applicant.email }}</strong>
              </DetailField>
              <DetailField :label="'Priority'">
                <badge :category="'status'" :text="'Completed'"> Processing </badge>
              </DetailField>
            </div>
          </div>
          <div class="travel-info row mt-4">
            <div class="col-12 head d-flex justify-content-between">
              <h3>Travel information</h3>
            </div>
            <div class="col-12 mt-4 d-flex flex-wrap justify-content-between">
              <DetailField :label="'Citizen of'">
                <strong>{{ country_fullname(order.details.citizenship) }}</strong>
              </DetailField>
              <DetailField :label="'Resident of'">
                <strong>{{ country_fullname(order.details.residency) }}</strong>
              </DetailField>
              <DetailField :label="'Travel to'">
                <strong>{{ country_fullname(order.details.destination) }}</strong>
              </DetailField>
              <DetailField :label="'Visa type'">
                <strong>{{ order.details.visa_type }}</strong>
              </DetailField>
              <DetailField :label="'Travel date to'">
                <strong>{{ $moment(order.details.travel_date_to).format('DD.MM.YYYY') }}</strong>
              </DetailField>
              <DetailField :label="'Travel date from'">
                <strong>{{ $moment(order.details.travel_date_from).format('DD.MM.YYYY') }}</strong>
              </DetailField>
            </div>
          </div>
          <div class="order-info row mt-4">
            <div class="col-12 head d-flex justify-content-between">
              <h3>Order information</h3>
            </div>
            <div class="col-12 mt-4 d-flex flex-wrap">
              <DetailField :label="'Specialist'">
                <strong>{{ order.details.customer_name }}</strong>
              </DetailField>
              <DetailField :label="'Order date'">
                <strong>{{ $moment(order.order_date).format('DD.MM.YYYY') }}</strong>
              </DetailField>
              <DetailField :label="'Due date'">
                <strong>{{ $moment(order.due_date).format('DD.MM.YYYY') }}</strong>
              </DetailField>
              <DetailField :label="'Source'">
                <strong>{{ order.source }}</strong>
              </DetailField>
              <DetailField :label="'Order type'">
                <strong>{{ order.order_type }}</strong>
              </DetailField>
              <DetailField :label="'Status'">
                <badge :category="'status'" :text="'Completed'" />
              </DetailField>
            </div>
          </div>
        </b-tab>
        <b-tab title="Task list">
          <TaskList />
        </b-tab>
        <b-tab title="Documents">
          <Documents />
        </b-tab>
        <b-tab title="Comments">
          <Comments />
        </b-tab>
        <b-tab title="Visa details">
          <VisaDetails />
        </b-tab>
        <b-tab title="Passport">
          <PassportDetails />
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DetailField from '../elements/DetailField.vue'
import VisaDetails from '../parts/VisaDetails.vue'
import PassportDetails from '../parts/PassportDetails.vue'
import Documents from '../parts/Documents.vue'
import TaskList from './TaskList.vue'
import Comments from './Comments.vue'
export default {
  components: { DetailField, VisaDetails, PassportDetails, TaskList, Documents, Comments },
  data() {
    return {
      showSlideOut: false,
    }
  },
  computed: {
    ...mapGetters({
      order: 'orders/orderById',
      country_fullname: 'orders/country_fullname',
    }),
  },
}
</script>

<style></style>

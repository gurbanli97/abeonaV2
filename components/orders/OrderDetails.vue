<template>
    <div class="order-details">
       <div class="order-details_inner">
              <b-tabs content-class="mt-3">
              <b-tab title="Applicant details" active>
             
                <div class="customer-info row">
                     <div class="col-12 head d-flex justify-content-between">
                   <h3>Applicant information</h3>
                    <button class="btn">
                       <icon :name="'edit-2'"/>
                       Edit
                    </button>
                </div>
                  <div class="col-12 mt-4 d-flex flex-wrap justify-content-between">
                     <detail-field :label="'Name'">
                      <strong>{{order.applicant.name}}</strong>
                    </detail-field>
                     <detail-field :label="'Surname'">
                      <strong>{{order.applicant.surname}}</strong>
                    </detail-field>
                     <detail-field :label="'Phone'">
                      <strong>{{order.applicant.phone}}</strong>
                    </detail-field>
                     <detail-field :label="'Passport number'">
                      <strong>{{order.details.passport_no}}</strong>
                    </detail-field>
                     <detail-field :label="'Email'">
                      <strong>{{order.applicant.email}}</strong>
                    </detail-field>
                     <detail-field :label="'Priority'">
                      <badge :category="'status'" :text="'Completed'">
                            Processing
                      </badge>
                    </detail-field>
                  </div>
                </div>
                <div class="travel-info row mt-4">
                     <div class="col-12 head d-flex justify-content-between">
                   <h3>Travel information</h3>
                </div>
                  <div class="col-12 mt-4 d-flex flex-wrap justify-content-between">
                     <detail-field :label="'Citizen of'">
                      <strong>{{country_fullname(order.details.citizenship)}}</strong>
                    </detail-field>
                     <detail-field :label="'Resident of'">
                      <strong>{{country_fullname(order.details.residency)}}</strong>
                    </detail-field>
                     <detail-field :label="'Travel to'">
                      <strong>{{country_fullname(order.details.destination)}}</strong>
                    </detail-field>
                     <detail-field :label="'Visa type'">
                      <strong>{{order.details.visa_type}}</strong>
                    </detail-field>
                     <detail-field :label="'Travel date to'">
                      <strong>{{$moment(order.details.travel_date_to).format('DD.MM.YYYY')}}</strong>
                    </detail-field>
                     <detail-field :label="'Travel date from'">
                      <strong>{{$moment(order.details.travel_date_from).format('DD.MM.YYYY')}}</strong>
                    </detail-field>
                  </div>
                </div>
                <div class="order-info row mt-4">
                     <div class="col-12 head d-flex justify-content-between">
                   <h3>Order information</h3>
                </div>
                  <div class="col-12 mt-4 d-flex flex-wrap">
                      <detail-field :label="'Specialist'">
                      <strong>{{order.details.customer_name}}</strong>
                    </detail-field>
                     <detail-field :label="'Order date'">
                      <strong>{{$moment(order.order_date).format('DD.MM.YYYY')}}</strong>
                    </detail-field>
                     <detail-field :label="'Due date'">
                      <strong>{{$moment(order.due_date).format('DD.MM.YYYY')}}</strong>
                    </detail-field>
                     <detail-field :label="'Source'">
                      <strong>{{order.source}}</strong>
                    </detail-field>
                      <detail-field :label="'Order type'">
                      <strong>{{order.order_type}}</strong>
                    </detail-field>
                     <detail-field :label="'Status'">
                      <badge :category="'status'" :text="'Completed'"/>
                    </detail-field>
                  </div>
                </div>
              </b-tab>
              <b-tab title="Task list">
                <task-list/>
              </b-tab>
              <b-tab title="Documents"><p>I'm the second tab</p></b-tab>
              <b-tab title="Payment details">
                <payment-details/>
              </b-tab>
              <b-tab title="Visa details">
                 <visa-details/>
              </b-tab>
              <b-tab title="Passport">
                <passport-details/>
              </b-tab>
              <b-tab title="Application form" title-item-class="application-form_tab" @click.prevent="$router.push('/orders')">
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
import TaskList from './TaskList.vue'
import PaymentDetails from './PaymentDetails.vue'
export default {
  components: { DetailField,VisaDetails, PassportDetails, TaskList, PaymentDetails },
  data(){
    return {
      showSlideOut: false
    }
  },
  computed:{
    ...mapGetters({
      order: 'orders/orderById',
      country_fullname: 'orders/country_fullname',
    })
  }
}
</script>

<style>

</style>
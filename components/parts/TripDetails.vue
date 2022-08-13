<template>
  <div v-if="trips.length" class="trips col-6">
    <h3>Trips on this visa</h3>
    <div class="trips-inner">
      <div v-for="trip in trips" :key="trip.id" :class="['trip-item']">
        <div class="trip-item_head" @click="handleTripActivation($event, trip.id)">
          <span class="d-flex align-items-center">
            <icon name="plane" />
            To {{ $getCountryName(trip.travel_to) }}
          </span>
          <icon name="arrow-circle-down" />
        </div>
        <div class="trip-item_body">
          <b-form>
            <b-form-group label="Country">
              <v-select v-model="editTripform.travel_to" :options="countryListOptions" :reduce="(data) => data.value">
              </v-select>
            </b-form-group>
            <b-form-group label="Date from">
              <date-picker
                v-model="editTripform.date_from"
                value-type="format"
                format="YYYY-MM-DD"
                placeholder="Enter"
              />
            </b-form-group>

            <b-form-group label="Date to">
              <date-picker v-model="editTripform.date_to" value-type="format" format="YYYY-MM-DD" placeholder="Enter" />
            </b-form-group>
          </b-form>

          <div class="actions">
            <button class="btn btn-borderless" @click="showDeleteModal = true">Delete trip</button>
            <button class="btn btn-success" @click="handleTripUpdate(itemToEdit, trip.applicant_visa)">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>

    <modal
      :toggle="showDeleteModal"
      @close="showDeleteModal = false"
      @modal-delete-click="handleTripItemDelete(itemToEdit)"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      itemToEdit: '',
      editTripform: {
        applicant_visa_id: '',
        travel_to: '',
        date_from: '',
        date_to: '',
        status: '',
      },
      showDeleteModal: false,
    }
  },
  computed: {
    ...mapGetters({
      trips: 'orders/trip_details',
      countryListOptions: 'orders/countryListOptions',
    }),
    editTripItem() {
      return this.trips.find((trip) => trip.id == this.itemToEdit)
    },
  },
  methods: {
    handleTripActivation(event, trip_id) {
      this.itemToEdit = trip_id

      this.editTripform.date_from = this.editTripItem.date_from
      this.editTripform.date_to = this.editTripItem.date_to
      this.editTripform.status = this.editTripItem.status
      this.editTripform.travel_to = this.editTripItem.travel_to

      var items = document.querySelectorAll('.trip-item')
      items.forEach((item) => {
        if (item != event.target.closest('.trip-item')) item.classList.remove('active')
      })

      if (event.target.closest('.trip-item').classList.contains('active'))
        event.target.closest('.trip-item').classList.remove('active')
      else event.target.closest('.trip-item').classList.add('active')
    },
    async handleTripItemDelete(trip_id) {
      await this.$store.dispatch('orders/deleteVisaTripItem', trip_id)
      await this.$store.dispatch('orders/fetchOrderTripDetails', this.$route.params.id)
      this.showDeleteModal = false
    },
    async handleTripUpdate(trip_id, visa_id) {
      this.editTripform.applicant_visa_id = visa_id
      const preparedForm = this.editTripform
      for (const [key] of Object.entries(preparedForm)) {
        if (!preparedForm[key]) delete preparedForm[key]
      }
      await this.$store.dispatch('orders/updateExistingTripDetails', { trip_id, form: preparedForm })
      await this.$store.dispatch('orders/fetchOrderTripDetails', this.$route.params.id)
    },
  },
}
</script>

<style></style>

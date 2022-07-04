<template>
  <div class="trips col-6">
    <h3>Trips on this visa</h3>
    <div class="trips-inner">
      <div :class="['trip-item']" v-for="trip in trips" :key="trip.id">
        <div class="trip-item_head" @click="handleTripActivation($event,trip.id)">
          <span class="d-flex align-items-center">
            <icon name="plane" />
            To {{country_fullname(trip.travel_to)}}
          </span>
          <icon name="arrow-circle-down" />
        </div>
        <div class="trip-item_body">
           <b-form-group label="Country">
                    <v-select>
                    </v-select>
            </b-form-group>
          <b-form-group label="Date from">
            <date-picker value-type="format" format="YYYY-MM-DD" placeholder="Choose date" :value="form[trip.id].date_from" @input="handleTripInput(trip.id, 'date_from', $event)" />
          </b-form-group>

          <b-form-group label="Date to">
            <date-picker value-type="format" format="YYYY-MM-DD" placeholder="Choose date" :value="form[trip.id].date_to" @input="handleTripInput(trip.id, 'date_to', $event)" />
          </b-form-group>

          <div class="actions">
            <button class="btn btn-borderless">Delete trip</button>
            <button class="btn btn-success">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
      return {
        form: {}
      }
    },
    computed: {
      ...mapGetters({
        trips: 'orders/trip_details',
        country_fullname: 'orders/country_fullname'
      }),
    },
    methods: {
      handleTripActivation(event, trip) {
        var items = document.querySelectorAll('.trip-item')
        items.forEach(item => {
          if (item != event.target.closest('.trip-item'))
            item.classList.remove('active')
        })

        if (event.target.closest('.trip-item').classList.contains('active'))
          event.target.closest('.trip-item').classList.remove('active')
        else event.target.closest('.trip-item').classList.add('active')
      },
      handleTripInput(tripId, key, value) {
        this.$set(this.form[tripId], key, value)
        this.$forceUpdate()
      }
    },
    created () {
      for (let i in this.trips) {
        this.form[this.trips[i].id] = {...this.trips[i]}
      }
    },
    mounted(){
      console.log(this.trips)
    }
  }
</script>

<style>

</style>
<template>
   <div class="trips col-6">
                          <h3>Trips on this visa</h3>
                          <div class="trips-inner">
                            <div :class="['trip-item']"  v-for="trip in trips" :key="trip.id">
                              <div class="trip-item_head" @click="handleTripActivation($event,trip.id)">
                                <span class="d-flex align-items-center">
                                  <icon name="plane" />
                                  To {{trip.country}}
                                </span>
                                <icon name="arrow-circle-down"/>
                              </div>
                              <div class="trip-item_body">
                                  <form-field label="Travel to" type="text" />
                               <b-form-group label="Date from">
                                    <date-picker
                                    value-type="format" 
                                    format="YYYY-MM-DD" 
                                    placeholder="Choose date"
                                    v-model="dateFrom"
                                        />
                                </b-form-group>

                                 <b-form-group label="Date to">
                                    <date-picker
                                    value-type="format" 
                                    format="YYYY-MM-DD" 
                                    placeholder="Choose date"
                                    v-model="dateTo"
                                        />
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
export default {
  data(){
    return {
       trips: [
          {
            id:1,
            country: 'Germany'
          },
          {
            id:2,
            country: 'Azerb'
          },
          {
            id:3,
            country: 'France'
          }
        ],
        dateFrom: '',
        dateTo: ''
    }
  },
  methods: {
     handleTripActivation(event,trip){
        var items = document.querySelectorAll('.trip-item')
        items.forEach(item => {
            if(item != event.target.closest('.trip-item'))
             item.classList.remove('active')
        })

        if(event.target.closest('.trip-item').classList.contains('active'))
           event.target.closest('.trip-item').classList.remove('active')
        else event.target.closest('.trip-item').classList.add('active')
      }
  }
}
</script>

<style>

</style>
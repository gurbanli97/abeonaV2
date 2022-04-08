<template>
  <div :class="['slideout-overlay',{'active':slideIsActive}]">
     <div :class="['slideout-content',{'active':slideIsActive}]">
       <div class="slideout-content_head">
         <h2>Add an applicant</h2>
         <div class="is-client">
           <span>This applicant is client</span>
           <label class="switch">
            <input type="checkbox">
            <span class="slider round"></span>
          </label>
         </div>
         <button @click="$emit('close-slide')">
           <icon :name="'close-circle'" />
         </button>
       </div>
       <div class="slideout-content_forms">
         <div class="slideout-forms-inner">
           <div class="client-form">
           <b-form>
           <b-form-group>
                    <form-field :placeholder="'Enter'" :label="'Name'" />
            </b-form-group>
            <b-form-group>
              <form-field :placeholder="'Enter'" :label="'Surname'" />
            </b-form-group>
             <b-form-group>
                    <form-field :placeholder="'+'" :label="'Phone'" />
            </b-form-group>
            <b-form-group>
              <form-field :placeholder="'Enter'" :label="'Email'" />
            </b-form-group>
            <b-form-group label="Citizen of">
                  <v-select
                  :closeOnSelect="true"
                  :clearable="false"
                  >
                  </v-select>
            </b-form-group>
             <b-form-group label="Resident of">
                  <v-select
                  :closeOnSelect="true"
                  :clearable="false"
                  >
                  </v-select>
            </b-form-group>
              <b-form-group label="Travel to">
                  <v-select
                  :closeOnSelect="true"
                  :clearable="false"
                  >
                  </v-select>
            </b-form-group>
              <b-form-group label="Visa type">
                  <v-select
                  :closeOnSelect="true"
                  :clearable="false"
                  >
                  </v-select>
            </b-form-group>
            <b-form-group label="Travel date to">
                    <date-picker
                    value-type="format" 
                    format="YYYY-MM-DD" 
                    placeholder="Choose date"
                    />
                </b-form-group>
                <b-form-group label="Trave date from">
                      <date-picker
                      value-type="format" 
                      format="YYYY-MM-DD" 
                      placeholder="Choose date"
                      />
              </b-form-group>
              <b-form-group label="Consultation type">
                  <v-select
                  :closeOnSelect="true"
                  :clearable="false"
                  >
                  </v-select>
            </b-form-group>
              <b-form-group label="Consultation status">
                  <v-select
                  :closeOnSelect="true"
                  :clearable="false"
                  >
                  </v-select>
            </b-form-group>
         </b-form>
         </div>
          <div class="appointment-form">
              <h3>Appointment details</h3>
              <b-form>
              <b-form-group label="Date">
                  <date-picker
                  value-type="format" 
                  format="YYYY-MM-DD" 
                  placeholder="Choose date"
                      />
              </b-form-group>
              <b-form-group label="Language">
                  <v-select
                  :closeOnSelect="true"
                  :clearable="false"
                  >
                  </v-select>
              </b-form-group>
              <b-form-group label="Specialist">
                  <v-select
                  :closeOnSelect="true"
                  :clearable="false"
                  >
                  </v-select>
              </b-form-group>
              <b-form-group label="Time">
                  <v-select
                  :closeOnSelect="true"
                  :clearable="false"
                  >
                  </v-select>
              </b-form-group>
              </b-form>
              <button class="btn btn-success">Submit</button>
          </div>
         </div>
       </div>
     </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
export default {
  components: { DatePicker },
  props:{
    slideIsActive: {
      type: Boolean,
      default: false
    }
  },
}
</script>

<style>

</style>
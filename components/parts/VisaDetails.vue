<template>
  <div class="visa-details">
    <b-tabs>
      <b-tab>
        <button class="btn edit-visa ml-auto" @click="showSlideOut = true">
          <icon :name="'edit-2'"/>
          Edit
        </button>
        <div class="row">
          <div class="col-12 d-flex justify-content-between flex-wrap mb-4">
            <detail-field label='Country'>
              <strong>{{visa.country}}</strong>
            </detail-field>
            <detail-field label='Issue date'>
              <strong>{{visa.issue_date}}</strong>
            </detail-field>
            <detail-field label='From date'>
              <strong>{{visa.from_date}}</strong>
            </detail-field>
            <detail-field label='Expiry date'>
              <strong>{{visa.expire_date}}</strong>
            </detail-field>
            <detail-field label='Entries'>
              <strong>{{visa.entries}}</strong>
            </detail-field>
            <detail-field label='Visa type'>
              <strong>{{visa.visa_type}}</strong>
            </detail-field>
            <detail-field label='Validity'>
              <strong>{{visa.validity}}</strong>
            </detail-field>
            <detail-field :label="'Status'">
              <badge :category="'status'" :text="$capitalizeString(visa.status)"/>
            </detail-field>
            <detail-field>
            </detail-field>
          </div>
          <div class="col-12 visacopy-upload d-flex flex-column align-items-start">
            <div class="attachment-upload_input mb-4">
              <label for="attachment-input">
                <div>
                  <h3>Visa copy (scan)</h3>
                  <span>png, jpg, pdf</span>
                </div>
                <strong>Choose</strong>
                <input type="file" id="attachment-input" hidden @change="handleUpload($event)">
              </label>
            </div>
            <div class="attachment-upload_progress" v-if="visacopy">
              <div class="visacopy-progress_inner d-flex flex-column align-items-start">
                <span>{{visacopy}}</span>
                <div class="progressbar d-flex align-items-center">
                  <b-progress height="4px" :max="max">
                    <b-progress-bar :value="progressValue"></b-progress-bar>
                  </b-progress>
                  <button class="btn">
                    <icon name="close-circle-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <trip-details />
        </div>
      </b-tab>
      <b-tab title="Visa free">

      </b-tab>
    </b-tabs>
      <slide-out 
            :slideIsActive="showSlideOut" 
            @close-slide="showSlideOut = false" 
            title="Edit visa details" 
            >
             <template #body>
               <b-form>
                  <b-form-group label="Country">
                    <v-select>
                    </v-select>
                  </b-form-group>
                    <b-form-group label="Issue date">
                      <date-picker
                      value-type="format" 
                      format="YYYY-MM-DD" 
                      placeholder="Choose date"
                      v-model="dateFrom"
                          />
                  </b-form-group>
                   <b-form-group label="From date">
                      <date-picker
                      value-type="format" 
                      format="YYYY-MM-DD" 
                      placeholder="Choose date"
                      v-model="dateFrom"
                          />
                  </b-form-group>
                    <b-form-group label="Expiry date">
                      <date-picker
                      value-type="format" 
                      format="YYYY-MM-DD" 
                      placeholder="Choose date"
                      v-model="dateFrom"
                          />
                  </b-form-group>
                    <b-form-group label="Entries">
                    <form-field :placeholder="'Enter'"
                    >
                    </form-field>
                  </b-form-group>
                      <b-form-group label="Visa type">
                    <v-select>
                    </v-select>
                  </b-form-group>
                       <b-form-group label="Validity">
                    <form-field :placeholder="'Enter'"
                    >
                    </form-field>
                  </b-form-group>
                     <b-form-group label="Status">
                    <v-select>
                    </v-select>
                  </b-form-group>
                  <button class="btn btn-success" type="submit">Save</button>
               </b-form>

            </template>
      </slide-out>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import TripDetails from './TripDetails.vue'
  export default {
    components: {
      TripDetails
    },
    data() {
      return {
        showSlideOut: false,
        visacopy: '',
        dateFrom: '',
      }
    },
    computed: {
      ...mapGetters({
        visa: 'orders/visa_details',
      })
    },
    mounted(){
      console.log(this.visa)
    }
  }
</script>

<style>

</style>
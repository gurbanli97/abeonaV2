<template>
  <div class="visa-details">
                  <b-tabs>
                    <b-tab title="Schengen">
                      <button class="btn btn-success ml-auto">---</button>
                      <div class="row">
                        <div class="col-12 d-flex justify-content-between flex-wrap mb-4">
                          <detail-field label='Country'>
                            <strong>{{visa.full_country}}</strong>
                          </detail-field>
                          <detail-field label='Issue date'>
                            <strong>{{visa.issue_date}}</strong>
                          </detail-field>
                          <detail-field label='From date'>
                            <strong>C123230</strong>
                          </detail-field>
                          <detail-field label='Expiry date'>
                            <strong>{{visa.expire_date}}</strong>
                          </detail-field>
                           <detail-field label='Entries'>
                            <strong>C123230</strong>
                          </detail-field>
                          <detail-field label='Visa type'>
                            <strong>{{visa.visa_type}}</strong>
                          </detail-field>
                          <detail-field label='Validity'>
                            <strong>C123230</strong>
                          </detail-field>
                            <detail-field :label="'Status'">
                            <badge :category="'status'" :text="visa.status">
                                  {{visa.status}}
                            </badge>
                          </detail-field>
                          <detail-field>
                          </detail-field>
                        </div>
                        <div class="col-12 visacopy-upload mt-5 d-flex flex-column align-items-start">
                          <div class="visacopy-upload_input mb-4">
                            <label for="visacopy-input">
                              <div>
                                <h3>Visa copy (scan)</h3>
                                <span>png, jpg, pdf</span>
                              </div>
                              <strong>Choose</strong>
                              <input type="file" id="visacopy-input" hidden @change="handleUpload($event)">
                            </label>
                          </div>
                          <div class="visacopy-upload_progress" v-if="visacopy">
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

                        <trip-details/>
                      </div>
                    </b-tab>
                    <b-tab title="Visa free">

                    </b-tab>
                  </b-tabs>
                </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TripDetails from './TripDetails.vue'
export default {
  components: { TripDetails },
  data(){
    return {
      visacopy: '',
    }
  },
  computed:{
    ...mapGetters({
      visa: 'orders/visa_details'
    })
  }
}
</script>

<style>

</style>
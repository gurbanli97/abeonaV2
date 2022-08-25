<template>
  <div class="applicant applicant_id">
    <page-header :title="'Applicant name'" :show-back-button="true" :show-border="true" :show-actions="true">
      <template #actions>
        <button class="btn applicant-details" @click="$router.push(`${$route.params.id}/details`)">
          <Icon :name="'info-circle'" />
          Applicant details
        </button>
        <button class="btn applicant-files" @click="$router.push(`${$route.params.id}/documents`)">
          <Icon :name="'folder-add'" />
          Applicant files
        </button>
      </template>
    </page-header>
    <div class="container">
      <div class="applicant-id_inner">
        <div class="recent-orders">
          <h2>Recent orders</h2>
          <DataTable :fields="fields">
            <tbody>
              <template v-for="client in clients">
                <tr :key="client.id">
                  <td>
                    <span>United States of America</span>
                  </td>
                  <td>
                    <span>Education</span>
                  </td>
                  <td>
                    <strong>Processing</strong>
                  </td>
                  <td>
                    <span>Regular</span>
                  </td>
                  <td>
                    <span>08.10.2021</span>
                  </td>
                  <td>
                    <badge :category="'status'" :text="'Completed'"> Processing </badge>
                  </td>
                </tr>
              </template>
            </tbody>
          </DataTable>
        </div>
        <div class="applicant-passports">
          <h2>Applicant passports</h2>
          <div class="applicant-passports_inner">
            <b-tabs>
              <b-tab title="Passport: C123230">
                <button class="btn btn-success ml-auto">---</button>
                <div class="passport-details row">
                  <div class="col-12 d-flex justify-content-between mb-4">
                    <detail-field label="Passport number">
                      <strong>C123230</strong>
                    </detail-field>
                    <detail-field label="Surname">
                      <strong>Agayev</strong>
                    </detail-field>
                    <detail-field label="Name">
                      <strong>Ibrahim</strong>
                    </detail-field>
                    <detail-field label="Patronymic">
                      <strong>Hasan</strong>
                    </detail-field>
                  </div>
                  <div class="col-12 d-flex justify-content-between mb-4">
                    <detail-field label="Nationality">
                      <strong>Azerbaijan</strong>
                    </detail-field>
                    <detail-field label="PIN">
                      <strong>HDF8563</strong>
                    </detail-field>
                    <detail-field label="Date of birth">
                      <strong>18.11.1993</strong>
                    </detail-field>
                    <detail-field label="Date of issue">
                      <strong>02.06.2022</strong>
                    </detail-field>
                  </div>
                  <div class="col-12 d-flex justify-content-between">
                    <detail-field label="Date of expiry">
                      <strong>02.05.2032</strong>
                    </detail-field>
                    <detail-field label="Issuing authority">
                      <strong>Baku, Narimanov district. Passport department</strong>
                    </detail-field>
                    <detail-field label="Gender">
                      <strong>Male</strong>
                    </detail-field>
                    <detail-field label="Expired reason">
                      <strong>N/A</strong>
                    </detail-field>
                  </div>
                  <div class="col-12 passport-upload mt-5 d-flex align-items-center">
                    <div class="passport-upload_input">
                      <label for="passport-input">
                        <div>
                          <h3>Passport image</h3>
                          <span>png, jpg, pdf</span>
                        </div>
                        <strong>Choose</strong>
                        <input id="passport-input" type="file" hidden />
                      </label>
                    </div>
                    <div class="passport-active_checkbox d-flex align-items-center">
                      <label for="passport-active">
                        <input id="passport-active" type="checkbox" />
                        <span>This passport is active</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div class="visa-details">
                  <h2>Visas on this passport</h2>
                  <b-tabs>
                    <b-tab title="Schengen">
                      <button class="btn btn-success ml-auto">---</button>
                      <div class="row">
                        <div class="col-12 d-flex justify-content-between flex-wrap mb-4">
                          <detail-field label="Country">
                            <strong>C123230</strong>
                          </detail-field>
                          <detail-field label="Country">
                            <strong>C123230</strong>
                          </detail-field>
                          <detail-field label="Country">
                            <strong>C123230</strong>
                          </detail-field>
                          <detail-field label="Country">
                            <strong>C123230</strong>
                          </detail-field>
                        </div>
                        <div class="col-12 d-flex justify-content-between flex-wrap mb-4">
                          <detail-field label="Country">
                            <strong>C123230</strong>
                          </detail-field>
                          <detail-field label="Country">
                            <strong>C123230</strong>
                          </detail-field>
                          <detail-field label="Country">
                            <strong>C123230</strong>
                          </detail-field>
                          <detail-field label="Country">
                            <strong>C123230</strong>
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
                              <input id="visacopy-input" type="file" hidden @change="handleUpload($event)" />
                            </label>
                          </div>
                          <div v-if="visacopy" class="visacopy-upload_progress">
                            <div class="visacopy-progress_inner d-flex flex-column align-items-start">
                              <span>{{ visacopy }}</span>
                              <div class="progressbar d-flex align-items-center">
                                <b-progress height="4px" :max="max">
                                  <b-progress-bar :value="progressValue"></b-progress-bar>
                                </b-progress>
                                <button class="btn">
                                  <Icon name="close-circle-2" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="trips col-6">
                          <h2>Trips on this visa</h2>
                          <div class="trips-inner">
                            <div v-for="trip in trips" :key="trip.id" :class="['trip-item']">
                              <div class="trip-item_head" @click="handleTripActivation($event)">
                                <span class="d-flex align-items-center">
                                  <Icon name="plane" />
                                  To {{ trip.country }}
                                </span>
                                <Icon name="arrow-circle-down" />
                              </div>
                              <div class="trip-item_body">
                                <form-field label="Travel to" type="text" />
                                <b-form-group label="Date from">
                                  <date-picker
                                    v-model="dateFrom"
                                    value-type="format"
                                    format="YYYY-MM-DD"
                                    placeholder="Choose date"
                                  />
                                </b-form-group>

                                <b-form-group label="Date to">
                                  <date-picker
                                    v-model="dateTo"
                                    value-type="format"
                                    format="YYYY-MM-DD"
                                    placeholder="Choose date"
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
                      </div>
                    </b-tab>
                    <b-tab title="Visa free"> </b-tab>
                  </b-tabs>
                </div>
              </b-tab>
              <b-tab title="Passport: C12322130">
                <p>I'm the second tab</p>
              </b-tab>
            </b-tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {},
  async asyncData({ store }) {
    await store.dispatch('clients/fetchClients')
  },
  data() {
    return {
      fields: ['Country to', 'Visa type', 'Visa status', 'Order type', 'Created time', 'Status'],
      trips: [
        {
          id: 1,
          country: 'Germany',
        },
        {
          id: 2,
          country: 'Azerb',
        },
        {
          id: 3,
          country: 'France',
        },
      ],
      visacopy: '',
      progressValue: 20,
      max: 100,
      dateFrom: '',
      dateTo: '',
    }
  },
  computed: {
    ...mapGetters({
      clients: 'clients/clients',
    }),
  },
  methods: {
    handleUpload(event) {
      console.log(event.target.files)

      let formData = new FormData()
      formData.append('file', event.target.files[0])
      this.visacopy = event.target.files[0].name

      this.$axios
        .post('/api/v1/attachments', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: function (progressEvent) {
            this.progressValue = parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100))

            console.log(this.progressValue)
          }.bind(this),
        })
        .then(function () {
          console.log('SUCCESS!!')
        })
        .catch(function () {
          console.log('FAILURE!!')
        })
    },
    handleTripActivation(event) {
      var items = document.querySelectorAll('.trip-item')
      items.forEach((item) => {
        if (item != event.target.closest('.trip-item')) item.classList.remove('active')
      })
      if (event.target.closest('.trip-item').classList.contains('active'))
        event.target.closest('.trip-item').classList.remove('active')
      else event.target.closest('.trip-item').classList.add('active')
    },
  },
}
</script>

<style></style>

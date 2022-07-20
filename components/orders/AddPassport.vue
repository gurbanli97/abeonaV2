<template>
  <div class="add-passport">
    <div class="add-passport_inner mt-4">
      <div class="passport-form_inputs row">
        <div class="col-8">
          <div class="col-12">
            <h3>Passport details</h3>
            <b-form class="d-flex flex-wrap justify-content-between mt-4">
              <b-form-group label="Passport number">
                <form-field
                  v-model="form.customer.name"
                  :placeholder="'Enter'"
                  :is-invalid="$v.form.customer.name.$error"
                >
                  <b-form-invalid-feedback v-if="!$v.form.customer.name.$required">
                    Input can't be empty
                  </b-form-invalid-feedback>
                </form-field>
              </b-form-group>
              <b-form-group label="Surname">
                <form-field
                  v-model="form.customer.surname"
                  :placeholder="'Enter'"
                  :is-invalid="$v.form.customer.surname.$error"
                >
                  <b-form-invalid-feedback v-if="!$v.form.customer.surname.$required">
                    Input can't be empty
                  </b-form-invalid-feedback>
                </form-field>
              </b-form-group>
              <b-form-group label="Name">
                <form-field
                  v-model="form.customer.name"
                  :placeholder="'Enter'"
                  :is-invalid="$v.form.customer.name.$error"
                >
                  <b-form-invalid-feedback v-if="!$v.form.customer.name.$required">
                    Input can't be empty
                  </b-form-invalid-feedback>
                </form-field>
              </b-form-group>

              <b-form-group label="Patronymic">
                <form-field
                  v-model="form.customer.email"
                  :placeholder="'Enter'"
                  :is-invalid="$v.form.customer.email.$error"
                >
                  <b-form-invalid-feedback v-if="!$v.form.customer.email.required">
                    Input can't be empty
                  </b-form-invalid-feedback>
                  <b-form-invalid-feedback v-if="!$v.form.customer.email.email">
                    Enter valid email
                  </b-form-invalid-feedback>
                </form-field>
              </b-form-group>
              <b-form-group label="Nationality">
                <v-select
                  v-model="form.customer.attrs.citizen_of"
                  :class="{ 'is-invalid': $v.form.customer.attrs.citizen_of.$error }"
                  :clearable="true"
                  :get-option-label="(country) => country.value"
                  :options="countries"
                  :reduce="(data) => data.key"
                  @input="fetchVisaTypes"
                >
                </v-select>
                <span v-if="$v.form.customer.attrs.citizen_of.$error" class="select-invalid">
                  Input can't be empty
                </span>
              </b-form-group>
              <b-form-group label="Date of issue">
                <date-picker
                  v-model="form.visa.requested_date_to"
                  :class="{ invalid: $v.form.visa.requested_date_to.$error }"
                  value-type="format"
                  format="YYYY-MM-DD"
                  placeholder="Choose date"
                />
                <span v-if="$v.form.visa.requested_date_to.$error" class="select-invalid"> Input can't be empty </span>
              </b-form-group>

              <b-form-group label="Personal number(PIN)">
                <form-field
                  v-model="form.customer.email"
                  :placeholder="'Enter'"
                  :is-invalid="$v.form.customer.email.$error"
                >
                  <b-form-invalid-feedback v-if="!$v.form.customer.email.required">
                    Input can't be empty
                  </b-form-invalid-feedback>
                  <b-form-invalid-feedback v-if="!$v.form.customer.email.email">
                    Enter valid email
                  </b-form-invalid-feedback>
                </form-field>
              </b-form-group>
              <b-form-group label="Gender">
                <v-select
                  v-model="form.customer.attrs.citizen_of"
                  :class="{ 'is-invalid': $v.form.customer.attrs.citizen_of.$error }"
                  :clearable="true"
                  :get-option-label="(country) => country.value"
                  :options="countries"
                  :reduce="(data) => data.key"
                  @input="fetchVisaTypes"
                >
                </v-select>
                <span v-if="$v.form.customer.attrs.citizen_of.$error" class="select-invalid">
                  Input can't be empty
                </span>
              </b-form-group>
              <b-form-group label="Date of issue">
                <date-picker
                  v-model="form.visa.requested_date_from"
                  :class="{ invalid: $v.form.visa.requested_date_from.$error }"
                  value-type="format"
                  format="YYYY-MM-DD"
                  placeholder="Choose date"
                />
                <span v-if="$v.form.visa.requested_date_from.$error" class="select-invalid">
                  Input can't be empty
                </span>
              </b-form-group>
              <b-form-group label="Date of expiry">
                <date-picker
                  v-model="form.visa.requested_date_to"
                  :class="{ invalid: $v.form.visa.requested_date_to.$error }"
                  value-type="format"
                  format="YYYY-MM-DD"
                  placeholder="Choose date"
                />
                <span v-if="$v.form.visa.requested_date_to.$error" class="select-invalid"> Input can't be empty </span>
              </b-form-group>
              <b-form-group label="Issuing authority">
                <form-field
                  v-model="form.customer.email"
                  :placeholder="'Enter'"
                  :is-invalid="$v.form.customer.email.$error"
                >
                  <b-form-invalid-feedback v-if="!$v.form.customer.email.required">
                    Input can't be empty
                  </b-form-invalid-feedback>
                  <b-form-invalid-feedback v-if="!$v.form.customer.email.email">
                    Enter valid email
                  </b-form-invalid-feedback>
                </form-field>
              </b-form-group>
            </b-form>
          </div>
        </div>
        <div class="col-4 d-flex flex-column justify-content-between">
          <client-only>
            <Dropzone id="foo" :options="dropzoneOptions" :destroy-dropzone="true"></Dropzone>
            <!-- <b-form-invalid-feedback v-if="!$v.form.passport_file.required">
                         Passport file required
                  </b-form-invalid-feedback> -->
          </client-only>

          <button class="btn btn-success align-self-end">Save & Continue</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'

import Dropzone from 'nuxt-dropzone'
import 'nuxt-dropzone/dropzone.css'
export default {
  components: {
    Dropzone,
  },
  data() {
    return {
      showSlideOut: false,
      birthDate: '',
      showAddPopup: false,
      activeAction: null,
      showDeleteModal: false,
      itemToDelete: null,
      loading: false,
      telOptions: {
        type: 'tel',
        placeholder: 'Enter',
        showDialCode: true,
      },
      form: {
        passport_id: null,
        customer: {
          phone: '',
          name: '',
          surname: '',
          email: '',
          attrs: {
            citizen_of: '',
            resident_of: '',
          },
        },
        passport: {
          file: '',
        },
        visa: {
          country: '',
          requested_date_from: '',
          requested_date_to: '',
        },
        service_id: '',
        callback_url: 'https://pickvisa.com/payment/result',
        cancel_url: 'https://vizam.az/failed',
        source: 'stg.vizam.az',
        payment_type: 'online',
        payment_method: 'stripe',
        currency: 'AED',
        data: {
          residency: this.resident_of,
        },
      },
      dropzoneOptions: {
        url: '/api/v1/scanner/scan',
        maxFiles: 1,
        uploadMultiple: false,
        autoProcessQueue: true,
        addRemoveLinks: true,
        previewTemplate: this.template(),
        thumbnailWidth: null,
        thumbnailHeight: null,
        dictDefaultMessage: this.message(),
      },
    }
  },
  validations: {
    form: {
      customer: {
        phone: {
          required,
          minLength: minLength(8),
        },
        email: {
          email,
          required,
        },
        name: {
          required,
        },
        surname: {
          required,
        },

        attrs: {
          citizen_of: {
            required,
          },
          resident_of: {
            required,
          },
        },
      },
      visa: {
        country: {
          required,
        },
        requested_date_from: {
          required,
        },
        requested_date_to: {
          required,
        },
      },
      service_id: {
        required,
      },
    },
  },
  methods: {
    template: function () {
      return '<div style="display:flex !important" class="dz-preview d-flex align-items-center flex-column dz-file-preview">\n  <div class="dz-details">\n  <img data-dz-thumbnail class="img-responsive img-thumbnail_custom" />\n  <div class="dz-filename"><span data-dz-name></span></div>\n    <div class="dz-size" data-dz-size></div>\n<div class="dz-success-mark"><img src="https://img.icons8.com/fluent/48/000000/checkmark.png"/></div>\n  <div class="dz-error-mark"><img src="https://img.icons8.com/fluent/50/000000/no-image.png"/></div>\n  <div class="dz-error-message"><span data-dz-errormessage></span></div>\n</div>'
    },
    message() {
      return '<div class="dropzone-custom-message"><h2>Drag drop passport file here</h2> <span>or</span> <button class="btn">Upload</button> <span>png, jpg ,pdf</span></div>'
    },
    //   handleDropzoneAttach(file,dataUrl){
    //     if(file)
    //      this.$axios.post('/api/v1/scanner/scan',{passport: dataUrl.blob()})
    //      .then(res => {
    //          console.log(res)
    //      })
    //   },
  },
}
</script>

<style></style>

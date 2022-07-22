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
                  v-model="form.passport.document_number"
                  :placeholder="'Enter'"
                  :is-invalid="$v.form.passport.document_number.$error"
                >
                  <b-form-invalid-feedback v-if="!$v.form.passport.document_number.$required">
                    Input can't be empty
                  </b-form-invalid-feedback>
                </form-field>
              </b-form-group>
              <b-form-group label="Surname">
                <form-field v-model="form.passport.last_name" :placeholder="'Enter'"> </form-field>
              </b-form-group>
              <b-form-group label="Name">
                <form-field v-model="form.passport.first_name" :placeholder="'Enter'"> </form-field>
              </b-form-group>
              <b-form-group label="Date of birth">
                <date-picker
                  v-model="form.passport.birth_date"
                  value-type="format"
                  format="YYYY-MM-DD"
                  placeholder="Choose date"
                />
              </b-form-group>
              <b-form-group label="Patronymic">
                <form-field v-model="form.passport.patronymic" :placeholder="'Enter'"> </form-field>
              </b-form-group>
              <b-form-group label="Nationality">
                <v-select
                  v-model="form.passport.nationality"
                  :options="countryListOptions"
                  :reduce="(data) => data.value"
                >
                </v-select>
              </b-form-group>
              <b-form-group label="Date of issue">
                <date-picker
                  v-model="form.passport.issue_date"
                  value-type="format"
                  format="YYYY-MM-DD"
                  placeholder="Choose date"
                />
              </b-form-group>

              <b-form-group label="Personal number(PIN)">
                <form-field v-model="form.passport.personal_number" :placeholder="'Enter'"> </form-field>
              </b-form-group>
              <b-form-group label="Gender">
                <v-select v-model="form.passport.gender" :options="genderOptions" :reduce="(data) => data.value">
                </v-select>
              </b-form-group>
              <b-form-group label="Date of expiry">
                <date-picker
                  v-model="form.passport.expire_date"
                  value-type="format"
                  format="YYYY-MM-DD"
                  placeholder="Choose date"
                />
              </b-form-group>
              <b-form-group label="Issuing authority">
                <form-field v-model="form.passport.issuing_authority" :placeholder="'Enter'"> </form-field>
              </b-form-group>
            </b-form>
          </div>
        </div>
        <div class="col-4 d-flex flex-column justify-content-between">
          <client-only>
            <Dropzone
              id="passport-dropzone"
              :destroy-dropzone="true"
              :options="dropzoneOptions"
              @vdropzone-thumbnail="handleDropzoneAttach"
            />
          </client-only>

          <button class="btn btn-success align-self-end" @click.prevent="handlePassportFormSubmit">
            Save & Continue
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'

import Dropzone from 'nuxt-dropzone'
import 'nuxt-dropzone/dropzone.css'
export default {
  components: {
    Dropzone,
  },
  data() {
    return {
      genderOptions: [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
      ],
      pending: false,
      form: {
        applicant_id: '',
        passport: {
          file: '',
          first_name: '',
          document_number: '',
          last_name: '',
          patronymic: '',
          nationality: '',
          citizenship: '',
          birth_date: '',
          personal_number: '',
          gender: '',
          issue_date: '',
          expire_date: '',
          issuing_authority: '',
        },
      },
      dropzoneOptions: {
        url: '/api/v1/scanner/scan',
        maxFiles: 1,
        uploadMultiple: false,
        autoProcessQueue: false,
        addRemoveLinks: true,
        previewTemplate: this.template(),
        thumbnailWidth: null,
        thumbnailHeight: null,
        autoDiscover: false,
        dictDefaultMessage: this.message(),
      },
    }
  },
  validations: {
    form: {
      passport: {
        document_number: { required },
      },
    },
  },
  computed: {
    ...mapGetters({
      countryListOptions: 'orders/countryListOptions',
      order: 'orders/orderById',
    }),
  },
  methods: {
    template: function () {
      return '<div style="display:flex !important" class="dz-preview d-flex align-items-center flex-column dz-file-preview">\n  <div class="dz-details">\n  <img data-dz-thumbnail class="img-responsive img-thumbnail_custom" />\n  <div class="dz-filename"><span data-dz-name></span></div>\n    <div class="dz-size" data-dz-size></div>\n<div class="dz-success-mark"><img src="https://img.icons8.com/fluent/48/000000/checkmark.png"/></div>\n  <div class="dz-error-mark"><img src="https://img.icons8.com/fluent/50/000000/no-image.png"/></div>\n  <div class="dz-error-message"><span data-dz-errormessage></span></div>\n</div>'
    },
    message() {
      return '<div class="dropzone-custom-message"><h2>Drag drop passport file here</h2> <span>or</span> <button class="btn">Upload</button> <span>png, jpg ,pdf</span></div>'
    },
    handleDropzoneAttach(file, dataUrl) {
      if (file) {
        this.form.passport.file = dataUrl
        // this.$axios.post('/api/v1/scanner/scan', { passport: dataUrl.blob() }).then((res) => {
        //   console.log(res)
        // })
      }
    },
    async handlePassportFormSubmit() {
      this.form.applicant_id = this.order.applicant.id
      this.$v.$touch()
      if (this.$v.form.$invalid) {
        this.$toast.error('Please fill all required fields')
        return
      }
      this.pending = true
      await this.$store.dispatch('orders/createApplicantPassport', this.form)
      this.pending = false
    },
  },
}
</script>

<style></style>

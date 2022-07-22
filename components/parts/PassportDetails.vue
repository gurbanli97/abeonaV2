<template>
  <div class="passport-details">
    <h3>Applicant passports</h3>
    <div class="passport-details_inner">
      <b-tabs>
        <b-tab
          v-for="passport in applicantPassports"
          :key="passport.id"
          :title="`Passport: ${passport.document_number}`"
        >
          <!-- <button class="btn btn-success ml-auto">---</button> -->
          <div class="row">
            <div class="col-12 d-flex justify-content-center mt-5">
              <a :href="`http://abeonav2.pickvisa.com/${passport.file}`" target="_blank">
                <img :src="`http://abeonav2.pickvisa.com/${passport.file}`" alt="" style="width: 200px" />
              </a>
            </div>
            <div class="col-12 d-flex justify-content-between mb-4 mt-5">
              <detail-field label="Passport number">
                <strong>{{ passport.document_number }}</strong>
              </detail-field>
              <detail-field label="Surname">
                <strong>{{ passport.last_name }}</strong>
              </detail-field>
              <detail-field label="Name">
                <strong>{{ passport.first_name }}</strong>
              </detail-field>
              <detail-field label="Patronymic">
                <strong>{{ passport.patronymic }}</strong>
              </detail-field>
            </div>
            <div class="col-12 d-flex justify-content-between mb-4">
              <detail-field label="Nationality">
                <strong>{{ passport.nationality }}</strong>
              </detail-field>
              <detail-field label="PIN">
                <strong>{{ passport.personal_number }}</strong>
              </detail-field>
              <detail-field label="Date of birth">
                <strong>{{ passport.birth_date }}</strong>
              </detail-field>
              <detail-field label="Date of issue">
                <strong>{{ passport.issue_date }}</strong>
              </detail-field>
            </div>
            <div class="col-12 d-flex justify-content-between">
              <detail-field label="Date of expiry">
                <strong>{{ passport.expire_date }}</strong>
              </detail-field>
              <detail-field label="Issuing authority">
                <strong>{{ passport.issuing_authority }}</strong>
              </detail-field>
              <detail-field label="Gender">
                <strong>{{ passport.gender }}</strong>
              </detail-field>
              <detail-field label="Expired reason">
                <strong>{{ passport.expired_reason }}</strong>
              </detail-field>
            </div>
            <!-- <div class="col-12 passport-upload mt-5 d-flex align-items-center">
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
            </div> -->
          </div>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      applicantPassports: 'orders/applicant_passports',
    }),
  },
}
</script>

<style></style>

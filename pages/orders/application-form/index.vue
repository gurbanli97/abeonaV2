<template>
  <div class="application-form">
    <page-header show-back-button title="Visa application form" />
    <div class="container">
      <div class="application-form_inner">
        <div class="step-indicators">
          <ul>
            <li>
              <div class="step-circle active">
                <span>1</span>
              </div>
              <span>Personal info</span>
            </li>
            <li>
              <div class="step-circle">
                <span>2</span>
              </div>
              <span>Passport details</span>
            </li>
            <li>
              <div class="step-circle">
                <span>3</span>
              </div>
              <span>Travel details</span>
            </li>
          </ul>
        </div>
        <div class="step-forms">
          <Personal v-if="showPersonal" />
          <Passport v-if="showPassport" />
          <Travel v-if="showTravel" />
        </div>

        <div class="actions">
          <button class="btn btn-transparent">Save as draft</button>
          <button class="btn btn-success">Save and continue</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Personal from '@/components/application-form/PersonalInformation.vue'
import Passport from '@/components/application-form/PassportDetails.vue'
import Travel from '@/components/application-form/TravelDetails.vue'
export default {
  components: {
    Personal,
    Passport,
    Travel,
  },
  data() {
    return {
      showPersonal: false,
      showPassport: false,
      showTravel: true,
    }
  },
}
</script>

<style></style>

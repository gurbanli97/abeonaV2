<template>
  <div class="applicant applicant-details">
    <PageHeader title="Applicant details" show-actions show-back-button show-border>
      <template #actions>
        <button class="btn btn-success">Save changes</button>
      </template>
    </PageHeader>
    <div class="container">
      <div class="applicant-details_inner">
        <div class="personal-info">
          <h2>Personal information</h2>
          <div class="form row">
            <div class="col-8 d-flex flex-wrap align-items-center justify-content-between">
              <form-field :placeholder="'Enter'" :label="'Name'" />
              <form-field :placeholder="'Enter'" :label="'Surname'" />
              <form-field :placeholder="'Enter'" :label="'Surname at birth'" />
              <form-field :placeholder="'Enter'" :label="'Middle name'" />
              <form-field :placeholder="'Enter'" :label="'Name'" />
              <b-form-group label="Gender">
                <v-select :close-on-select="true" :clearable="false"> </v-select>
              </b-form-group>
              <b-form-group label="Date of birth">
                <date-picker value-type="format" format="YYYY-MM-DD" />
              </b-form-group>
              <form-field :placeholder="'Enter'" :label="'Place at birth'" />
              <b-form-group label="Citizen of">
                <v-select :close-on-select="true" :clearable="false"> </v-select>
              </b-form-group>
              <b-form-group label="Resident of">
                <v-select :close-on-select="true" :clearable="false"> </v-select>
              </b-form-group>
              <form-field :placeholder="'Enter'" :label="'Father name'" />
              <form-field :placeholder="'Enter'" :label="'Mother name'" />
              <b-form-group label="Marital status">
                <v-select :close-on-select="true" :clearable="false"> </v-select>
              </b-form-group>
              <form-field :placeholder="'Enter'" :label="'Email'" />
              <form-field :placeholder="'Enter'" :label="'Phone'" />
              <form-field :placeholder="'Enter'" :label="'Whatsapp'" />
            </div>
          </div>
        </div>
        <div class="document-info">
          <h2>Addresses & Document info</h2>
          <div class="form row">
            <div class="col-8 d-flex flex-wrap align-items-center justify-content-between">
              <form-field :placeholder="'Enter'" :label="'City'" />
              <form-field :placeholder="'Enter'" :label="'Address'" />
              <form-field :placeholder="'Enter'" :label="'Place of work'" />
              <b-form-group label="Preferred language">
                <v-select :close-on-select="true" :clearable="false"> </v-select>
              </b-form-group>
              <b-form-group label="Arrivel date">
                <date-picker value-type="format" format="YYYY-MM-DD" />
              </b-form-group>
              <b-form-group label="Departure date">
                <date-picker value-type="format" format="YYYY-MM-DD" />
              </b-form-group>
              <b-form-group label="Type of supporting document">
                <v-select :close-on-select="true" :clearable="false"> </v-select>
              </b-form-group>
              <form-field :placeholder="'Enter'" :label="'Supporting document number'" />
              <b-form-group label="Supporting document expire date">
                <date-picker value-type="format" format="YYYY-MM-DD" />
              </b-form-group>
              <b-form-group label="Supporting document from">
                <v-select :close-on-select="true" :clearable="false"> </v-select>
              </b-form-group>
              <form-field :placeholder="'Enter'" :label="'ID number'" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '../../../components/layout/PageHeader.vue'
export default {
  components: { PageHeader },
}
</script>

<style></style>

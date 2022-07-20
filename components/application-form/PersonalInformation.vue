<template>
  <div class="application-form step-1">
    <h2>Personal information</h2>
    <div class="personal-information_form row">
      <div class="col-12 d-flex flex-wrap justify-content-between">
        <b-form-group label="Surname">
          <form-field :placeholder="'Enter'"> </form-field>
        </b-form-group>
        <b-form-group label="Surname at birth">
          <form-field :placeholder="'Enter'"> </form-field>
        </b-form-group>
        <b-form-group label="Name">
          <form-field :placeholder="'Enter'"> </form-field>
        </b-form-group>
        <b-form-group label="Date of birth">
          <date-picker value-type="format" format="YYYY-MM-DD" />
        </b-form-group>
        <b-form-group label="Place at birth">
          <form-field :placeholder="'Enter'"> </form-field>
        </b-form-group>
        <b-form-group label="Country of birth">
          <v-select> </v-select>
        </b-form-group>
        <b-form-group label="Current nationality">
          <v-select> </v-select>
        </b-form-group>
        <b-form-group label="Nationality at birth">
          <v-select> </v-select>
        </b-form-group>
        <b-form-group label="Other country nationality">
          <v-select> </v-select>
        </b-form-group>
        <b-form-group label="Gender">
          <v-select> </v-select>
        </b-form-group>
        <b-form-group label="Marital status">
          <v-select> </v-select>
        </b-form-group>
        <b-form-group label="Are you a minor?">
          <v-select> </v-select>
        </b-form-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>

<template>
  <div>
    <span class="datepicker-label">Date range</span>
    <div class="datepicker-wrap" @click="openDatepicker = !openDatepicker">
      <span v-if="datesValue.length < 2">Enter range date</span>
      <span v-else>{{datesValue[0] + ', ' + datesValue[1]}}</span>
      <icon :name="'calendar'" />
    </div>
    <div class="datepicker" v-if="openDatepicker" v-click-outside="externalClick">
      <v-date-picker range v-model="datesValue" />
    </div>
  </div>
</template>

<script>
  export default {
    name: "DatePicker",
    props: {
      value: []
    },
    data() {
      return {
        openDatepicker: false,
      }
    },
    computed: {
      datesValue: {
        get() {
          return this.value
        },
        set(value) {
          this.$emit('input', value)
        }
      }
    },
    methods: {
      externalClick(event) {
        this.openDatepicker = false
      }
    }
  }

</script>

<style>

</style>

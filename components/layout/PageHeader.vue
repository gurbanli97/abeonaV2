<template>
  <div class="page-header">
    <b-row align-v="center" class="justify-content-between">
      <b-col xl="3" md="6" class="d-flex align-items-center">
        <button class="btn go-back" @click="$router.go(-1)" v-if="showBackButton">
            <icon :name="'arrow-left'"/>
        </button>
        <h1 class="page-title">{{ title }}</h1>
      </b-col>

      <b-col xl="9" md="6" v-if="showActions">
          <div class="d-flex justify-content-end">
              <button class="btn clear-filters" v-if="filtersActive" @click="clearFilters">
                  <icon :name="'eraser-1'"/>
                  <span>Clear filters</span>
              </button>
              <button class="btn open-filters" @click="filtersActive = !filtersActive">
                  <icon :name="'filter-search'"/>
                  <span v-if="filtersLength">Filters({{filtersLength}})</span>
                  <span v-else>Filters</span>
              </button>
             <div class="d-flex justify-content-end open-calendar">
                  <NuxtLink :to="'/consultations/calendar'" class="btn btn-success open-calendar">Calendar</NuxtLink>
             </div>
              <div class="d-flex justify-content-end add-consultation">
                  <NuxtLink :to="'/consultations/add'" class="btn btn-success add-consultation">Add new</NuxtLink>
             </div>
          </div>
      </b-col>
    </b-row>

    <b-row v-show="filtersActive">
        <b-col xl="12">
            <filters/>
        </b-col>
    </b-row>
     <b-row v-show="!filtersActive && filtersLength">
        <b-col xl="3" class="mt-4" v-if="queryFilters.dateFrom">
        <form-field
            disabled
            :placeholder="'Dates'"
            :label="'Dates'"
            :value="`${queryFilters.dateFrom} - ${queryFilters.dateTo}`"
        />
        </b-col>
          <b-col xl="3" class="mt-4" v-if="queryFilters.travelTo">
        <form-field
            disabled
            :placeholder="'Travel to'"
            :label="'Travel to'"
            :value="queryFilters.travelTo"
        />
        </b-col>

         <b-col xl="3" class="mt-4" v-if="queryFilters.status">
        <form-field
            disabled
            :placeholder="'Status'"
            :label="'Status'"
            :value="queryFilters.status"
        />
        </b-col>
         <b-col xl="3" class="mt-4" v-if="queryFilters.specialist">
        <form-field
            disabled
            :placeholder="'Specialist'"
            :label="'Specialist'"
            :value="queryFilters.specialist"
        />
        </b-col>
    </b-row>
  </div>
</template>

<script>
import Filters from '../elements/Filters.vue'
import Icon from '../elements/Icon.vue'
  export default {
  components: { Filters, Icon },
      props: {
          title: String,
          showBackButton:{
              type: Boolean,
              default: false
          },
          showActions: {
              type: Boolean,
              default: false
          }
      },
      data(){
          return {
              filtersActive: false
          }
      },
      computed: {
          queryFilters(){
              return {
                  dateFrom: this.$route.query?.dateFrom || null,
                  dateTo: this.$route.query?.dateTo || null,
                  travelTo: this.$route.query?.travelTo || null,
                  status: this.$route.query.status || null,
                  specialist: this.$route.query.specialist || null
              }
          },
          filtersLength(){
              return  Object.keys(this.$route.query).length
          }
      },
      methods: {
          clearFilters(){
              this.$nuxt.$emit('clearFilters')
          }
      },
  }

</script>

<style>

</style>

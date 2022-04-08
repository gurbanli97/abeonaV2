<template>
  <div :class="['page-header',{'with-border':showBorder}]">
    <b-row align-v="center" class="justify-content-between">
      <b-col class="d-flex align-items-center">
        <button class="btn go-back" @click="$router.go(-1)" v-if="showBackButton">
            <icon :name="'arrow-left'"/>
        </button>
        <h1 class="page-title">{{ title }}</h1>
      </b-col>

      <b-col v-if="showActions" class="d-flex justify-content-end">
          <!-- <button class="btn clear-filters" v-if="filtersActive" @click="clearFilters">
                  <icon :name="'eraser-1'"/>
                  <span>Clear filters</span>
            </button> -->
          <slot>

          </slot>
              <!-- 
              <button class="btn open-filters" @click="filtersActive = !filtersActive">
                  <icon :name="!filtersActive ? 'filter-search' : 'close-circle'"/>
                  <span v-if="!filtersActive">Filters</span>
                  <span v-else>Hide Filters</span>
              </button>
             <div class="d-flex justify-content-end open-calendar">
                  <NuxtLink :to="'/consultations/calendar'" class="btn btn-success open-calendar">Calendar</NuxtLink>
             </div>
              <div class="d-flex justify-content-end add-consultation">
                  <NuxtLink :to="'/consultations/add'" class="btn btn-success add-consultation">Add new</NuxtLink>
             </div> -->
      </b-col>
    </b-row>

    <b-row v-show="filtersActive">
        <b-col xl="12">
            <filters/>
        </b-col>
    </b-row>
     <b-row v-show="!filtersActive && filtersLength">
        <b-col xl="3" class="mt-4" v-if="queryFilters.dateFrom">
        <query-field
            :placeholder="'Dates'"
            :label="'Dates'"
            :inputStyle = "'query-field'"
            :value="`${queryFilters.dateFrom} - ${queryFilters.dateTo}`"
            @delete-filter="test"
           
        />
        </b-col>
          <b-col xl="3" class="mt-4" v-if="queryFilters.travelTo">
        <query-field
            :placeholder="'Travel to'"
            :label="'Travel to'"
            :inputStyle = "'query-field'"
            :value="queryFilters.travelTo"
        />
        </b-col>

         <b-col xl="3" class="mt-4" v-if="queryFilters.status">
        <query-field
            :placeholder="'Status'"
            :label="'Status'"
            :inputStyle = "'query-field'"
            :value="queryFilters.status"
        />
        </b-col>
         <b-col xl="3" class="mt-4" v-if="queryFilters.specialist">
        <query-field
            :placeholder="'Filter'"
            :label="'Specialist'"
            :inputStyle = "'query-field'"
            :value="queryFilters.specialist"
            @delete-filter="test"
        />
        </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
          },
          showBorder:{
               type: Boolean,
               default: false
          }
      },
      computed: {
          ...mapGetters(['filtersActive']),
          queryFilters(){
              return {
                  dateFrom: this.$route.query?.dateFrom || null,
                  dateTo: this.$route.query?.dateTo || null,
                  travelTo: this.$route.query?.travelTo || null,
                  status: this.$route.query.status || null,
                  specialist: this.$route.query.specialist || null,
                  searchInput: this.$route.query.searchInput || null
              }
          },
          filtersLength(){
              return  Object.keys(this.$route.query).length
          }
      },
      methods: {
          clearFilters(){
              this.$nuxt.$emit('clearFilters')
          },
      },
  }

</script>

<style>

</style>

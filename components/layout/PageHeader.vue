<template>
  <div :class="['page-header', { 'with-border': showBorder }]">
    <b-row class="justify-content-between">
      <b-col class="d-flex align-items-center">
        <button v-if="showBackButton" class="btn go-back" @click="$router.go(-1)">
          <Icon :name="'arrow-left'" />
        </button>
        <h1 v-if="!showDetails" class="page-title">{{ title }}</h1>
        <div v-else class="detailed-title">
          <h1 class="page-title">{{ title }}</h1>
          <span>{{ showDetails.country }}</span>
          <span>{{ showDetails.visa_type }}</span>
        </div>
      </b-col>

      <b-col v-if="showActions" class="d-flex justify-content-end align-items-center">
        <slot></slot>
      </b-col>
    </b-row>

    <b-row v-show="filtersActive">
      <b-col xl="12">
        <Filters />
      </b-col>
    </b-row>
    <!-- <b-row v-show="!filtersActive && filtersLength">
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
    </b-row> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Filters from '../elements/Filters.vue'
import Icon from '../elements/Icon.vue'
export default {
  components: { Filters, Icon },
  props: {
    title: {
      type: String,
      default: '',
    },
    showBackButton: {
      type: Boolean,
      default: false,
    },
    showActions: {
      type: Boolean,
      default: false,
    },
    showBorder: {
      type: Boolean,
      default: false,
    },
    showDetails: {
      type: [Object, Boolean],
      default: false,
    },
  },
  computed: {
    ...mapGetters(['filtersActive']),
    queryFilters() {
      return {
        dateFrom: this.$route.query?.dateFrom || null,
        dateTo: this.$route.query?.dateTo || null,
        travelTo: this.$route.query?.travelTo || null,
        status: this.$route.query.status || null,
        specialist: this.$route.query.specialist || null,
        searchInput: this.$route.query.searchInput || null,
      }
    },
    filtersLength() {
      return Object.keys(this.$route.query).length
    },
  },
  methods: {
    clearFilters() {
      this.$nuxt.$emit('clearFilters')
    },
  },
}
</script>

<style></style>

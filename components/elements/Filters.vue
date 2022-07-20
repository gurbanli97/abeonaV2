<template>
  <div class="filters">
    <b-row class="align-items-end">
      <b-col xl="3">
        <b-form-group label="Date range">
          <date-picker
            v-model="dateRange"
            range
            value-type="YYYY-MM-DD"
            type="date"
            placeholder="Enter date range"
            @change="handleChange"
          ></date-picker>
        </b-form-group>
      </b-col>
      <b-col xl="3">
        <b-form-group label="Travel to">
          <v-select
            v-model="filters.travelTo"
            :placeholder="'All'"
            :options="type_options"
            :close-on-select="true"
            :clearable="false"
            :reduce="(data) => data.value"
            @input="handleChange"
          >
          </v-select>
        </b-form-group>
      </b-col>
      <b-col xl="3">
        <b-form-group label="Specialist">
          <v-select
            v-model="filters.specialist"
            :options="type_options"
            :close-on-select="true"
            :clearable="false"
            :reduce="(data) => data.value"
            @input="handleChange"
          >
          </v-select>
        </b-form-group>
      </b-col>
      <b-col xl="3">
        <b-form-group label="Status">
          <v-select
            v-model="filters.status"
            :options="type_options"
            :close-on-select="true"
            :clearable="false"
            :reduce="(data) => data.value"
            @input="handleChange"
          >
          </v-select>
        </b-form-group>
      </b-col>

      <b-col xl="3" class="mt-4">
        <form-field
          v-model.trim="filters.searchInput"
          :placeholder="'Search'"
          :input-style="'search'"
          @input="handleChange"
        >
        </form-field>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dateRange: [],
      filters: {
        searchInput: '',
        travelTo: '',
        specialist: '',
        status: '',
      },
      type_options: [
        { label: 'String', value: 'string' },
        { label: 'Boolean', value: 'bool' },
        { label: 'Select', value: 'select' },
      ],
    }
  },
  watch: {
    // '$route.query'(query) {},
  },
  created() {
    this.$nuxt.$on('clear-filters', () => {
      this.dateRange = []
      this.filters.travelTo = ''
      this.filters.specialist = ''
      this.filters.status = ''
      this.filters.searchInput = ''

      this.$router.push({
        query: {},
      })
    })
  },
  beforeDestroy() {
    this.$nuxt.$off('clear-filters')
  },
  methods: {
    handleChange() {
      this.$nextTick(() => {
        if (this.dateRange.length) {
          this.$router.push({
            query: {
              dateFrom: this.dateRange[0],
              dateTo: this.dateRange[1],
              ...this.$mapObjectToQuery(this.filters),
            },
          })
        } else {
          this.$router.push({
            query: {
              ...this.$mapObjectToQuery(this.filters),
            },
          })
        }
      })
    },
  },
}
</script>

<style></style>

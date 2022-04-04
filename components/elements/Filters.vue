<template>
    <div class="filters">
            <b-row class="align-items-end">
                <b-col xl="3">
                    <b-form-group label="Date range">
                         <date-picker
                          range 
                          value-type="YYYY-MM-DD"
                          type="date" 
                          placeholder="Enter date range"
                          v-model="dateRange"
                          @change="handleChange"
                         ></date-picker>
                    </b-form-group>
                </b-col>
                <b-col xl="3">
                    <b-form-group label="Travel to">
                         <v-select
                        :placeholder="'All'"
                        :options="type_options"
                        :closeOnSelect="true"
                        :clearable="false"
                        :reduce="data => data.value"
                        v-model="filters.travelTo"
                        @input="handleChange"
                        >
                        </v-select>
                    </b-form-group>
                </b-col>
                <b-col xl="3">
                    <b-form-group label="Specialist">
                         <v-select
                        :options="type_options"
                        :closeOnSelect="true"
                        :clearable="false"
                        :reduce="data => data.value"
                        v-model="filters.specialist"
                        @input="handleChange"
                        >
                        </v-select>
                    </b-form-group>
                </b-col>
                <b-col xl="3">
                    <b-form-group label="Status">
                         <v-select
                        :options="type_options"
                        :closeOnSelect="true"
                        :clearable="false"
                        :reduce="data => data.value"
                        v-model="filters.status"
                        @input="handleChange"
                        >
                        </v-select>
                    </b-form-group>
                </b-col>

                <b-col xl="3" class="mt-4">
                    <form-field
                        :placeholder= "'Search'"
                        :inputStyle="'search'"
                        @input="handleChange"
                        v-model.trim="filters.searchInput"
                    >
                    </form-field>
                </b-col>
            </b-row>
    </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'

export default {
  components: { DatePicker },
    data(){
        return {    
        dateRange:[], 
        filters: {
            searchInput: '',
            travelTo: '',
            specialist: '',
            status: '',
        },
        type_options: [
                { label: "String", value: "string" },
                { label: "Boolean", value: "bool" },
                { label: "Select", value: "select" },
            ],
        }
    },
    watch: {
        '$route.query'(query){
        }
    },
    methods:{
        handleChange(){
             this.$nextTick(() => {
                 if(this.dateRange.length){
                     this.$router.push({
                     query: {
                        dateFrom: this.dateRange[0],
                        dateTo: this.dateRange[1],
                        ...this.$mapObjectToQuery(this.filters)
                     }
                });
            }else {
                 this.$router.push({
                     query: {
                        ...this.$mapObjectToQuery(this.filters)
                     }
                });
            }
                
            });
        }
    },
    created() {
        this.$nuxt.$on('clearFilters',() => {
            this.dateRange = []
            this.filters.travelTo = ''
            this.filters.specialist = ''
            this.filters.status = ''
            this.filters.searchInput = ''

            this.$router.push({
                query: {}
            });
        })
    },
    beforeDestroy(){
        this.$nuxt.$off('clearFilters')
    }

}
</script>

<style>

</style>
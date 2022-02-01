<template>
    <div class="filters">
            <b-row class="align-items-end">
                <b-col xl="3">
                    <b-form-group label="Date range">
                         <date-picker
                          range type="date" 
                          placeholder="Enter date range"
                          v-model="value1"
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
                        >
                        </v-select>
                    </b-form-group>
                </b-col>

                <b-col xl="3" class="mt-4">
                    <form-field
                        :placeholder="'Search'"
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
            value1: [],
  
        type_options: [
                { label: "String", value: "string" },
                { label: "Boolean", value: "bool" },
                { label: "Select", value: "select" },
            ],
            // dates: []
        }
    },
    created() {
        this.$nuxt.$on('clearFilters',() => {
            this.dates = []
        })
    },
    beforeDestroy(){
        this.$nuxt.$off('clearFilters')
    }

}
</script>

<style>

</style>
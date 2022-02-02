<template>
  <div class="profile">
      <page-header :title="'Orxan Anvarli'" :showActions="false"/>
      <div class="container">
        <div class="profile-inner">
            <b-tabs>
                <b-tab title="Profile" active>
                    <b-row>
                        <b-col xl="3">
                            <div class="profile-photo">
                                <div class="photo-wrap">
                                    <img src="~images/qarpiz.jpg" alt="">
                                </div>
                                <button class="btn btn-transparent">Change Photo</button>
                                <button class="btn btn-borderless">Delete Photo</button>
                            </div>
                        </b-col>
                        <b-col xl="9" class="d-flex flex-column">
                            <b-form class="d-flex">
                                <b-col xl="6" class="d-flex flex-column align-items-end">
                                   <b-form-group>
                                <form-field
                                :placeholder="'Enter'"
                                :label="'Name'"
                                />
                            </b-form-group>
                            <b-form-group>
                                <form-field
                                :placeholder="'+'"
                                :label="'Phone'"
                                />
                            </b-form-group>
                            <b-form-group>
                                <form-field
                                :placeholder="'Enter'"
                                :label="'Position'"
                                />
                            </b-form-group>

                            <b-form-group label="Language">
                                   <v-select
                                    :closeOnSelect="true"
                                    :clearable="false"
                                    >
                                    </v-select>
                            </b-form-group>
                            </b-col>
                            <b-col xl="6">
                                <b-form-group>
                                <form-field
                                :placeholder="'Enter'"
                                :label="'Surname'"
                                />
                            </b-form-group>
                            <b-form-group>
                                <form-field
                                :placeholder="'Enter'"
                                :label="'Email'"
                                />
                            </b-form-group>

                            <b-form-group label="Birth date">
                                    <date-picker
                                    value-type="format" 
                                    format="YYYY-MM-DD" 
                                    placeholder="Choose date"
                                    v-model="birthDate"
                                    />
                            </b-form-group>
                            </b-col>
                            </b-form>

                            <button class="btn btn-success">Save changes</button>
                        </b-col>
                        
                    </b-row>
                </b-tab>
                <b-tab title="Activity"><p>I'm the second tab</p></b-tab>
                <b-tab title="Projects"><p>I'm a disabled tab!</p></b-tab>
                <b-tab title="Tasks"><p>I'm a disabled tab!</p></b-tab>
                <b-tab title="Files"><p>I'm a disabled tab!</p></b-tab>
            </b-tabs>
        </div>
      </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
export default {
  components: { DatePicker },
  name: 'Profile',
  data(){
      return {
          birthDate: ''
      }
  }
}
</script>

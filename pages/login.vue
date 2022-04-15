<template>
  <div class="login">
    <div class="login-inner">
          <div class="login-box">
            <div class="login-box_left">
                <h2>Log in</h2>
                <span>Welcome to Abeona</span>
                <b-form  @submit.prevent="handleSubmit">
                    <b-form-group>
                        <form-field 
                        :placeholder="'Enter'" 
                        :label="'Username'"
                         :is-invalid="$v.form.username.$error"
                         v-model="form.username"
                        >
                         <b-form-invalid-feedback v-if="!$v.form.username.required">
                         Username input cant be empty
                        </b-form-invalid-feedback>
                        </form-field>
                       
                    </b-form-group>
                    <b-form-group :label="'Password'" :class="['password-input',{'is-invalid':$v.form.password.$error}]">
                        <span @mousedown="showPassword = !showPassword" @mouseup="showPassword = !showPassword" @mouseleave="showPassword = false" v-show="form.password">
                            <icon :name="showPassword ? 'eye-slash' : 'eye'" />
                        </span>
                        <b-form-input
                        autocomplete="off"
                        :type="passwordInputType"
                        :placeholder="'Enter'"
                        :class="{'is-invalid':$v.form.password.$error}"
                        v-model="form.password"
                        />
                        <b-form-invalid-feedback v-if="!$v.form.password.required">
                         Password input cant be empty
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <button class="btn" type="submit" >Log in</button>
                </b-form>
            </div>
            <div class="login-box_right">
                <div class="right-small">
                    <img src="~images/logo.svg" alt="">
                    <h3>Best works waiting for you</h3>

                    <div class="icon-wrapper lock">
                        <icon :name="'lock'"/>
                    </div>
                     <div class="icon-wrapper sms">
                        <icon :name="'sms'"/>
                    </div>
                </div>

                <span> 
                    <icon :name="'copyright'"/>
                    All rights reserved
                </span>
            </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
    layout: 'empty',
    data(){
        return {
            showPassword: false,
            form:{
                username: '',
                password: ''
            }
        }
    },
    validations:{
        form:{
            username: {required},
            password: {required}
        }

    },
    computed:{
        passwordInputType(){
            return this.showPassword ? 'text' : 'password'
        }
    },
    methods:{
        async handleSubmit(){
            this.$v.form.$touch();

            if (this.$v.$invalid)
                return
            
            try{
                this.$cookies.removeAll()
                 await this.$auth.loginWith('local',{
                    data: {
                        password: this.form.password,
                        username: this.form.username
                    }
                    
                })

            }catch(err){
                this.$toast.error('Unable to log in with provided credentials')

            }
              
        }
    }
}
</script>

<style>

</style>
<template>
  <div class="login">
    <div class="login-inner">
          <div class="login-box">
            <div class="login-box_left">
                <h2>Log in</h2>
                <span>Welcome to Abeona</span>
                <b-form>
                    <b-form-group>
                        <form-field :placeholder="'Enter'" :label="'Username'" />
                    </b-form-group>
                    <b-form-group :label="'Password'" class="password-input">
                        <span @mousedown="showPassword = !showPassword" @mouseup="showPassword = !showPassword" @mouseleave="showPassword = false">
                            <icon :name="showPassword ? 'eye-slash' : 'eye'" />
                        </span>
                        <b-form-input
                        autocomplete="off"
                        :type="passwordInputType"
                        :placeholder="'Enter'"
                        />
                    </b-form-group>
                    <button class="btn">Log in</button>
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
export default {
    data(){
        return {
            showPassword: false
        }
    },
    computed:{
        passwordInputType(){
            return this.showPassword ? 'text' : 'password'
        }
    }
}
</script>

<style>

</style>
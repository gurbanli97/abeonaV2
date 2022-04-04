<template>
  <div class="notifications notification_id">
      <page-header :title="'Notifications'"/>
      <div class="container">
           <div class="notifications-inner">
                      <div class="notification-card" :key="notification.id">
                          <div class="notification-card_head">
                            <div class="user-info">
                               <button class="btn go-back" @click="$router.go(-1)">
                                <icon :name="'arrow-left'"/>
                              </button>
                                <img src="~images/qarpiz.jpg" alt="">
                                <strong>{{notification.username}}</strong>
                            </div>
                              <div class="datetime">
                                 <span class="notification-date mr-3">{{ notification.date}}</span>
                                 <span>{{notification.timestamp}}</span>
                              </div>
                          </div>
                          <div class="notification-card_body">
                              <p>{{notification.description}}</p>
                          </div>
                </div>
          </div>
      </div>
  </div>
</template>



<script>
import { mapGetters } from 'vuex' 
export default {
    name: 'ItemById',
    data(){
      return {
        notification: {
            id:0,
            username: 'Orxan Anvarli',
            date: '09.02.2022',
            timestamp: '4:10 pm',
            description: 'In volutpat, augue at convallis eleifend neque cras duis amet. Diam quisque tortor pharetra, vitae. Ultricies lacinia vestitae neque volutpat pellentesque nunc. Aenean est elit dictumst potenti dui. Convallis auctor gravida id.',
            read: false
        },
      }
    },
    computed: {
      // item(){
      //   return this.$store.getters.getItemById(this.$route.params.id)
      // }
    //   ...mapGetters(['getItemById']),

    //   itemById(){
    //     return this.getItemById(this.$route.params.id)
    //   }
    },
  //  async fetch() {
  //   await this.$store.dispatch("getItems")
  // },
}
</script>

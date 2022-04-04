<template>
  <div class="notifications">
      <page-header :title="'Notifications'" :showActions="true"/>
      <div class="container">
          <div class="notifications-inner">
              <div class="notifications-today">
                  <span class="notification-date">Today</span>
                      <div class="notification-card" 
                  v-for="notification in notifications" 
                  :key="notification.id"
                  >
                 <NuxtLink :to="`/notifications/${notification.id}`">
                          <div class="notification-card_head">
                            <div class="user-info">
                                <span class="unread-dot" v-if="!notification.read"></span>
                                <img src="~images/qarpiz.jpg" alt="">
                                <strong>{{notification.username}}</strong>
                            </div>
                              <span>{{notification.timestamp}}</span>
                          </div>
                          <div class="notification-card_body">
                              <p>{{notification.description}}</p>
                          </div>
                 </NuxtLink>

                  </div>
              </div>
              <!-- <div 
              class="notifications-others"
              v-for="notification in notifications" 
              :key="notification.id"
              >
              <NuxtLink :to="`/notifications/${notification.id}`">
                  <span class="notification-date">{{notification.date}}</span>
                  <div class="notification-card">
                      <span class="unread-dot" v-if="!notification.read"></span>
                      <div class="avatar">
                          <img src="~images/qarpiz.jpg" alt="">
                      </div>
                      <div class="details">
                          <div class="details-head">
                              <strong>{{notification.username}}</strong>
                              <span>{{notification.timestamp}}</span>
                          </div>
                          <div class="details-text">
                              <p>{{notification.description}}</p>
                          </div>
                      </div>
                  </div>
                  </NuxtLink>
              </div> -->
          </div>
      </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
     head() {
         return {
             title: 'Notifications',
         }
  },
    data() {
        return {
            items: [],
            notifications: [
                {
                    id:0,
                    username: 'Orxan Anvarli',
                    date: '09.02.2022',
                    timestamp: '4:10 pm',
                    description: 'Gravida nibh id egestas nibh proin. Eget justo tortor viverra pharetra laoreet consequat ac lorem egestas. In velit, vulputate ut pharetra nisl. Arcu eu egestas phasellus dignissim elit ac. Felis enim suspendisse aenean',
                    read: false
                },
                {
                    id:1,
                    username: 'Orxan Anvarli',
                    date: '09.02.2022',
                    timestamp: '4:10 pm',
                    description: 'Gravida nibh id egestas nibh proin. Eget justo tortor viverra pharetra laoreet consequat ac lorem egestas. In velit, vulputate ut pharetra nisl. Arcu eu egestas phasellus dignissim elit ac. Felis enim suspendisse aenean',
                    read: false
                }
            ]
        }
    },
    computed:{
        // ...mapGetters({
        //     items: 'notifications/notifications'
        // })
    },
    async asyncData({store}){
        await store.dispatch('notifications/fetchNotifications')
    }
}
</script>

<style>

</style>
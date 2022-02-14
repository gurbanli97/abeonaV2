<template>
  <div class="sidebar" :class="{'sidebar-active': sidebarIsActive}">
          <div class="sidebar-inner">
            <div class="sb-collapse-btn" @click="toggleSidebar">
                <i class="icon-menu"></i>
            </div>
            <div class="logo">
                 <NuxtLink :to="'/'" >
                     <img src="~images/logo.svg" alt="" v-if="sidebarIsActive">
                     <img src="~images/logo-icon.svg" alt="" v-else>
                 </NuxtLink>
            </div>
            <nav>
                <ul class="menu">
                    <li v-for="menu in navItems" :key="menu.title" v-b-tooltip.hover :id="`tooltip-target-${menu.id}`">
                        <NuxtLink :to="menu.route" exact v-if="sidebarIsActive">
                            <icon :name="menu.icon"/>
                            {{menu.title}}
                        </NuxtLink>
                        <NuxtLink :to="menu.route" exact v-else>
                            <b-tooltip :customClass="'nav-tooltip'" :target="`tooltip-target-${menu.id}`" triggers="hover" placement="right">
                                {{menu.title}}
                             </b-tooltip>
                            <icon :name="menu.icon"/>
                        </NuxtLink>
                    </li>

                    <li class="darkmode">
                        <a class="nav-darkmode titled"  v-if="sidebarIsActive">
                            <icon :name="'moon'"/>
                            Darkmode

                            <label class="switch">
                                <input type="checkbox" v-model="darkmode">
                                <span class="slider round"></span>
                            </label>
                        </a>
                         <a class="nav-darkmode no-title" href="#" v-else v-b-tooltip.hover id="tooltip-target-darkmode">
                              <b-tooltip :customClass="'nav-tooltip'" target="tooltip-target-darkmode" triggers="hover" placement="right">
                                Darkmode
                             </b-tooltip>
                            <icon :name="'moon'"/>
                        </a>
                    </li>
                </ul>
            </nav>

            <div class="sidebar-communication" :class="{'sidebar-active': sidebarIsActive}">
                <div class="messages">
                    <icon :name="'message'"/>
                </div>
                <div class="sidebar-notifications">
                    <button v-b-tooltip.click.blur  id="tooltip-target-notifications">
                        <icon :name="'notification'"/>
                    </button>
                     <b-tooltip :customClass="'notification-tooltip'" target="tooltip-target-notifications" triggers="click blur" placement="right" ref="notificationTooltip">
                            <div class="notification-modal">
                            <div class="modal-header">
                                <strong>7 new notification</strong>
                                <button>Mark all as read</button>
                            </div>
                            <div class="modal-body-wrap">
                                <div class="modal-body" v-for="item in notifications" :key="item.id">
                                    <NuxtLink to="/">
                                        <div class="modal-item">
                                            <div class="avatar">
                                                <img src="~images/qarpiz.jpg" alt="">
                                            </div>
                                            <div class="info">
                                                <div class="title">
                                                    <strong>{{item.username}}</strong>
                                                    <span>{{item.action}}</span>
                                                </div>
                                                <div class="timestamp">
                                                    <span>{{item.timestamp}}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </NuxtLink>
                                </div>
                            </div>
                            <button @click='closeNotyTooltip' id="see-all">SEE ALL NOTIFICATIONS</button>
                        </div>
                    </b-tooltip>
                </div>
            </div>

            <div class="sidebar-profile" :class="{'sidebar-active': sidebarIsActive}">
               <NuxtLink to="/profile">
                    <div class="profile-info">
                        <div class="profile-avatar">
                            <img src="~images/qarpiz.jpg" alt="">
                        </div>
                    <div class="profile-name" v-if="sidebarIsActive">
                        <strong>Orxan</strong>
                        <span>Consultant</span>
                    </div>
                </div>
               </NuxtLink>
                <div class="logout" v-if="sidebarIsActive">
                    <icon :name="'logout-1'"/>
                </div>
            </div>
          </div>
  </div>
</template>


<script>
import { MenuMixin } from '~/mixins/menu-data';
import { mapState } from 'vuex'


export default {
    mixins: [MenuMixin],
    data() {
        return {
            darkmode: false,
            notificationsActive: false,
            notifications: [
                {
                    id: 0,avatar: 'images/qarpiz.jpg',username: 'Aysel Huseynova',action: 'assigned new task to you',timestamp: '4:10 pm'
                },
                {
                    id: 1,avatar: 'images/qarpiz.jpg',username: 'Aysel Huseynova',action: 'message you',timestamp: '4:10 pm'
                },
                {
                    id: 2,avatar: 'images/qarpiz.jpg',username: 'Aysel Huseynova',action: 'completed task',timestamp: '4:10 pm'
                },
                 {
                    id: 3,avatar: 'images/qarpiz.jpg',username: 'Aysel Huseynova',action: 'completed task',timestamp: '4:10 pm'
                },
                 {
                    id: 4,avatar: 'images/qarpiz.jpg',username: 'Aysel Huseynova',action: 'completed task',timestamp: '4:10 pm'
                }
            ]
        }
    },
    computed: {
        ...mapState(['sidebarIsActive'])
    },
    methods: {
        toggleSidebar() {
            this.$store.commit('TOGGLE_SIDEBAR')
        },
        closeNotyTooltip(){
             this.$refs.notificationTooltip.$emit('close')
             
             this.$router.push('/notifications')
        }
    //     handleDocClick(event) { 
    //     if(this.notificationsActive === false) {
    //       return
    //     }
        
    //     let clickedActionBtn = event.target.classList.contains('icon-notification');
    //     let clickedActionBlock = event.target.parentNode.classList.contains('notifications');
    //     let clickedActionModal = event.target.parentNode.classList.contains('notification-modal');
        
    //     if(!clickedActionBtn && !clickedActionBlock && !clickedActionModal) {
    //       this.notificationsActive = false;
    //     }
    //   }
    },
//     mounted() {
//     document.addEventListener('click', this.handleDocClick);
//   },
//   beforeDestroy() {
//     document.removeEventListener('click', this.handleDocClick);
//   },
}
</script>

<style>

</style>
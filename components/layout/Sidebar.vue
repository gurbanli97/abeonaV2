<template>
  <div class="sidebar" :class="{ 'sidebar-active': sidebarIsActive }">
    <div class="sidebar-inner">
      <div class="sb-collapse-btn" @click="toggleSidebar">
        <i class="icon-menu"></i>
      </div>
      <div class="logo">
        <NuxtLink :to="'/'">
          <img v-if="sidebarIsActive" src="~images/logo.svg" alt="" />
          <img v-else src="~images/logo-icon.svg" alt="" />
        </NuxtLink>
      </div>
      <nav>
        <ul class="menu">
          <li v-for="menu in navItems" :id="`tooltip-target-${menu.id}`" :key="menu.title" v-b-tooltip.hover>
            <NuxtLink v-if="sidebarIsActive" :to="localePath(menu.route)" :exact="menu.route === '/'">
              <icon :name="menu.icon" />
              {{ menu.title }}
            </NuxtLink>
            <NuxtLink v-else :to="menu.route" :exact="menu.route === '/'">
              <b-tooltip
                :custom-class="'nav-tooltip'"
                :target="`tooltip-target-${menu.id}`"
                triggers="hover"
                placement="right"
              >
                {{ menu.title }}
              </b-tooltip>
              <icon :name="menu.icon" />
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <!-- <div class="locales d-flex justify-content-evenly mt-4">
                <button class="btn btn-success" @click="$i18n.setLocale('en')">EN</button>
                <button class="btn btn-success" @click="$i18n.setLocale('ru')">RU</button>
                <button class="btn btn-success" @click="$i18n.setLocale('az')">AZ</button>
            </div> -->
      <div class="sidebar-communication" :class="{ 'sidebar-active': sidebarIsActive }">
        <div class="messages">
          <icon :name="'message'" />
        </div>
        <div class="sidebar-notifications">
          <button id="tooltip-target-notifications" v-b-tooltip.click.blur>
            <icon :name="'notification'" />
          </button>
          <b-tooltip
            ref="notificationTooltip"
            :custom-class="'notification-tooltip'"
            target="tooltip-target-notifications"
            triggers="click blur"
            placement="right"
          >
            <div class="notification-modal">
              <div class="modal-header">
                <strong>7 new notification</strong>
                <button>Mark all as read</button>
              </div>
              <div class="modal-body-wrap">
                <div v-for="item in notifications" :key="item.id" class="modal-body">
                  <NuxtLink to="/">
                    <div class="modal-item">
                      <div class="avatar">
                        <img src="~images/qarpiz.jpg" alt="" />
                      </div>
                      <div class="info">
                        <div class="title">
                          <strong>{{ item.username }}</strong>
                          <span>{{ item.action }}</span>
                        </div>
                        <div class="timestamp">
                          <span>{{ item.timestamp }}</span>
                        </div>
                      </div>
                    </div>
                  </NuxtLink>
                </div>
              </div>
              <button id="see-all" @click="closeNotyTooltip">SEE ALL NOTIFICATIONS</button>
            </div>
          </b-tooltip>
        </div>
      </div>

      <div class="sidebar-profile" :class="{ 'sidebar-active': sidebarIsActive }">
        <NuxtLink to="/profile">
          <div class="profile-info">
            <div class="profile-avatar">
              <img src="~images/qarpiz.jpg" alt="" />
            </div>
            <div v-if="sidebarIsActive" class="profile-name">
              <strong>Orxan</strong>
              <span>Consultant</span>
            </div>
          </div>
        </NuxtLink>
        <div v-if="sidebarIsActive" class="logout">
          <span @click="handleLogout"><icon :name="'logout-1'" /></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MenuMixin } from '~/mixins/menu-data'
import { mapGetters } from 'vuex'

export default {
  mixins: [MenuMixin],
  data() {
    return {
      darkmode: false,
      notificationsActive: false,
      notifications: [
        {
          id: 0,
          avatar: 'images/qarpiz.jpg',
          username: 'Aysel Huseynova',
          action: 'assigned new task to you',
          timestamp: '4:10 pm',
        },
        {
          id: 1,
          avatar: 'images/qarpiz.jpg',
          username: 'Aysel Huseynova',
          action: 'message you',
          timestamp: '4:10 pm',
        },
        {
          id: 2,
          avatar: 'images/qarpiz.jpg',
          username: 'Aysel Huseynova',
          action: 'completed task',
          timestamp: '4:10 pm',
        },
        {
          id: 3,
          avatar: 'images/qarpiz.jpg',
          username: 'Aysel Huseynova',
          action: 'completed task',
          timestamp: '4:10 pm',
        },
        {
          id: 4,
          avatar: 'images/qarpiz.jpg',
          username: 'Aysel Huseynova',
          action: 'completed task',
          timestamp: '4:10 pm',
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['sidebarIsActive']),
  },
  methods: {
    toggleSidebar() {
      this.$store.commit('TOGGLE_SIDEBAR')
    },
    closeNotyTooltip() {
      this.$refs.notificationTooltip.$emit('close')
      this.$router.push('/notifications')
    },
    async handleLogout() {
      await this.$auth.logout()
    },
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

<style></style>

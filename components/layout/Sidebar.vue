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
                    <li v-for="menu in navItems" :key="menu.title">
                        <NuxtLink :to="menu.route" exact v-if="sidebarIsActive">
                            <icon :name="menu.icon"/>
                            {{menu.title}}
                        </NuxtLink>
                        <NuxtLink :to="menu.route" exact v-else>
                            <div class="link-tooltip">
                                {{menu.title}}
                            </div>
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
                         <a class="nav-darkmode no-title" href="#" v-else>
                              <div class="link-tooltip">
                                Darkmode
                            </div>
                            <icon :name="'moon'"/>
                        </a>
                    </li>
                </ul>
            </nav>

            <div class="sidebar-communication" :class="{'sidebar-active': sidebarIsActive}">
                <div class="messages">
                    <icon :name="'message'"/>
                </div>
                <div class="notifications">
                    <icon :name="'notification'"/>
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
import Icon from '../elements/Icon.vue';

export default {
  components: { Icon },
    mixins: [MenuMixin],
    data() {
        return {
            darkmode: false
        }
    },
    computed: {
        ...mapState(['sidebarIsActive'])
    },
    methods: {
        toggleSidebar() {
            this.$store.commit('TOGGLE_SIDEBAR')
        },
    }
}
</script>

<style>

</style>
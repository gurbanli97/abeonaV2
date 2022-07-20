<template>
  <div class="root">
    <Sidebar />
    <section class="page" :class="{ 'sidebar-active': sidebarIsActive }">
      <nuxt keep-alive />
    </section>
  </div>
</template>

<script>
import Sidebar from '../components/layout/Sidebar.vue'
import { mapState } from 'vuex'

export default {
  name: 'DefaultLayout',
  components: { Sidebar },
  middleware: 'auth',
  computed: {
    ...mapState(['sidebarIsActive']),
  },
}
</script>

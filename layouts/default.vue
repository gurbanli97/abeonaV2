<template>
  <div class="root">
      <Sidebar/>
      <section class="page" :class="{'sidebar-active':sidebarIsActive}">
            <nuxt keep-alive />
      </section>
  </div>
</template>

<script>
import Sidebar from '../components/layout/Sidebar.vue'
import { mapState} from 'vuex'

export default {
  components: { Sidebar },
  name: "DefaultLayout",
   computed: {
        ...mapState(['sidebarIsActive'])
  },
}
</script>

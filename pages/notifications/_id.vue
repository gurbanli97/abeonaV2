<template>
  <div class="notifications_id">
      <page-header :title="'Notifications'"/>
      <div class="container">

      </div>
  </div>
</template>



<script>
import { mapGetters } from 'vuex' 
export default {
    name: 'ItemById',
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

<template>
  <div class="consultations">
      <page-header :title="'Consultations'" :showActions="true"/>
    <div class="container">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      fields: ['Customer','Date & Time','Travel to','Specialist','Status'],
      activeAction: null,
      showDeleteModal: false,
      itemToDelete: null
    }
  },
  computed: {
    ...mapGetters({
      consultations: 'consultations/consultations'
    }),
  },
  methods: {
    toggleActions(item){
        this.activeAction = item.id
    },
    handleDocClick(event) {
        if(this.activeAction === null) {
          return
        }
        let clickedActionBtn = event.target.classList.contains('icon-more');
        let clickedActionBlock = event.target.classList.contains('table-actions');
        
        if(!clickedActionBtn && !clickedActionBlock) {
          this.activeAction = null;
        }
      },
      openModal(item){
        this.showDeleteModal = true,
        this.itemToDelete = item
      },
    handleDelete(item){
      console.log('id:',item)
    }
  },
  mounted() {
    this.$nuxt.$on('modal-delete-click', this.handleDelete);
    document.addEventListener('click', this.handleDocClick);
  },
  beforeDestroy() {
    this.$nuxt.$off('modal-delete-click', this.handleDelete);
    document.removeEventListener('click', this.handleDocClick);
  },
  async asyncData({store}){
    await store.dispatch('consultations/fetchConsultations')
  }
}
</script>

<style>

</style>
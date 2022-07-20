export const TableActionsMixin = {
  data() {
    return {
      activeAction: null,
      showDeleteModal: false,
      itemToDelete: null,
    }
  },
  methods: {
    toggleActions(item) {
      this.activeAction = item.id
    },
    handleDocClick(event) {
      if (this.activeAction === null) {
        return
      }
      let clickedActionBtn = event.target.classList.contains('icon-more')
      let clickedActionBlock = event.target.classList.contains('table-actions')

      if (!clickedActionBtn && !clickedActionBlock) {
        this.activeAction = null
      }
    },
    openModal(item) {
      ;(this.showDeleteModal = true), (this.itemToDelete = item)
    },
    handleDelete(item) {
      console.log('id:', item)
    },
    mounted() {
      this.$nuxt.$on('modal-delete-click', this.handleDelete)
      document.addEventListener('click', this.handleDocClick)
    },
    beforeDestroy() {
      this.$nuxt.$off('modal-delete-click', this.handleDelete)
      document.removeEventListener('click', this.handleDocClick)
    },
  },
}

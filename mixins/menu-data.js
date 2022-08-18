export const MenuMixin = {
  computed: {
    navItems() {
      return [
        { id: 0, title: this.$t('Dashboard'), route: '/', icon: 'grid-7' },
        { id: 1, title: this.$t('Consultations'), route: '/consultations', icon: 'document' },
        { id: 2, title: this.$t('Orders'), route: '/orders', icon: 'menu-1' },
        { id: 3, title: this.$t('Billing'), route: '/billing', icon: 'wallet-2' },
        { id: 4, title: this.$t('Insure'), route: '/insure', icon: 'document-text' },
        { id: 5, title: this.$t('Clients'), route: '/clients', icon: 'people' },
        { id: 6, title: 'Apllicants', route: '/applicants', icon: 'tag-user' },
      ]
    },
  },
}

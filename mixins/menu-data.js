export const MenuMixin = {
  computed: {
    navItems() {
      return [
        { id: 0, title: 'Dashboard', route: '/', icon: 'grid-7' },
        { id: 1, title: 'Consultations', route: '/consultations', icon: 'document' },
        { id: 2, title: 'Orders', route: '/orders', icon: 'menu-1' },
        { id: 3, title: 'Billing', route: '/billing', icon: 'wallet-2' },
        { id: 4, title: 'Insure', route: '/insure', icon: 'document-text' },
        { id: 5, title: 'Clients', route: '/clients', icon: 'people' },
        { id: 6, title: 'Apllicants', route: '/applicants', icon: 'tag-user' },
      ]
    },
  },
}

export const MenuMixin = {
    computed: {
        navItems(){
            return [
                {id:0,title: this.$t('dashboard'),route: '/',icon: 'grid-7'},
                {id:1,title: this.$t('consultations'),route: '/consultations',icon: 'document'},
                {id:2,title: this.$t('orders'),route: '/orders',icon: 'menu-1'},
                {id:3,title: this.$t('billing'),route: '/billing',icon: 'wallet-2'},
                {id:4,title: this.$t('insure'),route: '/insure',icon: 'document-text'},
                {id:5,title: this.$t('clients'),route: '/clients',icon: 'people'},
            ]
        }
    }
}
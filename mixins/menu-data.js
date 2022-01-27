export const MenuMixin = {
    computed: {
        navItems(){
            return [
                {title: 'Dashboard',route: '/',icon: 'grid-7'},
                {title: 'Consultations',route: '/consultations',icon: 'document'},
                {title: 'Orders',route: '/orders',icon: 'menu-1'},
                {title: 'Billing',route: '/billing',icon: 'wallet-2'},
                {title: 'Insure',route: '/insure',icon: 'document-text'},
                {title: 'Customers',route: '/customers',icon: 'people'},
            ]
        }
    }
}
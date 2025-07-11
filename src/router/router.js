import { createRouter, createWebHashHistory } from 'vue-router';
import IncomesPage from '../pages/IncomesPage.vue'
import OrdersPage from '../pages/OrdersPage.vue';
import SalesPage from '../pages/SalesPage.vue';
import StocksPage from '../pages/StocksPage.vue';

const router = createRouter({
    routes: [
        {
            path: '/incomes',
            name: 'incomes',
            component: IncomesPage
        },
        {
            path: '/orders',
            name: 'orders',
            component: OrdersPage
        },
        {
            path: '/sales',
            name: 'sales',
            component: SalesPage
        },
        {
            path: '/stocks',
            name: 'stocks',
            component: StocksPage
        },
        
    ],
    history: createWebHashHistory()
})



export default router;
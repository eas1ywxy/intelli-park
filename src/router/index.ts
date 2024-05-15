import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/ChargingPage'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/ChargingPage'
      },
      {
        path: 'ChargingPage',
        component: () => import('@/views/ChargingPage.vue')
      },
      {
        path: 'PersonPage',
        component: () => import('@/views/PersonPage.vue')
      },
      {
        path: 'PrivatePage',
        component: () => import('@/views/PrivatePage.vue')
      },
      {
        path: 'StationPage',
        component: () => import('@/views/StationPage.vue')
      },
      {
        path: 'OrderPage',
        component: () => import('@/views/OrderPage.vue')
      },
      {
        path: 'DetailPage',
        component: () => import('@/views/DetailPage.vue')
      },
      {
        path: 'VehiclePage',
        component: () => import('@/views/VehiclePage.vue')
      },
      {
        path: 'ScanPage',
        component: () => import('@/views/ScanPage.vue')
      },
      {
        path: 'DrawGunPage',
        component: () => import('@/views/DrawGunPage.vue')
      },
      {
        path: 'RegisterPage',
        component: () => import('@/views/RegisterPage.vue')
      },
      {
        path: 'ReviewPage',
        component: () => import('@/views/ReviewPage.vue')
      },
      {
        path: 'SettingPage',
        component: () => import('@/views/SettingPage.vue')
      },
      {
        path: 'WalletPage',
        component: () => import('@/views/WalletPage.vue')
      },
      {
        path: 'PaymentPage',
        component: () => import('@/views/PaymentPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router

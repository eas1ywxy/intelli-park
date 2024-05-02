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
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router

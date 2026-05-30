import { createRouter, createWebHistory } from 'vue-router'

import AuctionListPage from '../pages/AuctionListPage.vue'
import LotDetailsPage from '../pages/LotDetailsPage.vue'
import AddLotPage from '../pages/AddLotPage.vue'
import StatsPage from '../pages/StatsPage.vue'
import ProfilePage from '../pages/ProfilePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    name: 'home',
    path: '/',
    component: AuctionListPage
  },{
    name: 'lot-detail',
    path: '/lot/:id',
    component: LotDetailsPage
  },{
    name: 'lot-create',
    path: '/add-lot',
    component: AddLotPage
  },{
    name: 'statistics',
    path: '/stats',
    component: StatsPage
  },{
    name: 'user-profile',
    path: '/profile',
    component: ProfilePage
  }],
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TraductorPage from '../views/traductor-views/TraductorPage.vue'
import AjustesPerfilPage from '../views/usuario-views/AjustesPerfilPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/traductor'
  },
  {
    path: '/traductor',
    component: TraductorPage
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/perfil/',
    redirect: '/perfil/ajustes',
    children: [
      {
        path: 'ajustes',
        name: 'ajustes',
        component: AjustesPerfilPage
      },
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

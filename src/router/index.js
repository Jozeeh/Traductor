import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/sesion-views/LoginPage.vue'
import RegistroPage from '../views/sesion-views/RegistroPage.vue'
import HomeView from '../views/HomeView.vue'
import TraductorPage from '../views/traductor-views/TraductorPage.vue'
import AjustesPerfilPage from '../views/usuario-views/AjustesPerfilPage.vue'
import SeguridadPerfilPage from '../views/usuario-views/SeguridadPerfilPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/traductor'
  },
  {
    path: '/login',
    component: LoginPage
  },
  {
    path: '/registrarse',
    component: RegistroPage
  },
  {
    path: '/home',
    component: HomeView
  },
  {
    path: '/traductor',
    component: TraductorPage
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
      {
        path: 'seguridad',
        name: 'seguridad',
        component: SeguridadPerfilPage
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

import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/sesion-views/LoginPage.vue'
import RegistroPage from '../views/sesion-views/RegistroPage.vue'
import HomeView from '../views/HomeView.vue'
import TraductorPage from '../views/traductor-views/TraductorPage.vue'
import AjustesPerfilPage from '../views/usuario-views/AjustesPerfilPage.vue'
import SeguridadPerfilPage from '../views/usuario-views/SeguridadPerfilPage.vue'
import DiccionarioPage from '../views/diccionario-views/DiccionarioPage.vue'
import FavoritoPage from '../views/diccionario-views/FavoritoPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    component: LoginPage,
    beforeEnter: async (to, from, next) => {
      let respuesta = await validarAcceso();
      if (respuesta){
        next('/traductor') // Redirecciona a una ruta si tenemos sesión
      } else{
        next() // Dejamos acceder al login si no hay sesión
      }
    }
  },
  {
    path: '/registrarse',
    component: RegistroPage,
    beforeEnter: async (to, from, next) => {
      let respuesta = await validarAcceso();
      if (respuesta){
        next('/traductor') // Redirecciona a una ruta si tenemos sesión
      } else{
        next() // Dejamos acceder al login si no hay sesión
      }
    }
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
        component: AjustesPerfilPage,
        beforeEnter: async (to, from, next) => {
          let respuesta = await validarAcceso();
          if (respuesta){
            next('/login') // Redirecciona a una ruta si tenemos sesión
          } else{
            next() // Dejamos acceder al login si no hay sesión
          }
        }
      },
      {
        path: 'seguridad',
        name: 'seguridad',
        component: SeguridadPerfilPage,
        beforeEnter: async (to, from, next) => {
          let respuesta = await validarAcceso();
          if (respuesta){
            next('/login') // Redirecciona a una ruta si tenemos sesión
          } else{
            next() // Dejamos acceder al login si no hay sesión
          }
        }
      },
      {
        path: 'favoritos',
        name: 'favoritos',
        component: FavoritoPage,
        beforeEnter: async (to, from, next) => {
          let respuesta = await validarAcceso();
          if (respuesta){
            next('/login') // Redirecciona a una ruta si tenemos sesión
          } else{
            next() // Dejamos acceder al login si no hay sesión
          }
        }
      },
    ]
  },
  {
    path: '/diccionario',
    name: 'diccionario',
    component: DiccionarioPage
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

async function validarAcceso() {
  let user = localStorage.getItem('user');

  return (user)? true : false;
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

import { createStore } from 'vuex'

export default createStore({
  state: {
    // Descomentar la api que usaras
    //ipApi: 'http://localhost:8000/api', //Api local
    ipApi: 'https://apitr.query.lat/public/api', //Api de produccion (En servidor)
    apiKey: '88cc51c7a8msh5cb26f3451f98aep13c7f7jsnd91cfddc6d9c',

    datosUsuario: []

  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

import { createStore } from 'vuex'

export default createStore({
  state: {
    // Descomentar la api que usaras
    //ipApi: 'http://127.0.0.1:8000', //Api local
    ipApi: 'https://apitr.query.lat/public', //Api de produccion (En servidor)
    apiKey: '88cc51c7a8msh5cb26f3451f98aep13c7f7jsnd91cfddc6d9c',
    apiKeyTraductor: 'd9968ebbddmshbd0fae5d0e31a25p10e1e6jsn067b15ad0db5',

    datosUsuario: [],
    fotoDecodificada: null

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

<template>
  <v-app>
    <v-app-bar color="indigo" density="compact">
      <v-app-bar-title>
        <a style="color: white; text-decoration: none;" href="/traductor">
          <v-icon>mdi-translate</v-icon>
          Traductor
        </a>
      </v-app-bar-title>

      <!-- <v-btn to="/home">
        <v-icon>mdi-circle</v-icon>
        Inicio
      </v-btn>
      <v-btn>
        <v-icon>mdi-book</v-icon>
        Diccionario
      </v-btn>
      <v-btn>
        <v-icon>mdi-star</v-icon>
        Antonimos/Sinonimos
      </v-btn>
      <v-btn to="/traductor">
        <v-icon>mdi-translate</v-icon>
        Traductor
      </v-btn>
      <v-menu min-width="200px" rounded>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props">
            <v-icon>mdi-account</v-icon>
            Cuenta
          </v-btn>
        </template>

        <v-card>
          <v-card-text>
            <div class="mx-auto text-center">

              <v-avatar color="brown">
                <span class="text-h5">{{ user.initials }}</span>
              </v-avatar>

              <h3>{{ user.fullName }}</h3>
              <p class="text-caption mt-1">
                {{ user.email }}
              </p>

              <v-divider class="my-3"></v-divider>
              <v-btn rounded variant="text" to="/perfil/ajustes">
                Editar cuenta
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn rounded variant="text">
                Cerrar sesión
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu> -->

      <!-- MENU DESPLEGABLE DE LA DERECHA DE LOS 3 PUNTOS -->
      <v-menu min-width="200px" rounded>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item to="/home">
            <v-icon>mdi-circle</v-icon>
            Inicio
          </v-list-item>
          <v-list-item to="/traductor">
            <v-icon>mdi-translate</v-icon>
            Traductor
          </v-list-item>
          <v-list-item to="/diccionario">
            <v-icon>mdi-book</v-icon>
            Diccionario
          </v-list-item>
          <v-list-item to="/perfil/ajustes">
            <v-icon>mdi-star</v-icon>
            Antonimos/Sinonimos
          </v-list-item>
          <v-menu min-width="200px" rounded>
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props">
                <v-icon>mdi-account</v-icon>
                Cuenta
              </v-list-item>
            </template>

            <v-card>
              <v-card-text>
                <div class="mx-auto text-center">

                  <!-- /////////////////////////
                  || UNA VEZ INICIADO SESIÓN ||
                  ///////////////////////// -->
                  <div v-if="this.$store.state.datosUsuario.length != 0">
                    <v-avatar color="brown">
                      <v-img :src="this.$store.state.fotoDecodificada"></v-img>
                    </v-avatar>

                    <h3>{{ this.$store.state.datosUsuario.nombre }} {{ this.$store.state.datosUsuario.apellido }}</h3>
                    <p class="text-caption mt-1">
                      {{ this.$store.state.datosUsuario.correo }}
                    </p>
                  </div>

                  <div v-if="this.$store.state.datosUsuario.length != 0">
                    <v-divider class="my-3"></v-divider>
                    <v-btn rounded variant="text" to="/perfil/ajustes">
                      Gestionar cuenta
                    </v-btn>
                    <v-divider class="my-3"></v-divider>
                    <v-btn rounded variant="text" @click="cerrarSesion()">
                      Cerrar sesión
                    </v-btn>
                  </div>

                  <!-- /////////////////////////
                  || SIN HABER INICIADO SESIÓN ||
                  ///////////////////////// -->
                  <div v-else>
                    <v-btn rounded variant="text" to="/login">
                      Iniciar sesión
                    </v-btn>
                    <v-divider class="my-3"></v-divider>
                    <v-btn rounded variant="text" to="/registrarse">
                      Registrarse
                    </v-btn>
                  </div>

                </div>
              </v-card-text>
            </v-card>
          </v-menu>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <router-view />

      <br><br><br>

      <!-- FOOTER -->
      <v-footer color="grey-darken-4" 
        class="bg-indigo-lighten-1 text-center d-flex flex-column">
        <div>
          <v-btn variant="text"><v-icon>mdi-facebook</v-icon></v-btn>
          <v-btn variant="text"><v-icon>mdi-twitter</v-icon></v-btn>
          <v-btn variant="text"><v-icon>mdi-instagram</v-icon></v-btn>
        </div>

        <v-divider></v-divider>

        <div>
          2023 — Dev Dreams
        </div>
      </v-footer>
    </v-main>

  </v-app>
</template>

<script>
// import axios from 'axios' //No se usa en este componente/views

export default {
  name: 'App',

  data() {
    return {
      dialogCargandoSesion: false,
      showNavMenu: false,
    }
  },
  methods: {
    // Método para cerrar sesión
    cerrarSesion() {
      // Eliminamos los datos de la sesion del localStorage y del store, luego redirigimos
      localStorage.removeItem('datosSesion')
      this.$store.state.datosUsuario = []
      this.$router.push('/traductor')
    }
  },
  beforeCreate() {
    // Cargar los datos de usuario desde el localStorage
    const usuarioData = localStorage.getItem('datosSesion');

    // Comprobamos si hay datos de sesion guardados en el store
    if (usuarioData) {
      // Cargamos los datos de la sesion en el store
      this.$store.state.datosUsuario = JSON.parse(usuarioData);

      // Decodificamos la imagen de perfil del usuario
      this.$store.state.fotoDecodificada = "data:image/png;base64," + this.$store.state.datosUsuario.foto;

      // Imprimimos los datos de la sesion en consola
      console.log('DATOS CARGADOS DESDE EL APP.VUE', this.$store.state.datosUsuario)

    } else {
      console.log('Ups... al parecer no tienes una sesión iniciada, algunos complementos no estarán disponibles')
    }
  }
}
</script>

<style>
.v-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  margin-top: 10px;
}
</style>

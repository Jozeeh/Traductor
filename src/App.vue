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
          <v-list-item>
            <v-icon>mdi-book</v-icon>
            Diccionario
          </v-list-item>
          <v-list-item>
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

                  <v-avatar color="brown">
                    <span class="text-h5">{{ user.initials }}</span>
                  </v-avatar>

                  <h3>{{ user.fullName }}</h3>
                  <p class="text-caption mt-1">
                    {{ user.email }}
                  </p>

                  <!-- /////////////////////////
                  || SIN HABER INICIADO SESIÓN ||
                  ///////////////////////// -->
                  <v-divider class="my-3"></v-divider>
                  <!-- DIALOGO DE INICIO DE SESION -->
                  <v-dialog width="500">
                    <template v-slot:activator="{ props }">
                      <v-btn v-bind="props" rounded variant="text">
                        Iniciar sesión
                      </v-btn>
                    </template>

                    <template v-slot:default="{ isActive }">
                      <v-card title="Iniciar sesión" prepend-icon="mdi-account">
                        <v-card-text>
                          <v-text-field label="Correo" outlined></v-text-field>
                          <v-text-field type="password" label="Contraseña" outlined></v-text-field>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>

                          <v-btn color="red" text="Cancelar" @click="isActive.value = false"></v-btn>
                          <v-btn color="green" text="Iniciar sesión" @click="overlay = true"></v-btn>

                          <!-- Dialog que se muestra al tratar de iniciar sesión -->
                          <v-dialog v-model="overlay" fullscreen>
                            <v-card class="align-center justify-center">
                              <v-progress-circular color="primary" indeterminate :size="128"
                                :width="12"></v-progress-circular>
                              <h1>Iniciando sesión...</h1>
                            </v-card>
                          </v-dialog>
                        </v-card-actions>
                      </v-card>
                    </template>
                  </v-dialog>
                  <v-divider class="my-3"></v-divider>
                  <v-btn rounded variant="text" to="/registrarse">
                    Registrarse
                  </v-btn>

                  <!-- /////////////////////////
                  || UNA VEZ INICIADO SESIÓN ||
                  ///////////////////////// -->
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
          </v-menu>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <router-view />

      <!-- FOOTER -->
      <v-footer color="grey-darken-4" style="margin-top: 10px;"
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

export default {
  name: 'App',

  data() {
    return {
      overlay: false,
      showNavMenu: false,
      user: {
        initials: 'JD',
        fullName: 'John Doe',
        email: 'john.doe@doe.com',
      },
    }
  }
}
</script>

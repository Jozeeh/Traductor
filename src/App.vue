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

      <!-- MENU DESPLEGABLE DE LA DERECHA -->
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

    <!-- <v-navigation-drawer permanent expand-on-hover rail>
      <v-list>
        <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg" title="Sandra Adams" subtitle="sandra_a88@gmailcom"></v-list-item>
      </v-list>

      <v-list>
        <v-list-item prepend-icon="mdi-login" title="Iniciar Sesión" to="/login"></v-list-item>
        <v-list-item prepend-icon="mdi-account-plus-outline" title="Registrarse" to="/register"></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list>
        <v-list-item prepend-icon="mdi-translate" title="Traductor" to="/traductor"></v-list-item>
        <v-list-item prepend-icon="mdi-book" title="Diccionario" to="/"></v-list-item>
        <v-list-item prepend-icon="mdi-star" title="Starred" to="/"></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list>
        <v-list-item prepend-icon="" title="Creado por DevDreams"></v-list-item>
      </v-list>
    </v-navigation-drawer> -->

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

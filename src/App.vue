<template>
  <v-app>
    <v-app-bar color="indigo" density="compact">
      <v-app-bar-title><v-icon>mdi-translate</v-icon> TRADUCTOR</v-app-bar-title>

      <v-btn>
        <v-icon>mdi-magnify</v-icon>
        Diccionario
      </v-btn>
      <v-btn to="/traductor">
        <v-icon>mdi-translate</v-icon>
        Traductor
      </v-btn>
      <v-btn>
        <v-icon>mdi-account</v-icon>
        Cuenta
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer permanent expand-on-hover rail>
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
        <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" to="/"></v-list-item>
        <v-list-item prepend-icon="mdi-star" title="Starred" to="/"></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list>
        <v-list-item prepend-icon="" title="Creado por DevDreams"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
}
</script>

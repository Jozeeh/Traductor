<template>
    <v-navigation-drawer permanent expand-on-hover rail>
      <v-list>
        <v-list-item prepend-avatar="/profile-pic.jpg" :title="this.$store.state.datosUsuario.nombre + ' ' + this.$store.state.datosUsuario.apellido" :subtitle="this.$store.state.datosUsuario.correo"></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <!-- LISTA DE OPCIONES DE CUENTA -->
      <v-list>
        <v-list-item prepend-icon="mdi-key" title="Gestionar seguridad" to="/traductor"></v-list-item>
        <v-list-item prepend-icon="mdi-star" title="Gestionar favoritos" to="/"></v-list-item>
        <v-list-item prepend-icon="mdi-clock" title="Proximamente..." to="/"></v-list-item>
      </v-list>

      <v-divider></v-divider>

        <!-- LISTA DE COSAS DE LA PAGINA -->
      <v-list>
        <v-list-item prepend-icon="mdi-google-translate" title="Traductor" to="/traductor"></v-list-item>
        <v-list-item prepend-icon="mdi-book" title="Diccionario" to="/"></v-list-item>
        <v-list-item prepend-icon="mdi-book-multiple" title="Sinonimos/Antonimos" to="/"></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list>
        <v-list-item prepend-icon="" title="Creado por DevDreams"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-container fluid>
        <v-grid>
            <v-row>
                <v-col>
                    <h1 class="text-center">AJUSTES DE PERFIL</h1>
                </v-col>
            </v-row>

            <v-row>
                <v-col :cols="12" :sm="6" :md="6" :lg="6" :xl="6" :xxl="6">
                    <v-img style="margin: 0 auto;" :width="200" aspect-ratio="1/1" cover :src="`${this.$store.state.ipApi}/`+datosUsuario.foto"></v-img> <br> 
                    <v-file-input :rules="rules" accept="image/png, image/jpeg, image/bmp" placeholder="Pick an avatar" prepend-icon="mdi-camera" label="Avatar" @change="handleFileChange"></v-file-input>
                </v-col>

                <v-col :cols="12" :sm="6" :md="6" :lg="6" :xl="6" :xxl="6">
                    <v-text-field label="Nombre" outlined v-model="datosUsuario.nombre"></v-text-field>
                    <v-text-field label="Apellido" outlined v-model="datosUsuario.apellido"></v-text-field>
                    <v-text-field type="number" label="Número telefonico" outlined v-model="datosUsuario.telefono"></v-text-field>
                    <v-list-item-subtitle>Para cambiar el correo y contraseña por favor ve a la página de <a href="/">seguridad.</a></v-list-item-subtitle>
                    <v-text-field label="Correo" outlined disabled v-model="datosUsuario.correo"></v-text-field>
                    <v-text-field label="Contraseña" outlined disabled></v-text-field>
                    <v-text-field label="Confirmar contraseña" outlined disabled></v-text-field>

                    <v-btn color="lime" dark @click="guardarCambios()">Guardar cambios</v-btn>
                </v-col>
            </v-row>
        </v-grid>
    </v-container>
</template>


<script>
import axios from 'axios'

export default {
    name: 'AjustesPerfilPage',
    data() {
        return {
          datosUsuario: this.$store.state.datosUsuario,
          imagenSeleccionada: null,
        }
    },
    methods: {
      handleFileChange(event) {
        // Captura la imagen seleccionada
        this.imagenSeleccionada = event.target.files[0];
      },

      guardarCambios() {
        // Crea un objeto FormData para enviar la imagen al servidor
        const formData = new FormData();
        formData.append('nombre', this.datosUsuario.nombre);
        formData.append('apellido', this.datosUsuario.apellido);
        formData.append('telefono', this.datosUsuario.telefono);
        formData.append('foto', this.imagenSeleccionada);

        // Realiza una solicitud PUT para actualizar el perfil del usuario
        axios.put(`${this.$store.state.ipApi}/api/updateDatosUsuario/${this.$store.state.datosUsuario.id}`, {
          nombre: this.datosUsuario.nombre,
          apellido: this.datosUsuario.apellido,
          telefono: this.datosUsuario.telefono,
          foto: this.imagenSeleccionada
        })
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        });

      }

    },
    beforeCreate() {
      // Comprobamos si hay datos de sesion guardados en el store
      if (this.$store.state.datosUsuario.length != 0) {
        console.log('Sesión recuperada')
        
      } else {
        this.$router.push('/login')
      }
    },
}
</script>


<style>
</style>
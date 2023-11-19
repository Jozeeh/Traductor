<template>
    <v-navigation-drawer permanent expand-on-hover rail>
      <v-list>
        <v-list-item :prepend-avatar="this.$store.state.fotoDecodificada" :title="this.$store.state.datosUsuario.nombre + ' ' + this.$store.state.datosUsuario.apellido" :subtitle="this.$store.state.datosUsuario.correo"></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <!-- LISTA DE OPCIONES DE CUENTA -->
      <v-list>
        <v-list-item prepend-icon="mdi-cog" title="Gestionar cuenta" to="/perfil/ajustes"></v-list-item>
        <v-list-item prepend-icon="mdi-key" title="Gestionar seguridad" to="/perfil/seguridad"></v-list-item>
        <v-list-item prepend-icon="mdi-star" title="Gestionar favoritos" to="/perfil/favoritos"></v-list-item>
      </v-list>

      <v-divider></v-divider>

        <!-- LISTA DE COSAS DE LA PAGINA -->
      <v-list>
        <v-list-item prepend-icon="mdi-google-translate" title="Traductor" to="/traductor"></v-list-item>
        <v-list-item prepend-icon="mdi-book" title="Diccionario" to="/diccionario"></v-list-item>
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
                  <!-- IMAGEN DEL USUARIO -->
                    <v-img style="margin: 0 auto;" :width="200" aspect-ratio="1/1" cover :src="this.$store.state.fotoDecodificada"></v-img> <br> 
                    <v-file-input placeholder="Pick an avatar" prepend-icon="mdi-camera" label="Avatar" @change="handleFileChange"></v-file-input>
                    
                </v-col>

                <v-col :cols="12" :sm="6" :md="6" :lg="6" :xl="6" :xxl="6">
                    <v-text-field label="Nombre" outlined v-model="datosUsuario.nombre"></v-text-field>
                    <v-text-field label="Apellido" outlined v-model="datosUsuario.apellido"></v-text-field>
                    <v-text-field type="number" label="Número telefonico" outlined v-model="datosUsuario.telefono"></v-text-field>
                    <v-list-item-subtitle>Para cambiar el correo y contraseña por favor ve a la página de <a to="/perfil/seguridad">seguridad.</a></v-list-item-subtitle>
                    <v-text-field label="Correo" outlined disabled v-model="datosUsuario.correo"></v-text-field>
                    <v-text-field label="Contraseña" outlined disabled></v-text-field>
                    <v-text-field label="Confirmar contraseña" outlined disabled></v-text-field>

                    <v-btn color="lime" dark @click="guardarCambios()">Guardar cambios</v-btn>
                </v-col>
            </v-row>
        </v-grid>

        <!-- DIALOGO DE CARGA CUANDO SE ACTUALIZA LOS DATOS -->
        <v-dialog persistent v-model="dialogCargandoCambios" width="400">
          <v-card class="align-center justify-center" style="padding: 30px;">
            <v-progress-circular color="primary" indeterminate :size="128" :width="12"></v-progress-circular>
                <h1 class="text-center" style="margin-top: 15px;">Actualizando datos...</h1>
          </v-card>
        </v-dialog>

        <!-- SNACKBAR DE AVISO QUE SE ACTUALIZO LOS DATOS -->
        <v-snackbar v-model="snackAviso">
            Datos actualizados

            <template v-slot:actions>
                <v-btn color="pink" variant="text" @click="snackAviso = false">
                    cerrar
                </v-btn>
            </template>
        </v-snackbar>
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
          dialogCargandoCambios: false,
          snackAviso: false,
          fotoUsuarioDecodificada: ''
        }
    },
    methods: {
      handleFileChange(event) {
        // Captura la imagen seleccionada
        let file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
          this.imagenSeleccionada = reader.result; // Guarda la imagen como ucadena base64
        };
        reader.readAsDataURL(file);
      },

      guardarCambios() {
        this.dialogCargandoCambios = true

        // Realiza una solicitud PUT para actualizar el perfil del usuario
        axios.put(`${this.$store.state.ipApi}/api/updateDatosUsuario/${this.$store.state.datosUsuario.id}`, {
          nombre: this.datosUsuario.nombre,
          apellido: this.datosUsuario.apellido,
          telefono: this.datosUsuario.telefono,
          foto: this.imagenSeleccionada
        })
        .then(response => {

          // Actualiza los datos del usuario en el store y en el localStorage
          axios.get(`${this.$store.state.ipApi}/api/getDatosUsuario/${this.$store.state.datosUsuario.id}`)
          .then(response => {
            this.$store.state.datosUsuario = response.data.data
            localStorage.setItem('datosSesion', JSON.stringify(response.data.data))
            this.dialogCargandoCambios = false

            // Muestra el snackbar de aviso
            this.snackAviso = true
            // Recarga página con router
            this.$router.go()
          })
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
    created() {
      // this.fotoUsuarioDecodificada = "data:image/png;base64," + this.$store.state.datosUsuario.foto;
      // console.log(this.fotoUsuarioDecodificada); // Verifica la URL de la imagen decodificada
    }

}
</script>


<style>
</style>
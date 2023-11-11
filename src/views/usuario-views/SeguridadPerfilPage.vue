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
                    <h1 class="text-center">AJUSTES DE SEGURIDAD</h1>
                </v-col>
            </v-row>

            <v-row>
                <v-col :cols="12" :sm="6" :md="6" :lg="6" :xl="6" :xxl="6">
                    <h4>Actualizar correo:</h4>
                    <v-text-field label="Correo actual" outlined disabled v-model="this.$store.state.datosUsuario.correo"></v-text-field>
                    <v-text-field label="Correo nuevo" outlined v-model="correoNuevo"></v-text-field>
                    <v-text-field label="Confirmar correo nuevo" outlined v-model="confirmarCorreoNuevo"></v-text-field>
                    <v-btn :disabled="desactivarBotones" color="lime" dark @click="guardarCorreo()">Guardar correo</v-btn>
                </v-col>

                <v-col :cols="12" :sm="6" :md="6" :lg="6" :xl="6" :xxl="6">
                    <h4>Actualizar contraseña:</h4>
                    <v-text-field type="password" label="Contraseña actual" outlined v-model="passwordActual"></v-text-field>
                    <v-text-field label="Contraseña nueva" outlined v-model="passwordNueva"></v-text-field>
                    <v-text-field label="Confirmar contraseña nueva" outlined v-model="confirmarPasswordNueva"></v-text-field>
                    <v-btn :disabled="desactivarBotones" color="lime" dark @click="guardarPassword()">Guardar contraseña</v-btn>
                </v-col>
            </v-row>
        </v-grid>

        <!-- DIALOGO DE CARGA CUANDO SE ACTUALIZA LOS DATOS -->
        <v-dialog persistent v-model="dialogCargandoCambios" width="400">
          <v-card class="align-center justify-center" style="padding: 30px;">
            <v-progress-circular color="primary" indeterminate :size="128" :width="12"></v-progress-circular>
                <h1 class="text-center" style="margin-top: 15px;">{{dialogMensaje}}</h1>
          </v-card>
        </v-dialog>

        <!-- SNACKBAR DE AVISO QUE SE ACTUALIZO LOS DATOS -->
        <v-snackbar v-model="snackAviso">
            <div v-text="snackAvisoMensaje"></div>

            <template v-slot:actions>
                <v-btn color="pink" variant="text" @click="snackAviso = false">
                    cerrar
                </v-btn>
            </template>
        </v-snackbar>
    </v-container>
</template>


<script>
import axios from 'axios';

export default {
    name: 'SeguridadPerfilPage',
    data() {
        return {
            dialogCargandoCambios: false,
            snackAviso: false,
            snackContraseñaDiferente: false,
            correoNuevo: '',
            confirmarCorreoNuevo: '',
            desactivarBotones: false,
            passwordActual: '',
            passwordNueva: '',
            confirmarPasswordNueva: '',
            dialogMensaje: '',
        }
    },
    methods: {
        guardarCorreo() {
            this.desactivarBotones = true

            // Comprobamos que el correo nuevo y el confirmar correo nuevo sean iguales
            if (this.correoNuevo === this.confirmarCorreoNuevo){
                this.dialogMensaje = 'Actualizando correo...'
                this.dialogCargandoCambios = true

                axios.put(`${this.$store.state.ipApi}/api/updateCorreoUsuario/${this.$store.state.datosUsuario.id}`, {
                    correo: this.correoNuevo
                })
                .then(response => {

                     // Actualiza los datos del usuario en el store y en el localStorage
                    axios.get(`${this.$store.state.ipApi}/api/getDatosUsuario/${this.$store.state.datosUsuario.id}`)
                    .then(response => {
                        this.$store.state.datosUsuario = response.data.data
                        localStorage.setItem('datosSesion', JSON.stringify(response.data.data))

                        this.dialogCargandoCambios = false
                        this.snackAvisoMensaje = 'Correo actualizado!'
                        this.snackAviso = true
                        this.desactivarBotones = false
                        // Recarga página con router
                        this.$router.go()
                    })

                    console.log(response.data.data)
                })
                .catch(error => {
                    this.dialogCargandoCambios = false
                    this.snackAvisoMensaje = 'Error en la API!'
                    this.snackAviso = true
                    this.desactivarBotones = false
                    console.log(error)
                })
            } else {
                this.snackAvisoMensaje = 'Los correos no son iguales!'
                this.snackAviso = true
                this.desactivarBotones = false
            }
            
        },

        guardarPassword() {
            this.desactivarBotones = true

            // Comprobamos que el correo nuevo y el confirmar correo nuevo sean iguales
            if (this.passwordNueva === this.confirmarPasswordNueva){
                this.dialogMensaje = 'Actualizando contraseña...'
                this.dialogCargandoCambios = true

                axios.put(`${this.$store.state.ipApi}/api/updatePasswordUsuario/${this.$store.state.datosUsuario.id}`, {
                    correo: this.$store.state.datosUsuario.correo,
                    password: this.passwordActual,
                    newPassword: this.passwordNueva
                })
                .then(response => {
                    // Mostramos avisos y cerramos dialog
                    this.dialogCargandoCambios = false
                    this.snackAvisoMensaje = response.data.data
                    this.snackAviso = true
                    this.desactivarBotones = false

                    // Reiniciamos los campos
                    this.passwordActual = ''
                    this.passwordNueva = ''
                    this.confirmarPasswordNueva = ''

                    console.log(response.data.data)
                })
                .catch(error => {
                    // Mostramos avisos y cerramos dialog
                    this.dialogCargandoCambios = false
                    this.snackAvisoMensaje = error.response.data.data
                    this.snackAviso = true
                    this.desactivarBotones = false
                    console.log(error)
                })
            } else {
                this.snackAvisoMensaje = 'Las contraseñas nuevas no son iguales!'
                this.snackAviso = true
                this.desactivarBotones = false
            }
        }
    }
}
</script>


<style scoped>
</style>
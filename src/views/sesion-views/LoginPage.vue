<template>
    <v-grid>
        <v-row style="margin-top: 10px;" justify="center">
            <v-col :cols="12" :sm="12" :md="6" :lg="6" :xl="6" :xxl="6">
                <v-card color="grey-lighten-3" variant="flat" class="mx-auto"
                    prepend-icon="mdi-account-plus">
                    <template v-slot:title>
                        Inicia sesión en tu cuenta!
                        <v-card-subtitle>¡Al registrarte podrás acceder a más beneficios!</v-card-subtitle>
                    </template>

                    <v-card-text>
                        <v-text-field :disabled="desactivarFormulario" label="Correo" outlined v-model="correoLogin"></v-text-field>
                        <v-text-field :disabled="desactivarFormulario" type="password" label="Contraseña" outlined v-model="passwordLogin"></v-text-field>

                        <v-btn :disabled="desactivarFormulario" color="lime" @click="iniciarSesion()">Iniciar sesión</v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <!-- CARD DE INFORMACION <BENEFICIOS>  -->
        <v-row justify="center">
            <v-col :cols="12" :sm="12" :md="8" :lg="8" :xl="8" :xxl="8">
                <v-card color="blue-grey-lighten-4" variant="flat" theme="dark">
                    <template v-slot:text>
                        <div class="text-h6">¡¿CONOCIAS LOS BENEFICIOS QUE OBTIENES AL REGISTRARTE?!</div>
                        Puedes acceder a los siguientes al beneficios al registrarte, como por ejemplo: acceder a un
                        diccionario en línea y poder encontrar sinonimos y antonimos de palabras que necesites!
                    </template>
                </v-card>
            </v-col>
        </v-row>

        <!-- CARD DE INFORMACION <REGISTRARSE>  -->
        <v-row justify="center">
            <v-col :cols="12" :sm="12" :md="8" :lg="8" :xl="8" :xxl="8">
                <v-card color="blue-grey-lighten-4" variant="flat" theme="dark">
                    <template v-slot:text>
                        <div class="text-h6">¡¿NO TIENES CUENTA?! REGISTRATE AQUÍ</div>
                        Si no tienes una cuenta, puedes registrarte aquí y acceder a los beneficios que te ofrece el sitio web.

                        <br><br>
                        <v-btn style="margin: 2px;" variant="tonal" color="grey-darken-4" @click="this.$router.push('/registrarse')">
                            Registrarse
                        </v-btn>
                    </template>
                </v-card>
            </v-col>
        </v-row>

        <!-- SNACK DE AVISO -->
        <v-snackbar v-model="snackAviso">
            <div v-text="snackAvisoTexto"></div>

            <template v-slot:actions>
                <v-btn color="pink" variant="text" @click="snackAviso = false">
                    cerrar
                </v-btn>
            </template>
        </v-snackbar>

        <!-- Dialog que se muestra cuando está cargando el iniciar sesión -->
        <v-dialog v-model="dialogCargandoSesion" fullscreen>
            <v-card class="align-center justify-center">
            <v-progress-circular color="primary" indeterminate :size="128" :width="12"></v-progress-circular>
                <h1>Iniciando sesión...</h1>
            </v-card>
        </v-dialog>
    </v-grid>
</template>


<script>
import axios from 'axios'

export default {
    name: 'LoginPage',
    data() {
        return {
            desactivarFormulario: false,
            snackAviso: false,
            snackAvisoTexto: '',

            dialogCargandoSesion: false,
            correoLogin: '',
            passwordLogin: '',
        }
    },
    methods: {
        iniciarSesion() {
            // Mostramos el dialog de cargando
            this.dialogCargandoSesion = true

            axios.post(`${this.$store.state.ipApi}/api/login`, {
                correo: this.correoLogin,
                password: this.passwordLogin
            })
            .then(response => {
                // Guardamos los datos de la sesion en el localStorage
                localStorage.setItem('datosSesion', JSON.stringify(response.data.data))
                
                // Y obtenemos los datos de la sesion guardada en el localStorage
                this.$store.state.datosUsuario = JSON.parse(localStorage.getItem('datosSesion'))

                // Decodificamos la imagen de perfil del usuario
                this.$store.state.fotoDecodificada = "data:image/png;base64," + this.$store.state.datosUsuario.foto;
                
                // Cerramos el dialog de cargando y redirigimos a la página de ajustes de perfil
                this.dialogCargandoSesion = false

                // Redireccionamos
                this.$router.push('/home')

                console.log(response.data.data)
            })
            .catch(error => {
                // Cerramos el dialog de cargando
                this.dialogCargandoSesion = false

                // Mostramos snack de aviso
                this.snackAviso = true
                this.snackAvisoTexto = 'Correo o contraseña incorrectos'

                // Mostamos el error en consola
                console.log(error)
            })
        },
    },
    beforeCreate() {
        // Comprobamos si hay datos de sesion guardados en el store
        if (this.$store.state.datosUsuario.length != 0) {
            this.$router.push('/perfil/ajustes')
        } else {
            console.log('Inicia sesión!')
        }
    }
}
</script>
<template>
    <v-grid>
        <v-row style="margin-top: 10px;" justify="center">
            <v-col :cols="12" :sm="12" :md="6" :lg="6" :xl="6" :xxl="6">
                <v-card :loading="loadingRegistro" color="grey-lighten-3" variant="flat" class="mx-auto"
                    prepend-icon="mdi-account-plus">
                    <template v-slot:title>
                        Registra tu cuenta!
                        <v-card-subtitle>¡Al registrarte podrás acceder a más beneficios!</v-card-subtitle>
                    </template>

                    <v-card-text>
                        <v-text-field :disabled="desactivarFormulario" label="Nombre" outlined v-model="cuentaRegistrar.nombre"></v-text-field>
                        <v-text-field :disabled="desactivarFormulario" label="Apellido" outlined v-model="cuentaRegistrar.apellido"></v-text-field>
                        <v-text-field :disabled="desactivarFormulario" type="number" label="Número telefonico" outlined
                            v-model="cuentaRegistrar.telefono"></v-text-field>
                        <v-text-field :disabled="desactivarFormulario" label="Correo" outlined v-model="cuentaRegistrar.correo"></v-text-field>
                        <v-text-field :disabled="desactivarFormulario" type="password" label="Contraseña" outlined v-model="cuentaRegistrar.password"></v-text-field>
                        <v-text-field :disabled="desactivarFormulario" type="password" label="Confirmar contraseña" outlined
                            v-model="passwordConfirm"></v-text-field>

                        <v-btn :disabled="desactivarFormulario" color="brown" @click="registrarCuenta()">Registrarse</v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

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

        <!-- SNACK DE AVISO -->
        <v-snackbar v-model="snackAviso">
            <div v-text="snackAvisoTexto"></div>

            <template v-slot:actions>
                <v-btn color="pink" variant="text" @click="snackContraseñaDiferente = false">
                    cerrar
                </v-btn>
            </template>
        </v-snackbar>

        <!-- Dialog que se muestra cuando está cargando el registro de usuario -->
        <v-dialog v-model="dialogCargandoRegistro" fullscreen>
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
    name: 'RegistroPage',
    data() {
        return {
            cuentaRegistrar: {
                nombre: '',
                apellido: '',
                telefono: '',
                correo: '',
                password: '',
                tipo_usuario: 'Usuario'
            },
            passwordConfirm: '',
            loadingRegistro: false,
            snackAviso: false,
            snackAvisoTexto: '',
            desactivarFormulario: false,
            dialogCargandoRegistro: false
        }
    },
    methods: {
        // Método para iniciar sesión despues de registrarse
        iniciarSesion(){
            axios.post(`${this.$store.state.ipApi}/api/login`, {
                correo: this.cuentaRegistrar.correo,
                password: this.cuentaRegistrar.password
            })
            .then(response => {
                localStorage.setItem('datosSesion', JSON.stringify(response.data.data))
                this.$router.push('/home')
            })
            .catch(error => {
                console.log(error)
            })
        },

        // Método para registrar una cuenta
        registrarCuenta() {
            // Mostrar el dialog de cargando registro
            this.dialogCargandoRegistro = true

            // Si todos los campos están llenos se ejecuta
            if (this.cuentaRegistrar.nombre != '' || this.cuentaRegistrar.apellido != '' || this.cuentaRegistrar.telefono != '' || this.cuentaRegistrar.correo != '' || this.cuentaRegistrar.password != '' || this.passwordConfirm != ''){

               // Si las contraseñas no coinciden mostrará un aviso
                if (this.cuentaRegistrar.password != this.passwordConfirm) {
                    // Texto del Snackbar
                    // Mostrar el Snackbar
                    this.snackAvisoTexto = '¡Las contraseñas no coinciden!'
                    this.snackAviso = true

                    // Ocultar el Snackbar después de unos segundos (por ejemplo, 3 segundos <<3000 milisegundos (3 segundos)>>)
                    setTimeout(() => {
                        this.snackAviso = false;
                    }, 3000);

                }
                //Si las contraseñas coinciden se procede a registrar la cuenta 
                else {
                    // Desactivamos el formulario y mostramos el loading
                    this.desactivarFormulario = true
                    this.loadingRegistro = true
                    
                    // Se envía la petición al servidor
                    axios.post(`${this.$store.state.ipApi}/api/registro`, this.cuentaRegistrar)
                    .then(response => {
                        //Mensaje y datos obtenido del registro exitoso
                        console.log('Registro exitoso' + response.data.data)
                        
                        // Si el registro es exitoso se inicia sesión
                        this.iniciarSesion()

                        // Ocultamos el loading y el dialog
                        this.dialogCargandoRegistro = false
                    })
                    .catch(error => {
                        // Texto del Snackbar
                        this.snackAvisoTexto = 'Ya existe una cuenta con esté correo!'
                        // Mostrar el Snackbar
                        this.snackAviso = true

                        // Ocultar el Snackbar después de unos segundos (por ejemplo, 3 segundos)
                        setTimeout(() => {
                            this.snackAviso = false;
                        }, 3000); // 3000 milisegundos (3 segundos)

                        // Imprimimos error en consola
                        console.log('Error al registrar' + error)
                    })

                } 
            } 
            // Si todos los campos NO están llenos se ejecuta
            else{
                // Texto del Snackbar
                this.snackAvisoTexto = '¡Debes llenar todos los campos!'
                // Mostrar el Snackbar
                this.snackAviso = true

                // Ocultar el Snackbar después de unos segundos (por ejemplo, 3 segundos)
                setTimeout(() => {
                    this.snackContraseñaDiferente = false;
                }, 3000); // 3000 milisegundos (3 segundos)
            }
        }
    },
    beforeCreate() {
        // Comprobamos si hay datos de sesion guardados en el store
        if (this.$store.state.datosUsuario.length != 0) {
            this.$router.push('/perfil/ajustes')
        } else {
            console.log('Registrate!')
        }
    }
}
</script>


<style scoped></style>
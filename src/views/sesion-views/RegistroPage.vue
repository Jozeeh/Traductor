<template>
    <v-grid>
        <v-row style="margin-top: 10px;" justify="center">
            <v-col :cols="12" :sm="12" :md="6" :lg="6" :xl="6" :xxl="6">
                <v-card :loading="loadingRegistro" color="grey-lighten-3" variant="flat" class="mx-auto" prepend-icon="mdi-account-plus">
                    <template v-slot:title>
                        Registra tu cuenta!
                        <v-card-subtitle>¡Al registrarte podrás acceder a más beneficios!</v-card-subtitle>
                    </template>

                    <v-card-text>
                        <v-text-field label="Nombre" outlined></v-text-field>
                        <v-text-field label="Apellido" outlined></v-text-field>
                        <v-text-field type="number" label="Número telefonico" outlined></v-text-field>
                        <v-text-field label="Correo" outlined></v-text-field>
                        <v-text-field type="password" label="Contraseña" outlined></v-text-field>
                        <v-text-field type="password" label="Confirmar contraseña" outlined></v-text-field>
                        
                        <v-btn color="brown" @click="loadingRegistro=true">Registrarse</v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-col :cols="12" :sm="12" :md="8" :lg="8" :xl="8" :xxl="8">
                <v-card color="blue-grey-lighten-4" variant="flat" theme="dark">
                    <template v-slot:text>
                        <div class="text-h6">¡¿CONOCIAS LOS BENEFICIOS QUE OBTIENES AL REGISTRARTE?!</div>
                        Puedes acceder a los siguientes al beneficios al registrarte, como por ejemplo: acceder a un diccionario en línea y poder encontrar sinonimos y antonimos de palabras que necesites!
                    </template>
                </v-card>
            </v-col>
        </v-row>
    </v-grid>
</template>


<script>
export default {
    name: 'RegistroPage',
    data() {
        return {
            loadingRegistro: false
        }
    }
}
</script>


<style scoped></style>
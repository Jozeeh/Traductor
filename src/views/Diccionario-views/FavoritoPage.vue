<template>
    <div>
        <br>
        <v-row justify="center">
            <v-col :cols="12" :sm="12" :md="10" :lg="10" :xl="10" :xxl="10">
                <v-card color="blue-grey-lighten-4" variant="flat" theme="dark">
                    <template v-slot:text>
                        <div class="text-h5 text-black">
                            <v-avatar rounded="0" image="/2-Logo-SinFondo.png"></v-avatar> ¡PRUEBA NUESTRO VISTA DE TUS
                            PALABRAS FAVORITAS!
                        </div>
                        <div class="text-subtitle-2 text-grey-darken-3">Desarrollado por dev dreams</div>
                        Nuestra función de "Palabras Favoritas" en línea te permite organizar y
                        acceder fácilmente a las palabras que has marcado como tus favoritas. Esta herramienta es ideal para
                        aquellos que desean tener un rápido acceso a su selección personal de palabras destacadas, ya sea
                        para estudio, referencia o simplemente para enriquecer su vocabulario.
                    </template>
                </v-card>
            </v-col>
        </v-row>

        <v-row>
            <v-col v-for="(favorito, i) in favoritos" :key="i"
                style=" margin: 20px; border-radius: 20px; background-color: rgb(197, 206, 203);">
                <div v-if="this.$store.state.datosUsuario.id == favorito.fkIdUsuario">
                    <v-title>
                        <center>
                            <h3>{{ favorito.Palabra }}</h3> <br>
                            <v-btn color="red" icon="mdi-delete" @click="eliminarFavorito(favorito.idFavoritos)"></v-btn>
                        </center>
                    </v-title>
                </div>
            </v-col>
        </v-row>

    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            favoritos: {}
        };
    },
    methods: {
        getFavoritos() {
            axios.get(`${this.$store.state.ipApi}/api/mostrarPalabra`)
                .then(response => {
                    this.favoritos = response.data
                    console.log(response.data)
                })
                .catch(
                    error => console.log(error)
                )
        },
        eliminarFavorito(id) {
            axios.delete(`${this.$store.state.ipApi}/api/eliminarFavorito/${id}`)
                .then(response => {
                    console.log(response.data)
                    this.favoritos = {}
                    this.getFavoritos()
                })
                .catch(error => console.log(error))
        }
    },
    created() {
        this.getFavoritos()
    },
    mounted(){
        if(Object.keys(this.$store.state.datosUsuario).length != 0){
            console.log('autorizado')
        }else if(Object.keys(this.$store.state.datosUsuario).length == 0){
            this.$router.push('/home')
        }
    }
};
</script>

<style>/* Aquí puedes agregar estilos personalizados si lo deseas */</style>

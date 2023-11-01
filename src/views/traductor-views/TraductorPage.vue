<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12">
                <!-- CARD DE BIENVENIDA EN TRADUCTOR -->
                <v-card color="indigo-lighten-1" theme="dark">
                    <div class="d-flex flex-no-wrap justify-space-between">
                        <div>
                            <v-card-title class="text-h5">
                                ¡PRUEBA NUESTRO NUEVO TRADUCTOR!
                            </v-card-title>

                            <v-card-subtitle>Desarrollado por Dev Dreams</v-card-subtitle>

                            <p style="margin: 15px;">Nuestro traductor es una herramienta versátil que garantiza una
                                comunicación fluida y precisa en múltiples idiomas. ¡Descubran la comodidad de traducir
                                textos con facilidad y precisión! ¡No esperen más para experimentar su eficacia!</p>
                        </div>

                        <v-avatar class="ma-3" size="125" rounded="0">
                            <v-img src="/1Logo-SinFondo.png"></v-img>
                        </v-avatar>
                    </div>
                </v-card>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <select v-model="idiomaOrigen">
                    <option disabled selected value="">Traducir de...</option>
                    <option v-for="(idioma, i) in listadoATraducir" :key="i" :value="idioma.code">
                        {{ idioma.name }}
                    </option>
                </select>
            </v-col>

            <v-col>
                <select v-model="idiomaResultado">
                    <option disabled selected value="">Traducir a...</option>
                    <option v-for="(idioma, i) in listadoATraducir" :key="i" :value="idioma.code">
                        {{ idioma.name }}
                    </option>
                </select>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>Texto a traducir</v-card-title>
                    <v-card-text>
                        <v-textarea outlined label="Texto a traducir" rows="8" clearable
                            v-model="textoATraducir"></v-textarea>

                        <!-- BOTÓN PARA TRADUCIR -->
                        <v-btn :disabled="desactivarBtn" color="primary" prepend-icon="mdi-translate" @click="traducir">
                            Traducir
                        </v-btn>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col>
                <v-card :loading="cargandoTraduccion">
                    <v-card-title>Texto traducido</v-card-title>
                    <v-card-text>
                        <v-textarea outlined label="Texto traducido" rows="8" v-model="textoTraducido" readonly clearable ref="copiarTexto"></v-textarea>
                        <v-btn color="" prepend-icon="mdi-content-copy" variant="plain" @click="copiarTexto"></v-btn>
                        <v-btn color="" prepend-icon="mdi-help-box" variant="plain">¿Necesitas ayuda?</v-btn>
                    </v-card-text>

                    <!-- SNACKBAR PARA MOSTRAR QUE EL TEXTO HA SIDO COPIADO -->
                    <v-snackbar v-model="snackTextoCopiado">
                        Texto copiado
                        
                        <template v-slot:actions>
                        <v-btn color="pink" variant="text" @click="snackTextoCopiado = false">
                        cerrar
                        </v-btn>
                    </template>
                    </v-snackbar>
                </v-card>
            </v-col>
        </v-row>

        <v-row>
            <v-btn style="margin: 0 auto;" color="warning" @click="traducir">
                ¿Necesitas buscar sinonimos y antonimos?
            </v-btn>
        </v-row>
    </v-container>
</template>


<script>
import axios from 'axios'

export default {
    name: 'TraductorPage',
    data() {
        return {
            listadoATraducir: {},
            listadoTraducido: {},
            textoATraducir: '',
            textoTraducido: '',
            cargandoTraduccion: false,
            desactivarBtn: false,
            snackTextoCopiado: false,
            idiomaOrigen: null,
            idiomaResultado: null
        }
    },
    methods: {
        copiarTexto() {
            // Selecciona el elemento de texto traducido
            const textArea = this.$refs.copiarTexto;

            // Selecciona y copia el texto al portapapeles del navegador
            textArea.select();
            document.execCommand('copy');

            // Deselecciona el texto
            window.getSelection().removeAllRanges();

            // Mostrar el Snackbar
            this.snackTextoCopiado = true;

            // Ocultar el Snackbar después de unos segundos (por ejemplo, 3 segundos)
            setTimeout(() => {
            this.snackTextoCopiado = false;
            }, 3000); // 3000 milisegundos (3 segundos)
        },
        traducir() {
            this.cargandoTraduccion = true
            this.desactivarBtn = true

            const data = new URLSearchParams();
            data.append('source_language', this.idiomaOrigen);
            data.append('target_language', this.idiomaResultado);
            data.append('text', this.textoATraducir);

            axios.post('https://text-translator2.p.rapidapi.com/translate', data, {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'X-RapidAPI-Key': `${this.$store.state.apiKey}`,
                    'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
                },
            })
                .then(response => {
                    this.cargandoTraduccion = false
                    this.desactivarBtn = false
                    this.textoTraducido = response.data.data.translatedText

                })
                .catch(error => {
                    this.cargandoTraduccion = false
                    this.desactivarBtn = false
                    console.log(error)
                })
        },
        obtenerIdiomas() {
            axios.get('https://text-translator2.p.rapidapi.com/getLanguages', {
                headers: {
                    'X-RapidAPI-Key': `${this.$store.state.apiKey}`,
                    'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
                }
            })
                .then(response => {
                    this.listadoATraducir = response.data.data.languages
                    // this.listadoTraducido = response.data
                    console.log(response.data.data.languages)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    },
    mounted() {
        this.obtenerIdiomas()
    }
}
</script>


<style scoped>
select {
    width: 90%;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #ccc;
    /* padding: 5px; */
    margin: 0 auto;
    text-align: center;
}
</style>
<template>
    <v-container fluid>
        <!-- CARD DE BIENVENIDA EN TRADUCTOR -->
        <v-row justify="center">
            <v-col :cols="12" :sm="12" :md="10" :lg="10" :xl="10" :xxl="10">
                <v-card color="blue-grey-lighten-4" variant="flat" theme="dark">
                    <template v-slot:text>
                        <div class="text-h5 text-black">
                            <v-avatar rounded="0" image="/2-Logo-SinFondo.png"></v-avatar> ¡PRUEBA NUESTRO NUEVO TRADUCTOR!
                        </div>
                        <div class="text-subtitle-2 text-grey-darken-3">Desarrollado por dev dreams</div>
                        Nuestro traductor es una herramienta versátil que
                        garantiza una comunicación fluida y precisa en múltiples idiomas. ¡Descubran la comodidad de
                        traducir textos con facilidad y precisión! ¡No esperen más para experimentar su eficacia!
                    </template>
                </v-card>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <label>Traducir desde:</label>
                <select v-model="idiomaOrigen">
                    <option disabled selected value="">Traducir de...</option>
                    <option value="auto">Automatico</option>
                    <option v-for="(idioma, i) in listadoATraducir" :key="i" :value="idioma.code">
                        {{ idioma.name }}
                    </option>
                </select>
            </v-col>

            <v-col>
                <label>Traducción en:</label>
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
                        <v-textarea outlined label="Texto traducido" rows="8" v-model="textoTraducido" readonly clearable
                            ref="copiarTexto"></v-textarea>
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

                    <!-- SNACKBAR PARA MOSTRAR ERROR -->
                    <v-snackbar v-model="snackErrorTraduccion" vertical>
                        <div class="text-subtitle-1 pb-2">¡Te falta ingresar datos!</div>

                        <p>Revisa que hayas introducido "idioma a traducir", "idioma de resultado" y haber introducido un
                            texto para traducir.</p>

                        <template v-slot:actions>
                            <v-btn color="indigo" variant="text" @click="snackbar = false">
                                Cerrar
                            </v-btn>
                        </template>
                    </v-snackbar>
                </v-card>
            </v-col>
        </v-row>

        <v-row v-if="Object.keys(this.$store.state.datosUsuario).length == 0">
            <v-btn style="margin: 0 auto;" color="warning" to="/login">
                Registrate para obtener más beneficios!
            </v-btn>
        </v-row>

        <!-- CARD DE ANTONIMOS Y SINONIMOS -->
        <v-row justify="center">
            <v-col :cols="12" :sm="12" :md="10" :lg="10" :xl="10" :xxl="10">
                <v-card color="blue-grey-lighten-4" variant="flat" theme="dark">
                    <template v-slot:text>
                        <div class="text-h5 text-black">
                            <v-avatar rounded="0" image="/2-Logo-SinFondo.png"></v-avatar>
                            ¡¿NECESITAS ANTONIMOS Y SINONIMOS?!
                        </div>
                        <div class="text-subtitle-2 text-grey-darken-3">¡No esperes más para experimentar la eficacia!</div>
                        Además de ofrecerte un genial traductor, también te ofrecemos un diccionario con sinonimos y
                        antonimos para que puedas ampliar tu vocabulario y mejorar tu comunicación. ¡No esperes más para
                        experimentar su eficacia! ¡Registrate para obtener más beneficios!

                        <br><br>
                        <v-btn style="margin: 2px;" variant="tonal" color="grey-darken-4" to="/diccionario">
                            Ir al diccionario
                        </v-btn>
                        <v-btn style="margin: 2px;" variant="tonal" color="grey-darken-4" to="/favoritos">
                            Buscar sinonimos y antonimos
                        </v-btn>
                    </template>
                </v-card>
            </v-col>
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
            snackErrorTraduccion: false,
            idiomaOrigen: 'auto',
            idiomaResultado: 'es'
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
            if (this.idiomaOrigen == '' || this.idiomaResultado == '' || this.textoATraducir == '') {
                this.snackErrorTraduccion = true

                // Ocultar el Snackbar después de unos segundos (por ejemplo, 3 segundos)
                setTimeout(() => {
                    this.snackErrorTraduccion = false;
                }, 3000); // 3000 milisegundos (3 segundos)

            } else {
                this.cargandoTraduccion = true
                this.desactivarBtn = true

                const data = new URLSearchParams();
                data.append('source_language', this.idiomaOrigen);
                data.append('target_language', this.idiomaResultado);
                data.append('text', this.textoATraducir);

                axios.post('https://text-translator2.p.rapidapi.com/translate', data, {
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                        'X-RapidAPI-Key': `${this.$store.state.apiKeyTraductor}`,
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
            }
        },
        obtenerIdiomas() {
            axios.get('https://text-translator2.p.rapidapi.com/getLanguages', {
                headers: {
                    'X-RapidAPI-Key': `${this.$store.state.apiKeyTraductor}`,
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
    beforeCreate() {
        
    },
    mounted() {
        this.obtenerIdiomas()
    }
}
</script>


<style scoped>
select {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #ccc;
    /* padding: 5px; */
    text-align: center;
}
</style>
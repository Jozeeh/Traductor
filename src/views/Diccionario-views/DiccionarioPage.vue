<template>
    <v-container fluid>
        <v-alert v-model="alerta" type="success" title="Favoritos" text="¡Se ha guardado exitosamente!" closable></v-alert>
        <v-row justify="center">
            <v-col :cols="12" :sm="12" :md="10" :lg="10" :xl="10" :xxl="10">
                <v-card color="blue-grey-lighten-4" variant="flat" theme="dark">
                    <template v-slot:text>
                        <div class="text-h5 text-black">
                            <v-avatar rounded="0" image="/2-Logo-SinFondo.png"></v-avatar> ¡PRUEBA NUESTRO NUEVO DICCIONARIO!
                        </div>
                        <div class="text-subtitle-2 text-grey-darken-3">Desarrollado por dev dreams</div>
                        Nuestro diccionario en línea te permite buscar palabras y obtener sus definiciones, sinónimos y antónimos. Es una herramienta muy útil para estudiantes, profesores y traductores.
                    </template>
                </v-card>
            </v-col>
        </v-row>

        <v-row>
            <v-col :cols="12" :xsm="12" :sm="6" :md="6" :lg="6" :xl="6" :xxl="6">
                <h1>Buscar Definición</h1>
                <v-layout row>
                    <v-text-field label="Palabra" type="text" prepend-icon="mdi-book-search" required id="palabra"
                        v-model="palabra" :disabled="palabraText"></v-text-field>
                    <v-btn v-if="boton == true" class="ma-2" color="indigo" icon="mdi-book-search"
                        @click="buscarYTraducirDefinicion()"></v-btn>
                    <v-btn v-if="boton == false" class="ma-2" color="red" icon="mdi-delete" @click="limpiar(2)"></v-btn>
                </v-layout>
                
                <img v-if="cargando2" src="/mascota.gif" alt="Cargando..." class="imagen-cargando" style="margin: 0 auto;"
                    width="200">
                <div v-if="Object.keys(definicion).length > 0">
                    <v-card max-width="344" color="black" variant="tonal">
                        <v-card-item>
                            <div>

                                <div class="text-h6 mb-1">
                                    {{ palabra }}
                                </div>
                                <div class="text-caption" v-for="(def, i) in definicion" :key="i"><b>{{ i + 1 }}: </b>{{ def }} <br></div>
                            </div>
                        </v-card-item>
                    </v-card>

                </div>
            </v-col>

            <v-col :cols="12" :xsm="12" :sm="6" :md="6" :lg="6" :xl="6" :xxl="6">
                <h1>Buscar Sinonimos o antonimos</h1>
                <v-layout row>
                    <v-text-field label="Palabra" type="text" prepend-icon="mdi-book-search" required id="palabra"
                        v-model="palabra2" :disabled="palabraText2"></v-text-field>
                    <v-select label="Seleccione" :items="['Sinonimos', 'Antonimos']" :disabled="palabraText2"
                        v-model="tipo"></v-select>
                    <v-btn v-if="boton2 == true" class="ma-2" color="indigo" icon="mdi-book-search"
                        @click="buscarYTraducirSinonimosAntonimos()"></v-btn>
                    <v-btn v-if="boton2 == false" class="ma-2" color="red" icon="mdi-delete" @click="limpiar(1)"></v-btn>
                </v-layout>

                <img v-if="cargando" src="/mascota.gif" alt="Cargando..." class="imagen-cargando" width="200">
                <div v-if="sinonimo == true">
                    <v-card max-width="344" color="black" variant="tonal">
                        <v-card-item>
                            <div>

                                <div class="text-h6 mb-1">
                                    {{ palabra2 }}
                                </div>
                                <div v-if="Object.keys(sinonimoAntonimo).length > 0">
                                    <div class="text-caption" v-for="(pa, i) in sinonimoAntonimo" :key="i"><b>{{ i + 1 }}: </b>{{ pa }}</div>
                                </div>
                                <div v-else>
                                    <div class="text-caption">No se han encontrado datos</div>
                                </div>
                                <v-btn v-if="btnFavorito == false" color="red" icon="mdi-heart"
                                    @click="guardarFavoritos()"></v-btn>
                            </div>
                        </v-card-item>
                    </v-card>

                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

import axios from 'axios'
export default {
    data() {
        return {
            palabra: '',
            definicion: {},
            palabraText: false,
            palabra2: '',
            tipo: '',
            sinonimoAntonimo: {},
            palabraText2: false,
            boton: true,
            boton2: true,
            sinonimo: false,
            cargando: false,
            cargando2: false,
            alerta: false,
            btnFavorito: false,
            config: {}
        }
    },
    methods: {
        async getToken() {
            let token = localStorage.getItem('token')
            this.config = {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }
        },

        async buscarDefinicion() {
            const options = {
                method: 'GET',
                url: `https://wordsapiv1.p.rapidapi.com/words/${this.palabra}/definitions`,
                headers: {
                    'X-RapidAPI-Key': '93a55ccf2bmsh5433d0c13f4c136p1967abjsn7f62ce0fe0c6',
                    'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
                }
            };
            this.cargando2 = true

            try {
                const response = await axios.request(options);
                console.log(response.data);
                this.definicion = response.data.definitions[0].definition;
                this.palabraText = true
                this.boton = false
            } catch (error) {
                console.error(error);
            }
            finally {
                this.cargando2 = false
            }
        },

        async buscarSinonimoAntonimo() {
            const axios = require('axios');
            var tipo = ''
            if (this.tipo === 'Sinonimos') {
                tipo = 'synonyms'
            }
            else if (this.tipo === 'Antonimos') {
                tipo = 'antonyms'
            }

            const options = {
                method: 'GET',
                url: `https://wordsapiv1.p.rapidapi.com/words/${this.palabra2}/${tipo}`,
                headers: {
                    'X-RapidAPI-Key': '93a55ccf2bmsh5433d0c13f4c136p1967abjsn7f62ce0fe0c6',
                    'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
                }
            };

            this.cargando = true

            try {
                const response = await axios.request(options);
                if (tipo === 'synonyms') {

                    this.sinonimoAntonimo = response.data.synonyms
                    console.log(this.sinonimoAntonimo);
                    this.palabraText2 = true
                    this.boton2 = false
                    this.sinonimo = true
                }
                else if (tipo === 'antonyms') {
                    console.log(response.data.antonyms);
                    this.sinonimoAntonimo = response.data.antonyms
                    this.palabraText2 = true
                    this.boton2 = false
                    this.sinonimo = true
                }

            } catch (error) {
                console.error(error);
            }
            finally {
                this.cargando = false
            }
        },
        limpiar(i) {
            if (i == 1) {
                this.palabra2 = ''
                this.tipo = ''
                this.sinonimoAntonimo = {}
                this.palabraText2 = false
                this.boton2 = true
                this.sinonimo = false
                this.btnFavorito = false
            } else {
                this.palabra = ''
                this.definicion = ''
                this.palabraText = false
                this.boton = true
            }
        },
        async buscarYTraducirDefinicion() {
            this.cargando2 = true
            try {
                // Traducir la palabra al inglés
                const data = new URLSearchParams();
                data.append('source_language', 'es');
                data.append('target_language', 'en');
                data.append('text', this.palabra);
                const traduccion = await axios.post('https://text-translator2.p.rapidapi.com/translate', data, {
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                        'X-RapidAPI-Key': `${this.$store.state.apiKeyTraductor}`,
                        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
                    },
                });
                const palabraIngles = traduccion.data.data.translatedText;

                // Buscar la definición en inglés
                const options = {
                    method: 'GET',
                    url: `https://wordsapiv1.p.rapidapi.com/words/${palabraIngles}/definitions`,
                    headers: {
                        'X-RapidAPI-Key': '93a55ccf2bmsh5433d0c13f4c136p1967abjsn7f62ce0fe0c6',
                        'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
                    }
                };
                const response = await axios.request(options);
                // Asumiendo que response.data.definitions es un array de objetos
                let definicionesIngles = response.data.definitions;

                // Extraer la propiedad 'definition' de cada objeto en el array
                definicionesIngles = definicionesIngles.map(obj => obj.definition);

                // Crear un array para almacenar las definiciones traducidas
                let definicionesEspanol = await Promise.all(definicionesIngles.map(async definicionIngles => {
                    // Traducir la definición al español
                    data.append('source_language', 'en');
                    data.append('target_language', 'es');
                    data.append('text', definicionIngles);
                    const traduccionDefinicion = await axios.post('https://text-translator2.p.rapidapi.com/translate', data, {
                        headers: {
                            'content-type': 'application/x-www-form-urlencoded',
                            'X-RapidAPI-Key': `${this.$store.state.apiKeyTraductor}`,
                            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
                        },
                    });
                    return traduccionDefinicion.data.data.translatedText;
                }));

                this.palabraText = true;
                this.boton = false;
                this.definicion = definicionesEspanol;
                console.log(definicionesEspanol)

                // Devolver el array de definiciones en español
                return definicionesEspanol;

            } catch (error) {
                console.error(error);
            }
            finally {
                this.cargando2 = false
            }
        },
        async buscarYTraducirSinonimosAntonimos() {
            this.cargando = true
            try {
                // define el tipo de busqueda
                var tipo = ''
                if (this.tipo === 'Sinonimos') {
                    tipo = 'synonyms'
                }
                else if (this.tipo === 'Antonimos') {
                    tipo = 'antonyms'
                }

                // Traducir la palabra al inglés
                const data = new URLSearchParams();
                data.append('source_language', 'es');
                data.append('target_language', 'en');
                data.append('text', this.palabra2);
                const traduccion = await axios.post('https://text-translator2.p.rapidapi.com/translate', data, {
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                        'X-RapidAPI-Key': `${this.$store.state.apiKeyTraductor}`,
                        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
                    },
                });
                const palabraIngles = traduccion.data.data.translatedText;

                // Buscar los sinónimos y antónimos en inglés
                const options = {
                    method: 'GET',
                    url: `https://wordsapiv1.p.rapidapi.com/words/${palabraIngles}/${tipo}`,
                    headers: {
                        'X-RapidAPI-Key': '93a55ccf2bmsh5433d0c13f4c136p1967abjsn7f62ce0fe0c6',
                        'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
                    }
                };
                const response = await axios.request(options);
                var sinonimosIngles = {};

                if (tipo == 'synonyms') {
                    sinonimosIngles = response.data.synonyms;
                } else if (tipo == 'antonyms') {
                    sinonimosIngles = response.data.antonyms;
                }


                // Traducir los sinónimos al español
                const sinonimosEspanol = await Promise.all(sinonimosIngles.map(async sinonimo => {
                    data.append('source_language', 'en');
                    data.append('target_language', 'es');
                    data.append('text', sinonimo);
                    const traduccionSinonimo = await axios.post('https://text-translator2.p.rapidapi.com/translate', data, {
                        headers: {
                            'content-type': 'application/x-www-form-urlencoded',
                            'X-RapidAPI-Key': `${this.$store.state.apiKeyTraductor}`,
                            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
                        },
                    });
                    return traduccionSinonimo.data.data.translatedText;
                }));
                this.palabraText2 = true
                this.boton2 = false
                this.sinonimo = true
                this.sinonimoAntonimo = sinonimosEspanol
                // Devolver los sinónimos en español
                return sinonimosEspanol;
            } catch (error) {
                console.error(error);
            }
            finally {
                this.cargando = false
            }
        },
        guardarFavoritos() {
            var favorito = {
                Palabra: this.palabra2,
                fkIdUsuario: this.$store.state.datosUsuario.id
            }
            console.log(favorito)
            axios.post(`${this.$store.state.ipApi}/api/registrarPalabra`, favorito, this.config)
                .then(response => {
                    console.log(response)
                    this.btnFavorito = true
                    this.alerta = true
                })
                .catch(error => console.log(error))
        }

    },
    created() {
        this.getToken()
    },
    mounted(){
        if(Object.keys(this.$store.state.datosUsuario).length != 0){
            console.log('autorizado')
        }else if(Object.keys(this.$store.state.datosUsuario).length == 0){
            this.$router.push('/home')
        }
    },
    ionViewDidEnter() {
        // this.getToken()
    }
}
</script>

<style scoped>
@keyframes cambioColor {
    0% {
        filter: hue-rotate(0deg);
    }

    50% {
        filter: hue-rotate(180deg);
    }

    100% {
        filter: hue-rotate(360deg);
    }
}

.imagen-cargando {
    animation: cambioColor 2s infinite;
}
</style>

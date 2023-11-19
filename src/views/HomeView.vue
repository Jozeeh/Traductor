<template>
  <div class="home-view">
    <br>
    <v-row justify="center">
      <v-col :cols="12" :sm="12" :md="10" :lg="10" :xl="10" :xxl="10">
        <v-card color="blue-grey-lighten-4" variant="flat" theme="dark">
          <template v-slot:text>
            <div class="text-h5 text-black">
              <v-avatar rounded="0" image="/2-Logo-SinFondo.png"></v-avatar> ¡Bienvenido al Traductor y Diccionario!
            </div>
            <div class="text-subtitle-2 text-grey-darken-3">Desarrollado por dev dreams</div>
            ¡Bienvenido al Traductor y Diccionario en línea! Con nuestra función de "Palabras Favoritas", puedes organizar
            y acceder fácilmente a las palabras que has marcado como tus favoritas. Esta herramienta es ideal para
            aquellos que desean tener un rápido acceso a su selección personal de palabras destacadas, ya sea para
            estudio, referencia o simplemente para enriquecer su vocabulario. ¡Explora y aprovecha al máximo nuestra
            plataforma!
          </template>
        </v-card>
      </v-col>
    </v-row>

    <div class="grid-container">
      <div class="grid-item">
        <h2><a href="/traductor" style="text-decoration: none; color: #666;">Traductor</a></h2>
        <p>Nuestra herramienta de traducción en línea te permite convertir texto de un idioma a otro de manera rápida y
          precisa. Con una amplia gama de idiomas disponibles, es la herramienta perfecta para romper las barreras
          lingüísticas y comunicarte de manera efectiva en cualquier parte del mundo.</p>
      </div>

      <div class="grid-item">
        <h2>Diccionario</h2>
        <p>Explora nuestro completo diccionario en línea para obtener definiciones claras y concisas de palabras en varios
          idiomas. Ya sea que estés buscando el significado preciso de una palabra o expandiendo tu vocabulario, nuestro
          diccionario te brinda información detallada para enriquecer tu comprensión lingüística.</p>
      </div>

      <div class="grid-item">
        <h2>Favoritos</h2>
        <p>La función de "Palabras Favoritas" te permite organizar y acceder fácilmente a las palabras que has marcado
          como tus favoritas. Ya sea para estudio, referencia o simplemente para enriquecer tu vocabulario, esta
          herramienta personalizable te ofrece un acceso rápido a tu selección personal de palabras destacadas.</p>
      </div>

      <div class="grid-item">
        <h2>Beneficios de estar registrado</h2>
        <ul>
          <li>Acceso a traducciones personalizadas</li>
          <li>Guarda tus palabras favoritas en el diccionario</li>
          <li>Experiencia sin publicidad</li>
          <!-- Agrega más beneficios según tus necesidades -->
        </ul>
      </div>
    </div>

    <v-row v-if="Object.keys(this.$store.state.datosUsuario).length == 0">
            <v-btn style="margin: 0 auto;" color="warning" to="/login">
                Registrate para obtener más beneficios!
            </v-btn>
        </v-row>
  </div>
</template>

<style>
.home-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
  margin-top: 20px;
}

.grid-item {
  background-color: #f1f1f1;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #333;
}

h2 {
  color: #666;
}

ul {
  list-style-type: none;
  padding: 0;
}</style>
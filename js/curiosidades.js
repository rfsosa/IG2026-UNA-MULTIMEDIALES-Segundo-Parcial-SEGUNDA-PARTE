/* =========================================================
   curiosidades.js
   Funcionalidad: mostrar un dato curioso al azar sobre
   Casey Reas cada vez que el usuario presiona el botón.
   Se utiliza únicamente en index.html.
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  // Elementos del DOM con los que trabaja este script.
  const botonDatoCurioso = document.querySelector("#btn-dato-curioso");
  const textoDatoCurioso = document.querySelector("#dato-curioso-texto");

  // Arreglo con los datos curiosos disponibles.
  const datosCuriosos = [
    "Casey Reas es co-creador de Processing, un lenguaje de programación visual diseñado para artistas y estudiantes de diseño.",
    "Junto a Ben Fry desarrolló Processing como una herramienta educativa en el MIT Media Lab en 2001.",
    "Su obra artística se basa en la escritura de algoritmos que generan imágenes en constante cambio.",
    "Está influenciado por el arte conceptual y sistemático, especialmente por las instrucciones visuales de Sol LeWitt.",
    "Ha realizado exposiciones en museos como el MoMA, el Centre Pompidou y el ICA de Londres.",
    "Muchas de sus obras son generadas en tiempo real, por lo que nunca se ven exactamente igual dos veces.",
    "Publicó libros fundamentales sobre programación creativa, como Processing: A Programming Handbook for Visual Designers and Artists.",
    "Ha trabajado como profesor en el Departamento de Diseño de Medios en la UCLA (Universidad de California, Los Ángeles).",
    "Explora el arte generativo como un proceso basado en reglas simples que producen resultados complejos y emergentes.",
    "Además de visuales digitales, ha realizado impresiones generativas de gran formato como obras únicas o en series."
  ];

  // Guarda el índice mostrado la última vez, para evitar
  // repetir el mismo dato dos veces seguidas.
  let ultimoIndiceMostrado = -1;

  function mostrarDatoAleatorio() {
    let indiceAleatorio = Math.floor(Math.random() * datosCuriosos.length);

    // Si el arreglo tiene más de un elemento, se evita repetir
    // el mismo dato que ya se estaba mostrando.
    while (indiceAleatorio === ultimoIndiceMostrado && datosCuriosos.length > 1) {
      indiceAleatorio = Math.floor(Math.random() * datosCuriosos.length);
    }

    ultimoIndiceMostrado = indiceAleatorio;
    textoDatoCurioso.innerText = datosCuriosos[indiceAleatorio];
  }

  if (botonDatoCurioso && textoDatoCurioso) {
    botonDatoCurioso.addEventListener("click", mostrarDatoAleatorio);
  }

});
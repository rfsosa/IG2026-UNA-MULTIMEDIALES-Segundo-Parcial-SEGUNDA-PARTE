/* =========================================================
   galeria.js
   Funcionalidad: generar dinámicamente la galería de obras
   de Casey Reas a partir de un arreglo de datos, y permitir
   cambiar su diseño (tamaño de las imágenes y paleta de
   colores). Se utiliza únicamente en obra.html.
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  const contenedorGaleria = document.querySelector("#galeria");

  // Si esta página no tiene galería, no se ejecuta nada más.
  if (!contenedorGaleria) {
    return;
  }

  // Listado de obras utilizado para generar la galería.
  // Cada objeto representa una obra: título, año e imagen.
  const obras = [
    { titulo: "ATOMISM", anio: 2016, imagen: "img/reas-1.jpg" },
    { titulo: "Path", anio: 2001, imagen: "img/reas-2.jpg" },
    { titulo: "Still Life (HSB E)", anio: 2023, imagen: "img/reas-3.jpg" },
    { titulo: "Untitled film still 5.8", anio: 2019, imagen: "img/reas-4.jpg" },
    { titulo: "AAI (Anarchic Artificial Intelligence)", anio: 2017, imagen: "img/reas-5.jpg" }
  ];

  // Por cada obra del arreglo se arma el HTML de una tarjeta
  // con su imagen, título y año, usando template strings.
  let htmlGaleria = "";

  obras.forEach(function (obra) {
    htmlGaleria += `
      <article class="tarjeta-obra">
        <img src="${obra.imagen}" alt="Obra de Casey Reas: ${obra.titulo}">
        <div class="info-obra">
          <h3>${obra.titulo}</h3>
          <p>${obra.anio}</p>
        </div>
      </article>
    `;
  });

  contenedorGaleria.innerHTML = htmlGaleria;

  /* -----------------------------------------------------
     Cambio de diseño de la galería.
     Dos controles independientes: tamaño de las imágenes
     y paleta de colores. Cada uno aplica estilos directos
     sobre las tarjetas ya generadas.
     ----------------------------------------------------- */

  const botonTamano = document.querySelector("#btn-tamano");
  const botonPaleta = document.querySelector("#btn-paleta");

  let tamanoGrande = false;
  let paletaActiva = false;

  // Recorre todas las tarjetas y les aplica el estilo que
  // corresponda según el estado actual de tamanoGrande y
  // paletaActiva.
  function actualizarEstiloGaleria() {
    const tarjetas = document.querySelectorAll(".tarjeta-obra");

    tarjetas.forEach(function (tarjeta) {
      const imagen = tarjeta.querySelector("img");

      if (tamanoGrande) {
        tarjeta.style.maxWidth = "22rem";
        imagen.style.height = "16rem";
      } else {
        tarjeta.style.maxWidth = "16rem";
        imagen.style.height = "11rem";
      }

      if (paletaActiva) {
        imagen.style.filter = "hue-rotate(140deg) saturate(1.6) contrast(1.1)";
        tarjeta.style.borderColor = "#ffb84d";
        tarjeta.style.borderWidth = "2px";
      } else {
        imagen.style.filter = "none";
        tarjeta.style.borderColor = "";
        tarjeta.style.borderWidth = "1px";
      }
    });
  }

  if (botonTamano) {
    botonTamano.addEventListener("click", function () {
  tamanoGrande = !tamanoGrande;
  if (tamanoGrande) {
    botonTamano.innerText = "Vista compacta";
  } else {
    botonTamano.innerText = "Cambiar tamaño";
  }
  actualizarEstiloGaleria();
});
  }

  if (botonPaleta) {
    botonPaleta.addEventListener("click", function () {
  paletaActiva = !paletaActiva;
  if (paletaActiva) {
    botonPaleta.innerText = "Paleta original";
  } else {
    botonPaleta.innerText = "Cambiar paleta";
  }
  actualizarEstiloGaleria();
});
  }

});

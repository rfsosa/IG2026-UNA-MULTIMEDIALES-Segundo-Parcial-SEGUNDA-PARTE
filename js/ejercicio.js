/* =========================================================
   ejercicio.js
   Resolución del ejercicio: gestión de la producción de
   instalaciones interactivas del estudio de Casey Reas.
   Se utiliza únicamente en ejercicio.html.

   Flujo del ejercicio (cada paso habilita al siguiente):
   1) Se ingresa la cantidad de instalaciones a producir.
   2) Se cargan los datos de cada instalación (nombre,
      personas necesarias, días de producción) hasta
      completar la cantidad indicada en el paso 1.
   3) Se ingresan los datos generales del estudio (horas
      por día y valor del honorario por hora).
   4) Se calculan los resultados y se habilita el botón
      para reiniciar el ejercicio.
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* =======================================================
     Referencias a los elementos del DOM
     ======================================================= */

  // Paso 1: cantidad de instalaciones
  const formCantidad = document.querySelector("#form-cantidad");
  const inputCantidad = document.querySelector("#input-cantidad");
  const errorCantidad = document.querySelector("#error-cantidad");
  const botonConfirmarCantidad = document.querySelector("#btn-confirmar-cantidad");

  // Si esta página no tiene el formulario principal, el
  // script no continúa (evita errores en otras páginas).
  if (!formCantidad) {
    return;
  }

  // Paso 2: datos de cada instalación
  const pasoInstalaciones = document.querySelector("#paso-instalaciones");
  const formInstalacion = document.querySelector("#form-instalacion");
  const inputNombre = document.querySelector("#input-nombre");
  const inputPersonas = document.querySelector("#input-personas");
  const inputDias = document.querySelector("#input-dias");
  const errorInstalacion = document.querySelector("#error-instalacion");
  const botonAgregarInstalacion = document.querySelector("#btn-agregar-instalacion");
  const contadorInstalaciones = document.querySelector("#contador-instalaciones");
  const listaInstalaciones = document.querySelector("#lista-instalaciones");

  // Paso 3: datos generales del estudio
  const pasoGeneral = document.querySelector("#paso-general");
  const formGeneral = document.querySelector("#form-general");
  const inputHoras = document.querySelector("#input-horas");
  const inputValorHora = document.querySelector("#input-valor-hora");
  const errorGeneral = document.querySelector("#error-general");
  const botonConfirmarGeneral = document.querySelector("#btn-confirmar-general");

  // Paso 4: resultados
  const pasoResultados = document.querySelector("#paso-resultados");
  const botonCalcular = document.querySelector("#btn-calcular");
  const panelResultados = document.querySelector("#panel-resultados");
  const botonReiniciar = document.querySelector("#btn-reiniciar");

  /* =======================================================
     Estado del ejercicio
     ======================================================= */

  let cantidadInstalaciones = 0;   // cantidad total a cargar, definida en el paso 1
  let instalaciones = [];          // arreglo de objetos { nombre, personas, dias }
  let horasPorDia = 0;
  let valorHoraTrabajo = 0;

  /* =======================================================
     Funciones auxiliares
     ======================================================= */

  // Muestra un mensaje de error en el párrafo indicado.
  function mostrarError(elementoError, mensaje) {
    elementoError.innerText = mensaje;
  }

  // Limpia el mensaje de error del párrafo indicado.
  function limpiarError(elementoError) {
    elementoError.innerText = "";
  }

  // Da formato de moneda a un número (dos decimales).
function formatoMoneda(numero) {
  const numeroRedondeado = Math.round(numero * 100) / 100;
  return "$" + numeroRedondeado;
}

  /* =======================================================
     Paso 1: confirmar la cantidad de instalaciones
     ======================================================= */

  formCantidad.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const valorIngresado = Number(inputCantidad.value);

    // Validación: debe ser un número entero mayor a 0.
    if (inputCantidad.value === "" || valorIngresado <= 0 || valorIngresado % 1 !== 0) {
      mostrarError(errorCantidad, "Ingresá un número entero mayor a 0.");
      return;
    }

    limpiarError(errorCantidad);
    cantidadInstalaciones = valorIngresado;

    // Se deshabilita el paso 1: la cantidad ya quedó fijada.
    inputCantidad.disabled = true;
    botonConfirmarCantidad.disabled = true;

    // Se habilita el paso 2 y se actualiza el contador.
    pasoInstalaciones.style.display = "block";
    actualizarContadorInstalaciones();
  });

  /* =======================================================
     Paso 2: cargar los datos de cada instalación
     ======================================================= */

  function actualizarContadorInstalaciones() {
    contadorInstalaciones.innerText =
      `Instalaciones cargadas: ${instalaciones.length} / ${cantidadInstalaciones}`;
  }

  formInstalacion.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nombreIngresado = inputNombre.value;
    const personasIngresadas = Number(inputPersonas.value);
    const diasIngresados = Number(inputDias.value);

    // Validación de los tres campos del formulario.
    if (nombreIngresado === "") {
      mostrarError(errorInstalacion, "Ingresá el nombre de la instalación.");
      return;
    }
    if (inputPersonas.value === "" || personasIngresadas <= 0 || personasIngresadas % 1 !== 0) {
      mostrarError(errorInstalacion, "La cantidad de personas debe ser un número entero mayor a 0.");
      return;
    }
    if (inputDias.value === "" || diasIngresados <= 0 || diasIngresados % 1 !== 0) {
      mostrarError(errorInstalacion, "Los días de producción deben ser un número entero mayor a 0.");
      return;
    }

    limpiarError(errorInstalacion);

    // Se guarda la instalación cargada en el arreglo.
    const nuevaInstalacion = {
      nombre: nombreIngresado,
      personas: personasIngresadas,
      dias: diasIngresados
    };
    instalaciones.push(nuevaInstalacion);

    // Se agrega un elemento a la lista visual de instalaciones.
    listaInstalaciones.innerHTML += `
      <li>${nuevaInstalacion.nombre} — ${nuevaInstalacion.personas} persona/s, ${nuevaInstalacion.dias} día/s de producción</li>
    `;

    // Se limpia el formulario para cargar la próxima instalación.
    inputNombre.value = "";
    inputPersonas.value = "";
    inputDias.value = "";
    actualizarContadorInstalaciones();

    // Cuando se completa la cantidad indicada en el paso 1,
    // se deshabilita el formulario de carga y se habilita el paso 3.
    if (instalaciones.length === cantidadInstalaciones) {
      inputNombre.disabled = true;
      inputPersonas.disabled = true;
      inputDias.disabled = true;
      botonAgregarInstalacion.disabled = true;

      pasoGeneral.style.display = "block";
    }
  });

  /* =======================================================
     Paso 3: datos generales del estudio
     ======================================================= */

  formGeneral.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const horasIngresadas = Number(inputHoras.value);
    const valorHoraIngresado = Number(inputValorHora.value);

    if (inputHoras.value === "" || horasIngresadas <= 0 || horasIngresadas % 1 !== 0) {
      mostrarError(errorGeneral, "Ingresá una cantidad de horas por día mayor a 0.");
      return;
    }
    if (inputValorHora.value === "" || valorHoraIngresado <= 0) {
      mostrarError(errorGeneral, "Ingresá un valor de honorario por hora mayor a 0.");
      return;
    }

    limpiarError(errorGeneral);
    horasPorDia = horasIngresadas;
    valorHoraTrabajo = valorHoraIngresado;

    // Se deshabilita el paso 3, ya que los datos quedaron fijados.
    inputHoras.disabled = true;
    inputValorHora.disabled = true;
    botonConfirmarGeneral.disabled = true;

    // Recién ahora se habilita el paso 4: el cálculo de resultados
    // requiere que todos los datos anteriores ya estén cargados.
    pasoResultados.style.display = "block";
    botonCalcular.disabled = false;
  });

  /* =======================================================
     Paso 4: cálculo de resultados
     ======================================================= */

  botonCalcular.addEventListener("click", function () {

    // 1) Costo total de un día de trabajo, considerando a
    //    todas las personas que trabajan en el estudio.
    let totalPersonas = 0;
    instalaciones.forEach(function (instalacion) {
      totalPersonas += instalacion.personas;
    });
    const costoDiaCompleto = totalPersonas * horasPorDia * valorHoraTrabajo;

    // 2) Instalación con más días de producción y su costo total.
    let instalacionMasDias = instalaciones[0];
    instalaciones.forEach(function (instalacion) {
      if (instalacion.dias > instalacionMasDias.dias) {
        instalacionMasDias = instalacion;
      }
    });
    const costoInstalacionMasDias =
      instalacionMasDias.personas * instalacionMasDias.dias * horasPorDia * valorHoraTrabajo;

    // 3) Porcentaje que representa esa instalación sobre el
    //    costo total del estudio (con todas las instalaciones).
    let costoTotalEstudio = 0;
    instalaciones.forEach(function (instalacion) {
      costoTotalEstudio += instalacion.personas * instalacion.dias * horasPorDia * valorHoraTrabajo;
    });
    const porcentajeInstalacionMasDias = (costoInstalacionMasDias / costoTotalEstudio) * 100;

    // Se muestran los tres resultados en pantalla usando
    // template strings.
    panelResultados.innerHTML = `
      <div class="resultado-item">
        <h3>Costo de un día de trabajo del estudio</h3>
        <p>${formatoMoneda(costoDiaCompleto)} (${totalPersonas} persona/s en total)</p>
      </div>
      <div class="resultado-item">
        <h3>Instalación con más días de producción</h3>
        <p>${instalacionMasDias.nombre} — ${instalacionMasDias.dias} día/s — costo total: ${formatoMoneda(costoInstalacionMasDias)}</p>
      </div>
      <div class="resultado-item">
        <h3>Porcentaje sobre el costo total del estudio</h3>
        <p>${Math.round(porcentajeInstalacionMasDias * 100) / 100}% del costo total (${formatoMoneda(costoTotalEstudio)})</p>
      </div>
    `;

    // Una vez obtenidos los resultados se deshabilita el botón
    // de cálculo y se habilita el botón para reiniciar.
    botonCalcular.disabled = true;
    botonReiniciar.disabled = false;
  });

  /* =======================================================
     Reiniciar el ejercicio
     ======================================================= */

  botonReiniciar.addEventListener("click", function () {

    // Se reinicia el estado del ejercicio.
    cantidadInstalaciones = 0;
    instalaciones = [];
    horasPorDia = 0;
    valorHoraTrabajo = 0;

    // Paso 1: se limpia y se vuelve a habilitar.
    inputCantidad.value = "";
    limpiarError(errorCantidad);
    inputCantidad.disabled = false;
    botonConfirmarCantidad.disabled = false;

    // Paso 2: se limpia, se vuelve a habilitar y se oculta.
    inputNombre.value = "";
    inputPersonas.value = "";
    inputDias.value = "";
    limpiarError(errorInstalacion);
    inputNombre.disabled = false;
    inputPersonas.disabled = false;
    inputDias.disabled = false;
    botonAgregarInstalacion.disabled = false;
    listaInstalaciones.innerHTML = "";
    contadorInstalaciones.innerText = "";
    pasoInstalaciones.style.display = "none";

    // Paso 3: se limpia, se vuelve a habilitar y se oculta.
    inputHoras.value = "";
    inputValorHora.value = "";
    limpiarError(errorGeneral);
    inputHoras.disabled = false;
    inputValorHora.disabled = false;
    botonConfirmarGeneral.disabled = false;
    pasoGeneral.style.display = "none";

    // Paso 4: se limpian los resultados y se oculta.
    panelResultados.innerHTML = "";
    botonCalcular.disabled = true;
    botonReiniciar.disabled = true;
    pasoResultados.style.display = "none";
  });

});
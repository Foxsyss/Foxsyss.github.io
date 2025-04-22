function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('abierto');
}

// Crear personaje
function crearPersonaje(personaje = null) {
  const contenedor = document.getElementById('contenedorPersonajes');

  const expediente = document.createElement('div');
  expediente.className = 'expediente';

  expediente.innerHTML = `
    <label class="avatar-container">
  <div class="image-wrapper">
    <img src="${personaje ? personaje.imagen : 'img/avatar-default.png'}" alt="Avatar">
    <div class="subtexto">Presione para cargar</div>
    <input type="file" accept="image/*">
  </div>
</label>

<div class="info-container">
  <input type="text" placeholder="Nombre del personaje" value="${personaje ? personaje.nombre : ''}">
</div>

<button class="eliminar-btn">Eliminar</button>

  `;

  // Evento para cambiar imagen
  expediente.querySelector('input[type="file"]').addEventListener('change', function(event) {
    const archivo = event.target.files[0];
    if (archivo) {
      const lector = new FileReader();
      lector.onload = function(e) {
        expediente.querySelector('img').src = e.target.result;
        guardarPersonajes();
      }
      lector.readAsDataURL(archivo);
    }
  });

  // Evento para cambiar nombre
  expediente.querySelector('input[type="text"]').addEventListener('input', function() {
    guardarPersonajes();
  });

  // Eliminar personaje
  expediente.querySelector('.eliminar-btn').addEventListener('click', function() {
    expediente.remove();
    guardarPersonajes();
  });

  contenedor.appendChild(expediente);
  guardarPersonajes();
}

// Guardar todos los personajes en localStorage
function guardarPersonajes() {
  const expedientes = document.querySelectorAll('.expediente');
  const personajes = [];

  expedientes.forEach(expediente => {
    const nombre = expediente.querySelector('input[type="text"]').value;
    const imagen = expediente.querySelector('img').src;
    personajes.push({ nombre, imagen });
  });

  localStorage.setItem('personajes', JSON.stringify(personajes));
}

// Cargar personajes desde localStorage
function cargarPersonajes() {
  const datos = localStorage.getItem('personajes');
  if (datos) {
    const personajes = JSON.parse(datos);
    personajes.forEach(p => crearPersonaje(p));
  }
}

// Inicializar
window.onload = cargarPersonajes;

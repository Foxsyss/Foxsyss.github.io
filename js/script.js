function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('abierto');
}

function crearPersonaje() {
  const contenedor = document.getElementById('contenedorPersonajes');

  const expediente = document.createElement('div');
  expediente.className = 'expediente';

  expediente.innerHTML = `
    <label>
      <img src="img/avatar-default.png" alt="Avatar">
      <div class="subtexto">Presione para cargar</div>
      <input type="file" accept="image/*">
    </label>
    <input type="text" placeholder="Nombre del personaje">
    <button class="eliminar-btn">Eliminar</button>
  `;

  // Cargar imagen personalizada
  expediente.querySelector('input[type="file"]').addEventListener('change', function(event) {
    const archivo = event.target.files[0];
    if (archivo) {
      const lector = new FileReader();
      lector.onload = function(e) {
        expediente.querySelector('img').src = e.target.result;
      }
      lector.readAsDataURL(archivo);
    }
  });

  // Eliminar tarjeta
  expediente.querySelector('.eliminar-btn').addEventListener('click', function() {
    expediente.remove();
  });

  contenedor.appendChild(expediente);
}

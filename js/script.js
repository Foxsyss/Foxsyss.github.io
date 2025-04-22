document.getElementById('cargarImagen').addEventListener('change', function(event) {
  const archivo = event.target.files[0];
  if (archivo) {
    const lector = new FileReader();
    lector.onload = function(e) {
      document.getElementById('fotoAvatar').src = e.target.result;
    }
    lector.readAsDataURL(archivo);
  }
});

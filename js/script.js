let puntos = 0;
const maxPuntos = 5;

function agregarGear() {
  const select = document.getElementById("gearSelect");
  const valor = select.value;
  if (!valor) return;

  const costo = parseInt(valor.match(/\d+/)[0]);
  if (puntos + costo > maxPuntos) {
    alert("¡Supera el máximo de puntos!");
    select.value = "";
    return;
  }

  puntos += costo;

  const tag = document.createElement("div");
  tag.className = "gear-tag";
  tag.textContent = valor;

  const btn = document.createElement("button");
  btn.innerText = "×";
  btn.onclick = () => {
    tag.remove();
    puntos -= costo;
    actualizarPuntos();
  };

  tag.appendChild(btn);
  document.getElementById("gearList").appendChild(tag);

  actualizarPuntos();
  select.value = "";
}

function actualizarPuntos() {
  document.getElementById("puntos").textContent = `Total de Puntos ${puntos}/5`;
}

function crearPersonaje() {
  alert("Función para crear personaje en desarrollo...");
}

const statsPorArma = {
  "Escopeta": {
    Nombre: "Escopeta",
    Daño: 8,
    Alcance: 2,
    Precisión: 5,
    Munición: 4,
    Recarga: "Media",
    Ruido: "Alto"
  },
  "Pistola": {
    Nombre: "Pistola",
    Daño: 4,
    Alcance: 5,
    Precisión: 7,
    Munición: 8,
    Recarga: "Rápida",
    Ruido: "Bajo"
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const armaSelect = document.querySelector('select:nth-of-type(2)');
  const tablaContenedor = document.getElementById("tablaArmaSecundaria");

  armaSelect.addEventListener("change", (e) => {
    const arma = e.target.value;
    const stats = statsPorArma[arma];
    if (!stats) {
      tablaContenedor.innerHTML = "";
      return;
    }

    const headers = Object.keys(stats);
    const values = Object.values(stats);

    const tablaHTML = `
      <table>
        <tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr>
        <tr>${values.map(v => `<td>${v}</td>`).join("")}</tr>
      </table>
    `;

    tablaContenedor.innerHTML = tablaHTML;
  });
});

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

// =================== EXPERTISE STATS ===================
const statsPorExpertise = {
  "Asalto":   { MA: 3, D: 2, H: 1, MDP: 0 },
  "Médico":   { MA: 1, D: 1, H: 2, MDP: 3 },
  "Francotirador": { MA: 2, D: 1, H: 4, MDP: 0 },
};

document.addEventListener("DOMContentLoaded", () => {
  const expertiseSelect = document.getElementById("expertiseSelect");
  
  expertiseSelect.addEventListener("change", (e) => {
    const valor = e.target.value;
    const stats = statsPorExpertise[valor];
    if (!stats) return;

    document.getElementById("stat-ma").textContent = stats.MA;
    document.getElementById("stat-d").textContent = stats.D;
    document.getElementById("stat-h").textContent = stats.H;
    document.getElementById("stat-mdp").textContent = stats.MDP;
  });
});

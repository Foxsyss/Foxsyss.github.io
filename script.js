const personajes = [];
let editingPersonaje = null;

const addPersonajeBtn = document.getElementById('addPersonajeBtn');
const formPopup = document.getElementById('formPopup');
const closeFormBtn = document.getElementById('closeFormBtn');
const savePersonajeBtn = document.getElementById('savePersonajeBtn');
const personajesContainer = document.getElementById('personajes');

addPersonajeBtn.addEventListener('click', () => {
  editingPersonaje = null;
  document.getElementById('name').value = '';
  document.getElementById('avatarInput').value = '';
  document.getElementById('description').value = '';
  formPopup.style.display = 'flex';
});

closeFormBtn.addEventListener('click', () => {
  formPopup.style.display = 'none';
});

savePersonajeBtn.addEventListener('click', () => {
  const name = document.getElementById('name').value;
  const avatarInput = document.getElementById('avatarInput').files[0];
  const description = document.getElementById('description').value;
  const classValue = document.getElementById('class').value;
  const raceValue = document.getElementById('race').value;
  const elementValue = document.getElementById('element').value;
  const weaponValue = document.getElementById('weapon').value;
  const mountValue = document.getElementById('mount').value;
  const specialAbilityValue = document.getElementById('specialAbility').value;

  if (!name) return alert("¡El nombre es obligatorio!");

  const personaje = {
    name,
    avatar: avatarInput ? URL.createObjectURL(avatarInput) : 'https://via.placeholder.com/150',
    description,
    class: classValue,
    race: raceValue,
    element: elementValue,
    weapon: weaponValue,
    mount: mountValue,
    specialAbility: specialAbilityValue
  };

  if (editingPersonaje) {
    // Editar personaje existente
    personajes[editingPersonaje] = personaje;
  } else {
    // Agregar nuevo personaje
    personajes.push(personaje);
  }

  formPopup.style.display = 'none';
  renderPersonajes();
});

function renderPersonajes() {
  personajesContainer.innerHTML = '';

  personajes.forEach((personaje, index) => {
    const ficha = document.createElement('div');
    ficha.className = 'ficha';
    
    ficha.innerHTML = `
      <img src="${personaje.avatar}" alt="${personaje.name}" />
      <h3>${personaje.name}</h3>
      <p><strong>Clase:</strong> ${personaje.class}</p>
      <p><strong>Raza:</strong> ${personaje.race}</p>
      <p><strong>Elemento:</strong> ${personaje.element}</p>
      <p><strong>Arma:</strong> ${personaje.weapon}</p>
      <p><strong>Montura:</strong> ${personaje.mount}</p>
      <p><strong>Habilidad Especial:</strong> ${personaje.specialAbility}</p>
      <p><strong>Descripción:</strong> ${personaje.description}</p>
      <div class="btns">
        <button onclick="editPersonaje(${index})">Editar</button>
        <button onclick="deletePersonaje(${index})">Eliminar</button>
        <button onclick="downloadPDF(${index})">Descargar PDF</button>
      </div>
    `;

    personajesContainer.appendChild(ficha);
  });
}

function editPersonaje(index) {
  const personaje = personajes[index];
  editingPersonaje = index;

  document.getElementById('name').value = personaje.name;
  document.getElementById('avatarInput').value = '';
  document.getElementById('description').value = personaje.description;
  document.getElementById('class').value = personaje.class;
  document.getElementById('race').value = personaje.race;
  document.getElementById('element').value = personaje.element;
  document.getElementById('weapon').value = personaje.weapon;
  document.getElementById('mount').value = personaje.mount;
  document.getElementById('specialAbility').value = personaje.specialAbility;

  formPopup.style.display = 'flex';
}

function deletePersonaje(index) {
  personajes.splice(index, 1);
  renderPersonajes();
}

function downloadPDF(index) {
  const personaje = personajes[index];
  const element = document.createElement('div');
  element.innerHTML = `
    <h1>${personaje.name}</h1>
    <img src="${personaje.avatar}" alt="${personaje.name}" />
    <p><strong>Clase:</strong> ${personaje.class}</p>
    <p><strong>Raza:</strong> ${personaje.race}</p>
    <p><strong>Elemento:</strong> ${personaje.element}</p>
    <p><strong>Arma:</strong> ${personaje.weapon}</p>
   

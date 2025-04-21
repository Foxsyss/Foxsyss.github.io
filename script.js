const personajes = [];
let editingPersonaje = null;

const addPersonajeBtn = document.getElementById('addPersonajeBtn');
const formPopup = document.getElementById('formPopup');
const closeFormBtn = document.getElementById('closeFormBtn');
const savePersonajeBtn = document.getElementById('savePersonajeBtn');
const personajesContainer = document.getElementById('personajes');
const avatarInput = document.getElementById('avatar');
const avatarPreview = document.getElementById('avatarPreview');
const nameInput = document.getElementById('name');

addPersonajeBtn.addEventListener('click', () => {
  editingPersonaje = null;
  nameInput.value = '';
  avatarInput.value = '';
  avatarPreview.src = 'https://via.placeholder.com/150'; // Reset avatar preview
  formPopup.style.display = 'flex';
});

closeFormBtn.addEventListener('click', () => {
  formPopup.style.display = 'none';
});

avatarInput.addEventListener('change', () => {
  const file = avatarInput.files[0];
  if (file) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

savePersonajeBtn.addEventListener('click', () => {
  const name = nameInput.value;
  const avatar = avatarPreview.src;
  
  if (!name) {
    alert("¡El nombre es obligatorio!");
    return;
  }

  const personaje = {
    name,
    avatar,
  };

  if (editingPersonaje !== null) {
    // Editar personaje existente
    personajes[editingPersonaje] = personaje;
  } else {
    // Crear nuevo personaje
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
      <button onclick="editPersonaje(${index})">Editar</button>
      <button onclick="deletePersonaje(${index})">Eliminar</button>
    `;

    personajesContainer.appendChild(ficha);
  });
}

function editPersonaje(index) {
  const personaje = personajes[index];
  editingPersonaje = index;

  nameInput.value = personaje.name;
  avatarPreview.src = personaje.avatar;
  formPopup.style.display = 'flex';
}

function deletePersonaje(index) {
  personajes.splice(index, 1);
  renderPersonajes();
}

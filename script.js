const avatarInput = document.getElementById('avatarInput');
const avatarPreview = document.getElementById('avatarPreview');
const nameInput = document.getElementById('nameInput');
const experienceInput = document.getElementById('experienceInput');
const addBtn = document.getElementById('addBtn');
const teamContainer = document.getElementById('teamContainer');

const experiences = {
  "Raiders": "+1 to MA",
  "Counter Terrorist": "Re-roll 1 Shooting Attack per round (must re-roll all dice)",
  "Hostage Rescue": "+1 to each Roll off to see which Warrior Team activates first in the next round",
  "Counter Insurgency": "-1 to the opponent’s Activation Roll once per round (can choose after they’ve rolled)",
  "Covert Ops": "Extend the length and width of the deployment zone by 3”",
  "Reconnaissance": "Re-roll 1 Armour Save per round (must re-roll all dice)"
};

avatarInput.addEventListener('change', () => {
  const file = avatarInput.files[0];
  if (file) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

addBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  const avatar = avatarPreview.src;
  const experience = experienceInput.value;

  if (!name || !experience) {
    alert("Por favor completa el nombre y la experiencia.");
    return;
  }

  const card = document.createElement('div');
  card.className = 'card';

  card.innerHTML = `
    <img src="${avatar}" alt="${name}" />
    <h3>${name}</h3>
    <strong>${experience}</strong>
    <p>${experiences[experience]}</p>
    <div class="actions">
      <button onclick="downloadPDF(this)">PDF</button>
      <button onclick="this.closest('.card').remove()">Eliminar</button>
    </div>
  `;

  teamContainer.appendChild(card);

  // Reset inputs
  nameInput.value = '';
  experienceInput.value = '';
  avatarPreview.src = 'https://via.placeholder.com/150';
});

function downloadPDF(button) {
  const card = button.closest('.card');
  const opt = {
    margin: 0.5,
    filename: 'personaje.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(card).save();
}

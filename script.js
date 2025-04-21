const avatarInput = document.getElementById('avatarInput');
const avatarPreview = document.getElementById('avatarPreview');
const nameInput = document.getElementById('nameInput');
const experienceInput = document.getElementById('experienceInput');
const addBtn = document.getElementById('addBtn');
const teamContainer = document.getElementById('teamContainer');
const defaultAvatar = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png';

const experiences = {
  'Raiders': '+1 to MA',
  'Counter Terrorist': 'Re-roll 1 Shooting Attack per round (must re-roll all dice)',
  'Hostage Rescue': '+1 to each Roll off to see which Warrior Team activates first in the next round',
  'Counter Insurgency': '-1 to the opponent’s Activation Roll once per round (can choose after they’ve rolled)',
  'Covert Ops': 'Extend the length and width of the deployment zone by 3”',
  'Reconnaissance': 'Re-roll 1 Armour Save per round (must re-roll all dice)'
};

avatarInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      avatarPreview.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});

addBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  const experience = experienceInput.value;
  const avatar = avatarPreview.src || defaultAvatar;

  if (!name || !experience || experience === 'Seleccionar experiencia') {
    alert('Por favor completa todos los campos.');
    return;
  }

  const card = document.createElement('div');
  card.className = 'card';

  card.innerHTML = `
    <div class="card-top">
      <img src="${avatar}" alt="${name}" class="card-avatar" />
      <div class="card-info">
        <h3>${name}</h3>
        <div class="card-exp">
          <strong>${experience}</strong>
          <p>${experiences[experience]}</p>
        </div>
      </div>
    </div>
    <div class="stats-table">
      <table>
        <thead>
          <tr>
            <th colspan="2">MA</th>
            <th colspan="3">Hearts</th>
            <th colspan="3">Hits on</th>
            <th colspan="3">MDP</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="2">ALL</td>
            <td><input type="text" /></td>
            <td><input type="text" /></td>
            <td><input type="text" /></td>
            <td><input type="text" /></td>
            <td><input type="text" /></td>
            <td><input type="text" /></td>
            <td><input type="text" /></td>
            <td><input type="text" /></td>
            <td><input type="text" /></td>
          </tr>
          <tr>
            <td colspan="2">5"</td>
            <td><input type="text" /></td>
            <td><input type="text" /></td>
            <td><input type="text" /></td>
            <td><input type="text" /></td>
            <td><input type="text" /></td>
            <td><input type="text" /></td>
            <td><input type="text" /></td>
            <td><input type="text" /></td>
            <td><input type="text" /></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="actions">
      <button onclick="downloadPDF(this)">PDF</button>
      <button onclick="this.closest('.card').remove()">Eliminar</button>
    </div>
  `;

  teamContainer.appendChild(card);

  // Resetear campos
  nameInput.value = '';
  experienceInput.selectedIndex = 0;
  avatarPreview.src = defaultAvatar;
});

function downloadPDF(button) {
  const card = button.closest('.card');
  const printWindow = window.open('', '', 'width=800,height=600');
  printWindow.document.write(`<html><head><title>Ficha de Personaje</title>`);
  printWindow.document.write(`<link rel="stylesheet" href="style.css" />`);
  printWindow.document.write(`</head><body>`);
  printWindow.document.write(card.outerHTML);
  printWindow.document.write(`</body></html>`);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}

function exportToPDF() {
  const options = {
    margin: 0.5,
    filename: 'equipo-personajes.pdf',
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  html2pdf().from(teamContainer).set(options).save();
}

const cardsContainer = document.getElementById('blocksContainer');
let notes = JSON.parse(localStorage.getItem('fastnotes_data')) || [];

function saveData() {
  localStorage.setItem('fastnotes_data', JSON.stringify(notes));
}

function renderCards() {
  if (!cardsContainer) return;
  cardsContainer.innerHTML = '';
  notes.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'card p-3 m-2 shadow-sm col-md-3';
    card.draggable = true;
    card.dataset.index = index;
    card.innerHTML = `
      <div class="d-flex justify-content-between">
        <strong>${item.title}</strong>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteCard(${index}, event)">🗑️</button>
      </div>
    `;
    card.onclick = () => {
      localStorage.setItem('bloco_atual', index);
      window.location.href = 'bloco.html';
    };
    card.addEventListener('dragstart', dragStart);
    card.addEventListener('dragover', dragOver);
    card.addEventListener('drop', dropCard);
    card.addEventListener('dragend', dragEnd);
    cardsContainer.appendChild(card);
  });
}

function createBlock() {
  createItem('noteBlock');
}

function createItem(type) {
  const title = prompt('Título:');
  if (!title) return;
  notes.push({ title, type, content: [] });
  saveData();
  renderCards();
}

function deleteCard(index, event) {
  event.stopPropagation();
  if (confirm('Deseja excluir este bloco?')) {
    notes.splice(index, 1);
    saveData();
    renderCards();
  }
}

// Drag-and-drop
let dragSourceIndex = null;

function dragStart(e) {
  dragSourceIndex = parseInt(e.target.dataset.index);
  e.target.classList.add('dragging');
}
function dragOver(e) { e.preventDefault(); }
function dropCard(e) {
  const targetIndex = parseInt(e.target.closest('.card').dataset.index);
  if (targetIndex !== dragSourceIndex) {
    const moved = notes.splice(dragSourceIndex, 1)[0];
    notes.splice(targetIndex, 0, moved);
    saveData();
    renderCards();
  }
}
function dragEnd(e) { e.target.classList.remove('dragging'); }

document.addEventListener('DOMContentLoaded', renderCards);

if (!localStorage.getItem('currentUser')) {
    alert('Faça login para acessar.');
    window.location.href = 'formLogin.html';
}
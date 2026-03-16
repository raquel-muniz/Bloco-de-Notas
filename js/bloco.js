let notes = JSON.parse(localStorage.getItem('fastnotes_data')) || [];
const currentIndex = parseInt(localStorage.getItem('bloco_atual'));
const currentNote = notes[currentIndex] || { title: 'Sem título', content: [] };

const titleElement = document.getElementById('blockTitle');
const noteEditor = document.getElementById('noteEditor');

titleElement.innerText = currentNote.title;
noteEditor.innerText = currentNote.content.join('\n\n');

function saveTitle() {
  currentNote.title = titleElement.innerText.trim();
  notes[currentIndex] = currentNote;
  localStorage.setItem('fastnotes_data', JSON.stringify(notes));
}

function saveNote() {
  currentNote.content = noteEditor.innerText.split(/\n\s*\n/);
  notes[currentIndex] = currentNote;
  localStorage.setItem('fastnotes_data', JSON.stringify(notes));
}

function backHome() {
  window.location.href = "home.html";
}

// Calculadora
let calcInput = '';
let calculator = null;
let calcDisplay = null;
let calcButtons = null;
let calcHeader = null;

function toggleCalculator() {
  if (!calculator) return;
  calculator.style.display = calculator.style.display === 'none' ? 'block' : 'none';
}

function closeCalculator() {
  if (!calculator) return;
  calculator.style.display = 'none';
}

function appendCalc(ch) {
  if (!calcDisplay) return;
  calcInput += ch;
  calcDisplay.value = calcInput;
}

function calculateCalc() {
  if (!calcDisplay) return;
  try {
    calcInput = eval(calcInput) + '';
    calcDisplay.value = calcInput;
  } catch {
    calcDisplay.value = 'Erro';
    calcInput = '';
  }
}

function clearCalc() {
  if (!calcDisplay) return;
  calcInput = '';
  calcDisplay.value = '';
}

function getMinCalculatorSize() {
  // Use a fixed minimum size so the user can shrink the widget smoothly.
  // The CSS already enforces same limits via min-width/min-height.
  return { width: 250, height: 320 };
}

function initCalculator() {
  calculator = document.getElementById('calculator');
  if (!calculator) return;

  calcDisplay = calculator.querySelector('#calcDisplay');
  calcButtons = calculator.querySelector('.calc-buttons');
  calcHeader = calculator.querySelector('header');

  // Arrastar calculadora
  let offsetX = 0;
  let offsetY = 0;
  let isDraggingCalc = false;

  calcHeader?.addEventListener('mousedown', e => {
    isDraggingCalc = true;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    calcHeader.style.cursor = 'grabbing';
  });

  document.addEventListener('mousemove', e => {
    if (isDraggingCalc) {
      calculator.style.left = `${e.pageX - offsetX}px`;
      calculator.style.top = `${e.pageY - offsetY}px`;
    }
    if (isResizing) {
      const deltaX = e.pageX - startX;
      const deltaY = e.pageY - startY;
      const min = getMinCalculatorSize();

      if (resizeHandle === 'top-left') {
        calculator.style.left = Math.max(0, startLeft + deltaX) + 'px';
        calculator.style.top = Math.max(0, startTop + deltaY) + 'px';
        calculator.style.width = Math.max(min.width, startWidth - deltaX) + 'px';
        calculator.style.height = Math.max(min.height, startHeight - deltaY) + 'px';
      } else if (resizeHandle === 'top-right') {
        calculator.style.top = Math.max(0, startTop + deltaY) + 'px';
        calculator.style.width = Math.max(min.width, startWidth + deltaX) + 'px';
        calculator.style.height = Math.max(min.height, startHeight - deltaY) + 'px';
      } else if (resizeHandle === 'bottom-left') {
        calculator.style.left = Math.max(0, startLeft + deltaX) + 'px';
        calculator.style.width = Math.max(min.width, startWidth - deltaX) + 'px';
        calculator.style.height = Math.max(min.height, startHeight + deltaY) + 'px';
      } else if (resizeHandle === 'bottom-right') {
        calculator.style.width = Math.max(min.width, startWidth + deltaX) + 'px';
        calculator.style.height = Math.max(min.height, startHeight + deltaY) + 'px';
      }
    }
  });

  document.addEventListener('mouseup', () => {
    isDraggingCalc = false;
    calcHeader?.style && (calcHeader.style.cursor = 'grab');
    isResizing = false;
  });

  // Redimensionar calculadora
  const handles = calculator.querySelectorAll('.resize-handle');
  handles.forEach(handle => {
    handle.addEventListener('mousedown', e => {
      isResizing = true;
      resizeHandle = handle.classList[1];
      startX = e.pageX;
      startY = e.pageY;
      startWidth = calculator.offsetWidth;
      startHeight = calculator.offsetHeight;
      startLeft = calculator.offsetLeft;
      startTop = calculator.offsetTop;
      e.preventDefault();
    });
  });
}

let isResizing = false;
let resizeHandle = '';
let startX, startY, startWidth, startHeight, startLeft, startTop;

window.addEventListener('DOMContentLoaded', initCalculator);

// Suporte ao teclado
window.addEventListener('keydown', e => {
  if (!calculator || calculator.style.display !== 'block') return;
  if ('0123456789.+-*/'.includes(e.key)) appendCalc(e.key);
  else if (e.key === 'Enter') calculateCalc();
  else if (e.key === 'Backspace') {
    calcInput = calcInput.slice(0, -1);
    calcDisplay && (calcDisplay.value = calcInput);
  }
});

const selectedColor = document.getElementById("selectedColor");
const colorPalette = document.getElementById("colorPalette");
const colors = document.querySelectorAll(".color");

// Toggle palette on selected color click
selectedColor.addEventListener("click", () => {
    colorPalette.style.display = colorPalette.style.display === "none" ? "flex" : "none";
});

// Handle color selection
colors.forEach(c => {
    c.addEventListener("click", () => {
        const color = c.dataset.color;

        // Update selected color display
        selectedColor.style.background = color;

        // Hide palette
        colorPalette.style.display = "none";

        // Apply to note if available
        const note = document.getElementById("note");
        if (note) {
            note.style.background = color;
        }

        // Save to current note if editing
        if (typeof currentIndex !== 'undefined' && currentIndex !== null && typeof notes !== 'undefined') {
            notes[currentIndex].color = color;
            if (typeof save === 'function') {
                save();
            }
        }
    });
});

// Function to update selected color when opening editor
function updateSelectedColor(color) {
    selectedColor.style.background = color || "#ffffff";
}

// Example usage in openEditor (if integrated)
function openEditor(i) {
    if (typeof currentIndex !== 'undefined') {
        currentIndex = i;
    }
    if (typeof notes !== 'undefined') {
        const note = notes[i];
        document.getElementById("title").value = note.title;
        document.getElementById("note").innerText = note.content;
        document.getElementById("note").style.background = note.color || "#ffffff";
        updateSelectedColor(note.color || "#ffffff");
    }
}

// Example for creating note with default color
if (typeof notes !== 'undefined') {
    notes.push({
        title: "Nova nota",
        content: "",
        color: "#ffffff"
    });
}
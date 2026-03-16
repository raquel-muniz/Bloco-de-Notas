const user = JSON.parse(localStorage.getItem("currentUser"));

document.getElementById("userName").textContent = user.nome
document.getElementById("userPhoto").src = user.imagem

if (!user) {
  alert("Faça login primeiro");
  window.location.href = "formLogin.html";
}

if (user) {
  document.getElementById("userName").innerText = "Olá, " + user.nome;
}

const STORAGE_KEY = "fastnotes_data";
let notes = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let currentIndex = null;

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function render() {
  const container = document.getElementById("mainView");
  container.innerHTML = "";

  notes.forEach((n, i) => {
    const card = document.createElement("div");
    card.className = "cardNote";

    card.innerHTML = `
      <b>${n.title}</b>
      <div class="options">
        <button onclick="deleteNote(${i}); event.stopPropagation();">Excluir</button>
      </div>
    `;

    card.onclick = () => openEditor(i);
    container.appendChild(card);
  });
}

function createNote() {
  const title = prompt("Título do bloco") || "Nova nota";
  notes.push({
    title: title,
    content: "",
    color: "#ffffff"
  });
  save();
  render();
  openEditor(notes.length - 1);
}

function deleteNote(i) {
  if (confirm("Tem certeza que deseja excluir esta nota?")) {
    notes.splice(i, 1);
    save();
    render();
  }
}

function openEditor(i) {
  currentIndex = i;
  document.getElementById("mainView").style.display = "none";
  document.getElementById("editor").style.display = "block";

  const note = notes[i];
  document.getElementById("title").value = note.title;
  document.getElementById("note").innerHTML = note.content;
  document.getElementById("note").style.background = note.color || "#ffffff";
}

function closeEditor() {
  if (currentIndex === null) return;

  notes[currentIndex].title = document.getElementById("title").value;
  notes[currentIndex].content = document.getElementById("note").innerHTML;
  save();
  render();

  document.getElementById("editor").style.display = "none";
  document.getElementById("mainView").style.display = "grid";
}

function toggleFabMenu() {
  const menu = document.getElementById("fabMenu");
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

function importNotes() {
  document.getElementById("importInput").click();
}

function handleImport(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(reader.result);
      if (Array.isArray(imported)) {
        notes = notes.concat(imported);
        save();
        render();
        alert("Notas importadas com sucesso!");
      } else {
        throw new Error("Formato inválido");
      }
    } catch {
      alert("Arquivo inválido. Use um JSON contendo um array de notas.");
    }
  };
  reader.readAsText(file);
}

function addImage() {
  if (currentIndex === null) {
    alert("Abra uma nota antes de adicionar uma imagem.");
    return;
  }
  document.getElementById("imageInput").click();
}

function handleImage(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const img = document.createElement("img");
    img.src = reader.result;
    img.style.maxWidth = "100%";
    img.style.display = "block";
    img.style.marginTop = "10px";

    const noteEl = document.getElementById("note");
    noteEl.appendChild(img);

    // Save the image (as HTML) to the note
    notes[currentIndex].content = noteEl.innerHTML;
    save();
  };
  reader.readAsDataURL(file);
}

function logOut() {
  localStorage.removeItem("currentUser");
  window.location.href = "formLogin.html";
}

function backHome() {
  // already on home
}

render();


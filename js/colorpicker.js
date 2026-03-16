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
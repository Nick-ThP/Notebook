const noteTitle = document.querySelector(".note-title");
const noteContent = document.querySelector(".note-content");
const savedNotes = document.querySelector(".saved-notes");
const saveNote = document.querySelector(".save-note")
const clearCurrent = document.querySelector(".clear-current")
const deleteAll = document.querySelector(".delete-all")

const getNotes = () => {
  const notes = localStorage.getItem("notes");
  if (notes == null) {
    arrayOfNoteObjects = [];
  } else {
    arrayOfNoteObjects = JSON.parse(notes);
  }
};

showNotes = () => {
  getNotes();
  let html = "";
  arrayOfNoteObjects.forEach((element, index) => {
    html += `
      <div class="individual-note">
        <div class="saved-note-content">
          <h3>${element.title}</h3>
          <p>${element.content}</p>
        </div>
        <div class="saved-note-buttons">
          <button class="${index} delete-button" onclick="deleteNote(this.id);">Delete note</button>
          <button class="${index} edit-button" onclick="editNote(this.id);">Edit note</button>
          <button class="${index} color-button" onclick="changeColor(this.id);">Change color</button>
        </div>
      </div>
    `;
  });
  if (arrayOfNoteObjects.length != 0) {
    savedNotes.innerHTML = html;
  } else {
    savedNotes.innerHTML = `
      <div class="no-notes">
        <h3>Please write a note to have it shown here!</h3>
      </div>
    `
  }
};

saveNote.addEventListener("click", () => {
  getNotes();
  const noteObject = {
    title: noteTitle.value,
    content: noteContent.value
  };
  arrayOfNoteObjects.push(noteObject);
  localStorage.setItem("notes", JSON.stringify(arrayOfNoteObjects));
  noteTitle.value = "";
  noteContent.value = "";
  showNotes();
});

clearCurrent.addEventListener("click", () => {
  noteTitle.value = "";
  noteContent.value = "";
})

deleteAll.addEventListener("click", () => {
  savedNotes.innerHTML = "";
  localStorage.clear();
  showNotes();
});

const deleteNote = (index) => {
  getNotes();
  arrayOfNoteObjects.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(arrayOfNoteObjects));
  showNotes();
};

const editNote = (index) => {
  getNotes();
  arrayOfNoteObjects.findIndex((element) => {
    noteTitle.value = element.title,
    noteContent.value = element.content
  })
  arrayOfNoteObjects.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(arrayOfNoteObjects));
  showNotes();
};

const changeColor = (index) => {
  getNotes();
  arrayOfNoteObjects.findIndex((element) => {
    element.querySelector(".individual-note").style.backgroundColor = "green";
  })
  localStorage.setItem("notes", JSON.stringify(arrayOfNoteObjects));
  showNotes();
}

showNotes();
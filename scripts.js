const newNoteForm = document.querySelector(".new-note-form");
const savedNotes = document.querySelector(".saved-notes");
const noteTitle = document.querySelector(".note-title");
const noteContent = document.querySelector(".note-content");
const clearAll = document.querySelector(".clear-all")

const getNotes = () => {
  const notes = localStorage.getItem("notes");
  if (notes == null) {
    arrayOfNoteObjects = [];
  } else {
    arrayOfNoteObjects = JSON.parse(notes);
  }
};

newNoteForm.addEventListener("submit", () => {
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

showNotes = () => {
  getNotes();
  let html = "";
  arrayOfNoteObjects.forEach((element, index) => {
    html += `
      <div class="individual-note">
        <h3>Note ${index + 1}<h3>
        <div class="note-text">
          <h3>${element.title}</h3>
          <p>${element.content}</p>
        </div>
        <button class="${index} delete-button" onclick="deleteNote(this.id);">Delete note</button>
        <button class="${index} edit-button" onclick="editNote(this.id);">Edit note</button>
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

clearAll.addEventListener("click", () => {
  savedNotes.innerHTML = "";
  localStorage.clear();
  showNotes();
});

showNotes();
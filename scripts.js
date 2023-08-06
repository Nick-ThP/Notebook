const noteTitle = document.querySelector(".note-title");
const noteContent = document.querySelector(".note-content");
const savedNotes = document.querySelector(".saved-notes");
const saveNote = document.querySelector(".save-note")
const clearCurrent = document.querySelector(".clear-current")
const deleteAll = document.querySelector(".delete-all")

const getNotes = () => {
  const notes = localStorage.getItem("notes");
  if (notes == null) {
    arrayOfNoteObjects = [{"title":"Remember gift","content":"Remember to buy a gift for the weekend birthday party (also remember to iron a shirt).","transparency":"","src":"unchecked.svg","arrowUp":"","arrowDown":""},{"title":"Grocery list","content":"Milk, cheese, bread, avocado, eggs, skyr, bananas, apples, coffee, tea, tomatoes, onions, cabbage.","transparency":"","src":"unchecked.svg","arrowUp":"","arrowDown":""},{"title":"Call the bank","content":"Call the bank before they close today (maybe during lunch break). Remember to ask about depositing.","transparency":"transparent","src":"checked.svg","arrowUp":"","arrowDown":""},{"title":"House chores","content":"Vacuum, dust the surfaces, do the dishes, do the laundry, water the plants, fix the broken door handle.","transparency":"","src":"unchecked.svg","arrowUp":"","arrowDown":""}];
  } else {
    arrayOfNoteObjects = JSON.parse(notes);
  }
};

showNotes = () => {
  getNotes();
  let html = "";
  arrayOfNoteObjects.forEach((element, index) => {
    if (Number(index) === 0) {
      element.arrowUp = "extraTransparent";
    }
    if (Number(index) === (arrayOfNoteObjects.length - 1)) {
      element.arrowDown = "extraTransparent";
    }
    html += `
      <div class="individual-note individual-note${index} ${element.transparency}">
        <div class="content">
          <div class="saved-note-content">
            <h3>${element.title}</h3>
            <p>${element.content}</p>
          </div>
          <div class="saved-note-buttons">
              <img src="${element.src}" id="${index}" class="image-icon" onclick="toggleCheckmark(this.id);">
              <i id="${index}" class="fas fa-angle-up arrow-icon ${element.arrowUp}" onclick="moveUp(this.id);"></i>
              <i id="${index}" class="fas fa-angle-down arrow-icon ${element.arrowDown}" onclick="moveDown(this.id);"></i>
              <i id="${index}" class="fas fa-pen other-icon" onclick="editNote(this.id);"></i>
              <i id="${index}" class="fas fa-trash other-icon" onclick="deleteNote(this.id);"></i>
          </div>
        </div>
      </div>
    `;
  });
  if (arrayOfNoteObjects.length != 0) {
    savedNotes.innerHTML = html;
  } else {
    savedNotes.innerHTML = `
      <div class="no-notes">
        <h3>Write a note to have it shown here!</h3>
      </div>
    `
  }
};

saveNote.addEventListener("click", () => {
  if (noteTitle.value == "" && noteContent.value == "") {
    alert("Please add sufficient information about your note")
    return;
  };
  getNotes();
  const noteObject = {
    title: noteTitle.value,
    content: noteContent.value,
    transparency: "",
    src: "unchecked.svg",
    arrowUp: "",
    arrowDown: ""
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
  if (confirm('Are you sure you want to delete all notes?')) {
    savedNotes.innerHTML = "";
    localStorage.clear();
    showNotes();
  } else {
    return;
  }
});

// Individual notes

const toggleCheckmark = (index) => {
  getNotes();
  if (arrayOfNoteObjects[index].src === "unchecked.svg") {
    arrayOfNoteObjects[index].src = "checked.svg"
    arrayOfNoteObjects[index].transparency = "transparent"
  } else {
    arrayOfNoteObjects[index].src = "unchecked.svg"
    arrayOfNoteObjects[index].transparency = ""
  }
  localStorage.setItem("notes", JSON.stringify(arrayOfNoteObjects));
  showNotes();
};

const moveUp = (index) => {
  getNotes();
  let element = arrayOfNoteObjects[index]
  if (index > 0) {
    arrayOfNoteObjects.splice(index, 1);
    arrayOfNoteObjects.splice((Number(index) - 1), 0, element);
  }
  localStorage.setItem("notes", JSON.stringify(arrayOfNoteObjects));
  showNotes();
};

const moveDown = (index) => {
  getNotes();
  let element = arrayOfNoteObjects[index]
  if (index < (arrayOfNoteObjects.length - 1)) {
    arrayOfNoteObjects.splice(index, 1);
    arrayOfNoteObjects.splice(parseInt(Number(index) + 1), 0, element);
  }
  localStorage.setItem("notes", JSON.stringify(arrayOfNoteObjects));
  showNotes();
};

const deleteNote = (index) => {
  getNotes();
  arrayOfNoteObjects.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(arrayOfNoteObjects));
  showNotes();
};

const editNote = (index) => {
  index = Number(index);
  getNotes();
  if (noteTitle.value !== "" || noteContent.value !== "") {
    return alert("Please clear the form before editing a note");
  }
  window.scroll(0,0);
  arrayOfNoteObjects.forEach((element, i) => {
    if (i === index) {
      noteTitle.value = element.title;
      noteContent.value = element.content;
    }
  });
  arrayOfNoteObjects.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(arrayOfNoteObjects));
  showNotes();
};

showNotes();
const titleInput = document.getElementById("title-input");
const bodyInput = document.getElementById("body-input");
const saveButton = document.getElementById("save-button");
const noteCardsContainer = document.getElementById("note-cards-container");

let notes = JSON.parse(localStorage.getItem("notes")) || [];
let editingId = null;


saveButton.addEventListener("click", saveNote);



function saveNote() {
  const titleText = titleInput.value;
  const bodyText = bodyInput.value;

  if (titleText === "" || bodyText === "") {
  return;
}

  if (editingId !== null) {
    // update existing note
    notes = notes.map(note => {
      if (note.id === editingId) {
        return { ...note, title: titleText, body: bodyText};
      }
      return note;
    });
    editingId = null; // reset after editing
  } else {
    // CREATE new note
    const newNote = {id: Date.now(), title: titleText, body: bodyText};
    notes.push(newNote);
  }

  localStorage.setItem("notes", JSON.stringify(notes));
  titleInput.value = "";
  bodyInput.value = "";
  renderNotes();
}


function renderNotes() {
  noteCardsContainer.innerHTML = "";

  notes.forEach((note) => {
    const article = document.createElement("article");

    article.innerHTML = `
    <h3>${note.title}</h3>
    <button class="edit-button" data-id="${note.id}">Edit</button>
    <button class="delete-button" data-id="${note.id}">Delete</button>
    `;
    noteCardsContainer.append(article);
    const editButton = article.querySelector(".edit-button");
    editButton.addEventListener("click", function () {
      editingId = note.id;
      titleInput.value = note.title;
      bodyInput.value = note.body;
    })

    const deleteButton = article.querySelector(".delete-button");
    deleteButton.addEventListener("click", function () {
      notes = notes.filter(n => n.id !== note.id);
      localStorage.setItem("notes", JSON.stringify(notes));
      renderNotes();
    })
  });

}
renderNotes();


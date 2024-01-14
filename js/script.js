// Toggle sidebar

import { NoteModal } from "./Modal.js";
import { client } from "./client.js";
import { db } from "./db.js";
import { activeNotebook, makeElemEditable, updateClock } from "./utils.js";

updateClock();

const toggleSidebar = document.querySelector(".sidebar");
const toogleMenu = document.querySelector("#toogle-menu");
const sidebarClose = document.querySelector("#sidebar-close");

toogleMenu.addEventListener("click", () => {
  toggleSidebar.classList.add("active");
});

sidebarClose.addEventListener("click", () => {
  toggleSidebar.classList.remove("active");
});

/* CREATE NEW NOTEBOOK*/
const sidebarNavList = document.querySelector("#sidebar-nav-list");
const addNotebookBtn = document.querySelector("#add-notebook");

const showNotebookField = () => {
  const navItem = document.createElement("div");
  navItem.classList.add("nav-item");
  navItem.innerHTML = `
    <span class="text notebook-field"></span>
    `;
  sidebarNavList.appendChild(navItem);

  const navItemField = navItem.querySelector(".notebook-field");

  activeNotebook.call(navItem);
  makeElemEditable(navItemField);

  navItemField.addEventListener("keydown", createNotebook);
};

addNotebookBtn.addEventListener("click", showNotebookField);

/* CREATE NOTEBOOK */
const createNotebook = function (e) {
  if (e.key === "Enter") {
    const notebookData = db.post.notebook(this.textContent || "untitled");
    this.parentElement.remove();
    client.notebook.create(notebookData);
    toggleSidebar.classList.remove("active");
  }
};

/* RENDER EXISTING NOTEBOOK */

const renderExistedNotebook = function () {
  const notebookList = db.get.notebook();
  console.log(notebookList);
  client.notebook.read(notebookList);
};

renderExistedNotebook();

/* CREATE NOTE */

const createNoteBtns = document.querySelectorAll(".create-note-btn");

createNoteBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modal = NoteModal();
    modal.open();
    modal.onSubmit((notObj) => {
      const activeNotebookId = document.querySelector("[data-notebook].active")
        .dataset.notebook;
      const noteData = db.post.note(activeNotebookId, notObj);
      console.log(noteData);
      client.note.create(noteData);
      modal.close();
    });
  });
});

/* Render Existed Note */
const renderExistedNote = function () {
  const activeNotebookId = document.querySelector("[data-notebook].active")
    ?.dataset.notebook;

  if (activeNotebookId) {
    const noteList = db.get.note(activeNotebookId);
    console.log(noteList);
    // Display existing notes
    client.note.read(noteList);
  }
};

renderExistedNote();

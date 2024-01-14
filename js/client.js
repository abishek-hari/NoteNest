import { Card } from "./Card.js";
import { NavItem } from "./NavItem.js";
import { activeNotebook } from "./utils.js";
const sidebarNavList = document.querySelector("#sidebar-nav-list");
const notePanelTitle = document.querySelector("#data-panel-title");
const notePanel = document.querySelector("#note-list");
console.log(notePanel);
const noteCreateBtns = document.querySelectorAll(".create-note-btn");
const emptyNotesTemplate = `
<div class="empty-notes">
  <span class="material-symbols-rounded" aria-hidden="true"
  >note_stack</span>
  <div class="no-notes">No notes</div>
</div>
`;

const disableNoteCreateBtns = function (isThereAnyNotebook) {
  noteCreateBtns.forEach((item) => {
    item[isThereAnyNotebook ? "removeAttribute" : "setAttribute"](
      "disabled",
      ""
    );
  });
};

export const client = {
  notebook: {
    create(notebookData) {
      const navItem = NavItem(notebookData.id, notebookData.name);
      sidebarNavList.appendChild(navItem);
      activeNotebook.call(navItem);
      notePanelTitle.textContent = notebookData.name;
      notePanel.innerHTML = emptyNotesTemplate;
      disableNoteCreateBtns(true);
    },

    read(notebookList) {
      disableNoteCreateBtns(true);
      notebookList.forEach((notebookData, index) => {
        const navItem = NavItem(notebookData.id, notebookData.name);

        if (index === 0) {
          activeNotebook.call(navItem);
          notePanelTitle.textContent = notebookData.name;
        }
        sidebarNavList.appendChild(navItem);
      });
    },
    update(notebookId, notebookData) {
      const oldNotebook = document.querySelector(`#data-notebook${notebookId}`);
      const newNotebook = NavItem(notebookData.id, notebookData.name);
      notePanelTitle.textContent = notebookData.name;
      sidebarNavList.replaceChild(newNotebook, oldNotebook);
      // if (oldNotebook) {
      //   oldNotebook.querySelector("#field-editable").textContent =
      //     notebookData.name;
      // }
      // notePanelTitle.textContent = notebookData.name;
      activeNotebook.call(newNotebook);
    },
    delete(notebookId) {
      const deleteNotebook = document.querySelector(
        `[data-notebook="${notebookId}"]`
      );

      const activeNavItem =
        deleteNotebook.nextElementSibling ??
        deleteNotebook.previousElementSibling;

      if (activeNavItem) {
        activeNavItem.click();
      } else {
        notePanelTitle.innerHTML = "";
        notePanel.innerHTML = "";
        disableNoteCreateBtns(false);
      }

      deleteNotebook.remove();
    },
  },

  note: {
    create(noteData) {
      if (notePanel.querySelector(".empty-notes")) notePanel.innerHTML = "";
      const card = Card(noteData);
      notePanel.prepend(card);
    },

    read(noteList) {
      if (noteList.length) {
        notePanel.innerHTML = "";
        noteList.forEach((noteData) => {
          const card = Card(noteData);
          notePanel.prepend(card);
        });
      } else {
        notePanel.innerHTML = emptyNotesTemplate;
      }
    },

    update(noteId, noteData) {
      const oldCard = document.querySelector(`[data-note="${noteId}"]`);
      const newCard = Card(noteData);
      notePanel.replaceChild(newCard, oldCard);
    },

    delete(noteId, isNoteExists) {
      document.querySelector(`[data-note="${noteId}"]`).remove();
      if (!isNoteExists) notePanel.innerHTML = emptyNotesTemplate;
    },
  },
};

import { DeleteConfirmModal, NoteModal } from "./Modal.js";
import { client } from "./client.js";
import { db } from "./db.js";
import { getRelativeTime } from "./utils.js";

export const Card = function (noteData) {
  const { id, title, text, postedOn, notebookId } = noteData;

  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("data-note", id);

  card.innerHTML = `
    <h3 class="card-title">${title}</h3>
    <p class="card-text">${text}</p>
    <div class="wrapper">
        <span class="card-time">${getRelativeTime(postedOn)}</span>
        <button class="icon-btn large" 
            id="delete-card"
            aria-label="Delete note">
            <span class="material-symbols-rounded" aria-hidden="true">delete</span>
            <div class="state-layer"></div>
        </button>
    </div>
      `;

  card.addEventListener("click", function () {
    const modal = NoteModal(title, text, getRelativeTime(postedOn));
    modal.open();
    modal.onSubmit(function (noteData) {
      const updatedData = db.update.note(id, noteData);
      client.note.update(id, updatedData);
      modal.close();
    });
  });

  const deleteBtn = card.querySelector("#delete-card");
  deleteBtn.addEventListener("click", (e) => {
    e.stopImmediatePropagation();
    const modal = DeleteConfirmModal(title);
    modal.open();
    modal.onSubmit(function (isConfirm) {
      if (isConfirm) {
        const existedNotes = db.delete.note(notebookId, id);
        client.note.delete(id, existedNotes.length);
      }
      modal.close();
    });
  });

  return card;
};

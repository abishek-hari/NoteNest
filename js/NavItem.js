import { DeleteConfirmModal } from "./Modal.js";
import { client } from "./client.js";
import { db } from "./db.js";
import { activeNotebook, makeElemEditable } from "./utils.js";

const notePanel = document.querySelector("#data-panel-title");
const sidebarNavList = document.querySelector("#sidebar-nav-list");

export const NavItem = function (id, name) {
  const navItem = document.createElement("div");
  navItem.classList.add("nav-item");
  navItem.setAttribute("data-notebook", id);
  navItem.innerHTML = `
            <span class="text text-label-large" data-notebook-field
            id="data-notebook-field"
              >${name}</span
            >
  
            <button
              class="icon-btn small"
              aria-label="Edit notebook"
              data-tooltip="Edit notebook"
              id="data-edit-btn"
              data-edit-btn
            >
              <span class="material-symbols-rounded" aria-hidden="true"
                >edit</span
              >
              <div class="state-layer"></div>
            </button>
  
            <button
              class="icon-btn small"
              aria-label="Delete notebook"
              data-tooltip="Delete notebook"
              id="data-delete-btn"
              data-delete-btn
            >
              <span class="material-symbols-rounded" aria-hidden="true"
                >delete</span
              >
              <div class="state-layer"></div>
            </button>
  
            <div class="state-layer"></div>
    `;

  navItem.addEventListener("click", function () {
    notePanel.textContent = name;
    activeNotebook.call(this);
    const noteList = db.get.note(this.dataset.notebook);
    client.note.read(noteList);
  });

  /* UPDATE NOTEBOOK */
  const navItemEditBtn = navItem.querySelector("#data-edit-btn");
  const navItemField = navItem.querySelector("#data-notebook-field");
  navItemEditBtn.addEventListener(
    "click",
    makeElemEditable.bind(null, navItemField)
    /* Another option */
    // makeElemEditable(navItemField)
  );

  navItemField.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      this.removeAttribute("contenteditable");
      const updatedNotebookData = db.update.notebook(id, this.textContent);
      client.notebook.update(id, updatedNotebookData);
    }
  });

  /* DELETE NOTEBOOK */
  const navItemDeleteBtn = navItem.querySelector("#data-delete-btn");

  navItemDeleteBtn.addEventListener("click", () => {
    const modal = DeleteConfirmModal(name);
    modal.open();
    modal.onSubmit(function (isConfirm) {
      if (isConfirm) {
        db.delete.notebook(id);
        client.notebook.delete(id);
      }
      modal.close();
    });
  });

  return navItem;
};

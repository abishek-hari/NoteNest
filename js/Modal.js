const DeleteConfirmModal = function (title) {
  const modal = document.createElement("div");
  modal.classList.add("modal-delete", "modal-show");
  console.log(modal);
  modal.innerHTML = `
   <h3 class="modal-title">
    Are you sure you want to delete <strong>"${title}"</strong>?
  </h3>
  <div class="modal-footer">
    <button class="btn text" data-action-btn="false" >
      <span class="fill-1">cancel</span>
    </button>
    <button class="btn text" data-action-btn="true">
      <span class="fill">Delete</span>
    </button>
  </div>
    `;

  const open = function () {
    document.body.appendChild(modal);
  };

  /* close the delete confirmation*/
  const close = function () {
    document.body.removeChild(modal);
  };

  const actionBtn = modal.querySelectorAll("[data-action-btn]");

  const onSubmit = function (callback) {
    actionBtn.forEach((btn) =>
      btn.addEventListener("click", () => {
        const isConfirm = btn.dataset.actionBtn === "true" ? true : false;

        callback(isConfirm);
      })
    );
  };

  return { open, close, onSubmit };
};

const NoteModal = function (title = "", text = "", time = "") {
  const modal = document.createElement("div");
  modal.classList.add("modal", "modal-show");
  modal.innerHTML = `
  <button class="icon-btn large" id="note-close-btn" aria-label="Close modal">
  <span class="material-symbols-rounded" aria-hidden="true">close</span>
  </button>
  <input
  type="text"
  placeholder="Untitled"
  value="${title}"
  class="modal-title note-field"
  />
  <textarea
  placeholder="add your note"
  class="modal-text custom-scrollbar note-field"
  >${text}</textarea>
  <div class="modal-footer">
  <span class="time">${time}</span>
  <button class="btn text" id="save-note" >
    <span class="fill">save</span>
  </button>
  </div>
  `;

  const submitBtn = modal.querySelector("#save-note");
  submitBtn.disabled = true;

  const [titleField, textField] = modal.querySelectorAll(".note-field");

  const enableSubmit = function () {
    submitBtn.disabled = !titleField.value && !textField.value;
  };

  textField.addEventListener("keyup", enableSubmit);
  titleField.addEventListener("keyup", enableSubmit);

  const open = function () {
    document.body.appendChild(modal);
    titleField.focus();
  };
  const close = function () {
    document.body.removeChild(modal);
  };

  /* Close Btn */
  const closeBtn = modal.querySelector("#note-close-btn");
  closeBtn.addEventListener("click", close);

  /* Submit btn */

  const onSubmit = function (callback) {
    submitBtn.addEventListener("click", function () {
      const noteData = {
        title: titleField.value,
        text: textField.value,
      };
      console.log(noteData);
      callback(noteData);
    });
  };
  return { open, close, onSubmit };
};

export { DeleteConfirmModal, NoteModal };

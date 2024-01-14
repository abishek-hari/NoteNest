import {
  findNote,
  findNoteIndex,
  findNotebook,
  findNotebookIndex,
  generateID,
} from "./utils.js";

let noteKeeperDB = {};

const initDB = function () {
  const db = localStorage.getItem("notekeeperDB");

  if (db) {
    noteKeeperDB = JSON.parse(db);
  } else {
    noteKeeperDB.notebooks = [];
    localStorage.setItem("notekeeperDB", JSON.stringify(noteKeeperDB));
  }
};

initDB();

const readDB = function () {
  noteKeeperDB = JSON.parse(localStorage.getItem("notekeeperDB"));
};

const writeDB = function () {
  localStorage.setItem("notekeeperDB", JSON.stringify(noteKeeperDB));
};

export const db = {
  post: {
    notebook(name) {
      readDB();
      const notebookData = {
        id: generateID(),
        name,
        notes: [],
      };
      noteKeeperDB.notebooks.push(notebookData);
      writeDB();
      return notebookData;
    },
    note(notebookId, object) {
      readDB();
      const notebook = findNotebook(noteKeeperDB, notebookId);
      const noteData = {
        id: generateID(),
        notebookId,
        ...object,
        postedOn: new Date().getTime(),
      };
      notebook.notes.unshift(noteData);
      writeDB();

      return noteData;
    },
  },
  get: {
    notebook() {
      readDB();
      return noteKeeperDB.notebooks;
    },
    note(notebookId) {
      readDB();
      const notebook = findNotebook(noteKeeperDB, notebookId);
      return notebook.notes;
    },
  },
  update: {
    notebook(notebookId, name) {
      readDB();
      const notebook = findNotebook(noteKeeperDB, notebookId);
      notebook.name = name;
      writeDB();
      return notebook;
    },
    note(noteId, object) {
      readDB();
      const oldNote = findNote(noteKeeperDB, noteId);
      const newNote = Object.assign(oldNote, object);
      writeDB();
      return newNote;
    },
  },
  delete: {
    notebook(notebookId) {
      readDB();
      const notebookIndex = findNotebookIndex(noteKeeperDB, notebookId);
      noteKeeperDB.notebooks.splice(notebookIndex, 1);
      writeDB();
    },
    note(notebookId, noteId) {
      readDB();
      const notebook = findNotebook(noteKeeperDB, notebookId);
      const noteIndex = findNoteIndex(notebook, noteId);
      notebook.notes.splice(noteIndex, 1);
      writeDB();
      return notebook.notes;
    },
  },
};

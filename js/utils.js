// import { db } from "./db";

let lastActiveNavItem;

const activeNotebook = function () {
  lastActiveNavItem?.classList.remove("active");
  this.classList.add("active");
  lastActiveNavItem = this;
};

const makeElemEditable = function (element) {
  if (element) {
    element.setAttribute("contenteditable", true);
    element.focus();
  } else {
    console.error("Element is null or undefined");
  }
};

// generate ID

const generateID = function () {
  return new Date().getTime().toString();
};

const findNotebook = function (db, notebookId) {
  return db.notebooks.find((notebook) => notebook.id === notebookId);
};

const findNotebookIndex = function (db, notebookId) {
  return db.notebooks.findIndex((item) => item.id === notebookId);
};

const getRelativeTime = function (milliseconds) {
  const currentTime = new Date().getTime();
  let minute = Math.floor((currentTime - milliseconds) / 1000 / 60);
  const hour = Math.floor(minute / 60);
  const day = Math.floor(hour / 24);

  return minute < 1
    ? "Just now"
    : minute < 60
    ? `${minute} min ago`
    : hour < 24
    ? `${hour} hour ago`
    : `${day}day ago`;
};

const findNote = (db, noteId) => {
  let note;
  for (const notebook of db.notebooks) {
    note = notebook.notes.find((note) => note.id === noteId);
    if (note) break;
  }

  return note;
};

const findNoteIndex = function (notebook, noteId) {
  return notebook.notes.findIndex((note) => note.id === noteId);
};

const NoteNestGreet = document.querySelector("#notenest-greet");
const NoteNestTime = document.querySelector("#notenest-time");

const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

const weekdays = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const updateClock = () => {
  setInterval(() => {
    const now = new Date();
    const hour = now.getHours();
    const day = weekdays[now.getDay()];
    const date = now.getDate();
    const year = now.getFullYear();
    const month = months[now.getMonth()];

    if (hour >= 1 && hour < 12) {
      NoteNestGreet.innerHTML = "Good morning!";
    } else if (hour >= 12 && hour < 17) {
      NoteNestGreet.innerHTML = "Good afternoon!";
    } else {
      NoteNestGreet.innerHTML = "Good evening!";
    }

    NoteNestTime.textContent = `${day}, ${month} ${date} ${year}`;
  });
};

export {
  activeNotebook,
  makeElemEditable,
  generateID,
  findNotebook,
  findNotebookIndex,
  getRelativeTime,
  findNote,
  findNoteIndex,
  updateClock,
};

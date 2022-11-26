const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

const notesPath = path.join(__dirname, 'db.json');

async function addNote(title) {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);
  await fs.writeFile(notesPath, JSON.stringify(notes));

  console.log(chalk.bgGreen('Note was added!'));
}

async function removeNote(id) {
  const notes = await getNotes();

  const updatedNotes = notes.filter((note) => id !== note.id);
  await fs.writeFile(notesPath, JSON.stringify(updatedNotes));

  console.log(chalk.bgGreenBright('Note was deleted'));
}

async function editNote(id, title) {
  const notes = await getNotes();

  const updatedNotes = notes.map((note) => {
    if (note.id === id) {
      return { ...note, title: title };
    } else {
      return note;
    }
  });
  await fs.writeFile(notesPath, JSON.stringify(updatedNotes));

  console.log(chalk.bgGreenBright('Note was edited'));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: 'utf-8' });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();

  console.log(chalk.magenta.inverse('Here is the list of notes:'));
  notes.forEach((note) => {
    console.log(chalk.magenta(`id: ${note.id}, title: ${note.title}`));
  });
}

module.exports = {
  addNote,
  printNotes,
  removeNote,
  getNotes,
  editNote,
};

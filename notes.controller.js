const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

const notesPath = path.join(__dirname, 'db.json');

async function addNote(title) {
  const notes = await getNote();

  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);
  await fs.writeFile(notesPath, JSON.stringify(notes));

  console.log(chalk.bgGreen('Note was added!'));
}

async function removeNote(id) {
  const notes = await getNote();

  const updateNotes = notes.filter((note) => id !== note.id);
  await fs.writeFile(notesPath, JSON.stringify(updateNotes));

  console.log(chalk.bgGreenBright('Note was deleted'));
}

async function getNote() {
  const notes = await fs.readFile(notesPath, { encoding: 'utf-8' });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNote();

  console.log(chalk.magenta.inverse('Here is the list of notes:'));
  notes.forEach((note) => {
    console.log(chalk.magenta(`id: ${note.id}, title: ${note.title}`));
  });
}

module.exports = {
  addNote,
  printNotes,
  removeNote,
};

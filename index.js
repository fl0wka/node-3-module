// const yargs = require('yargs');
// const pkg = require('./package.json');
// const { addNote, printNotes, removeNote } = require('./notes.controller');
// yargs.version(pkg.version);

// yargs.command({
//   command: 'add',
//   describe: 'Add new note to list',
//   builder: {
//     title: {
//       type: 'string',
//       discribe: 'Note title',
//       demandOption: true,
//     },
//   },
//   handler({ title }) {
//     addNote(title);
//   },
// });

// yargs.command({
//   command: 'remove',
//   describe: 'Remove note by id',
//   builder: {
//     id: {
//       type: 'string',
//       describe: 'Note id',
//       demandOption: true,
//     },
//   },
//   handler({ id }) {
//     removeNote(id);
//   },
// });

// yargs.command({
//   command: 'list',
//   describe: 'Print all notes',
//   async handler() {
//     printNotes();
//   },
// });

// yargs.parse();

const chalk = require('chalk');
const {
  addNote,
  getNotes,
  removeNote,
  editNote,
} = require('./notes.controller');
const express = require('express');
const path = require('path');

const port = 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'pages');
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get('/', async (req, res) => {
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: false,
  });
});

app.post('/', async (req, res) => {
  await addNote(req.body.title);
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: true,
  });
});

app.delete('/:id', async (req, res) => {
  await removeNote(req.params.id);
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: false,
  });
});

app.put('/:id', async (req, res) => {
  await editNote(req.params.id, req.body.title);
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: false,
  });
});

app.listen(port, () => {
  console.log(chalk.green(`Server has been started on port ${port}!`));
});

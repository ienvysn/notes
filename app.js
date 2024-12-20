const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes.js"); //has multiple fuctions from notes.js

// Add comand
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    //add requiremnts
    title: {
      describe: "Title of the note", //shows in the help menu
      demandOption: true, // to make it required
      type: "string", // to make sure it is sting
    },
    body: {
      describe: "Enter the notes",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    notes.addNote(argv.title, argv.body);
  },
});

// Remove command
yargs.command({
  command: "remove",
  describe: "Remove a note", //shows in the help menu
  builder: {
    title: {
      describe: "Remove the note",
      demandOption: true, // to make it required
      type: "string",
    },
  },
  handler: function (argv) {
    notes.removeNote(argv.title);
  },
});

//List command
yargs.command({
  command: "list",
  describe: "List the notes",
  handler: function () {
    notes.listNotes();
  },
});

//read command
yargs.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: {
      type: "string",
      demandOption: true,
      describe: "Display the note",
    },
  },
  handler: function (argv) {
    notes.readNote(argv.title);
  },
});

//Edit command
yargs.command({
  command: "edit",
  describe: "Edit a note",
  builder: {
    title: {
      type: "string",
      demandOption: true,
      describe: "Title of note to edit",
    },
    editTitle: {
      type: "string",
      describe: "Edit the note title",
    },
    editBody: {
      type: "string",

      describe: "Edit the note body",
    },
  },
  handler: function (argv) {
    notes.editNote(argv.title, argv.editTitle, argv.editBody);
  },
});

yargs.parse(); // parse all the arguments

const fs = require("fs");
const chalk = require("chalk");
let found = false;

const addNote = (title, body) => {
  const notes = loadNotes(); //load the previous notes which is an object
  const duplicateNotes = notes.filter(function (notes) {
    //checks if there is any dublicate notes
    return notes.title === title;
  });

  if (duplicateNotes.length == 0) {
    //if there is no duplicate notes then the length will be 0
    notes.push({
      title: title,
      body: body,
    }); //add a new note
    console.log(chalk.bgGreen.bold("New Note added "));
  } else {
    console.log(chalk.bgRed("Note title already exists"));
  }

  saveNotes(notes); //save the notes
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes); //change the note from object to json

  fs.writeFileSync("notes.json", dataJSON); //save the json file
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON); // convetrs json to object
  } catch (e) {
    //if the note is empty
    return [];
  }
};

const listNotes = () => {
  notes = loadNotes(); // Load the notes
  console.log(chalk.inverse("YOUR NOTES:"));

  notes.forEach((note) => {
    console.log(chalk.blue.bold(note.title)); //show the title of the notes
  });
};

const removeNote = (title) => {
  notes = loadNotes(); //loads note
  notesToKeep = notes.filter(function (notes) {
    return notes.title !== title; //returnss those whose title does not match
  });
  if (notes.length == notesToKeep.length) {
    console.log(chalk.bgRed("Note not found"));
  } else {
    saveNotes(notesToKeep); //save the new note
    console.log(chalk.bgGreen.bold("Note Removed"));
  }
};

const readNote = (title) => {
  note = loadNotes();
  note.forEach((note) => {
    if (note.title == title) {
      //compare the title of note
      console.log(chalk.inverse(`${note.title}: `));
      console.log(chalk.cyan(note.body));
      found = true;
    }
  });
  if (!found) {
    console.log(chalk.bgRed("No note was found"));
  }
};

const editNote = (title, editTitle, editBody) => {
  notes = loadNotes();
  notes.forEach((note) => {
    if (note.title === title) {
      found = true;
      // Update title if `editTitle` is provided

      if (editTitle) {
        note.title = editTitle;
      }

      // Update body if `editBody` is provided

      if (editBody) {
        note.body = editBody;
      }
    }
  });

  if (found) {
    saveNotes(notes); // Save the updated notes array
    console.log(chalk.bgGreen.bold("Note updated successfully!"));
  } else {
    console.log(chalk.bgRed("Note not found!"));
  }
};

module.exports = {
  //export multiple fucntions
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
  editNote: editNote,
};

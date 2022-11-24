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
    console.log(chalk.bgGreen(`Note "${title}" was add`));
}

async function removeNote(id) {
    const notes = await getNotes();
    const newNotes = notes.slice();
    const removedNoteIndex = newNotes.findIndex(note => note.id === id);
    if (removedNoteIndex !== -1) {
        newNotes.splice(removedNoteIndex, 1);
        await fs.writeFile(notesPath, JSON.stringify(newNotes));
        console.log(chalk.bgRed(`Note "${notes[removedNoteIndex].title}" removed`));
    } else
        console.log(chalk.bgGrey('Note undefined'));
}
async function editNote(id, title) {
    const notes = await getNotes();
    const newNotes = notes.slice();
    const editNoteIndex = newNotes.findIndex(note => note.id === id);
    newNotes[editNoteIndex].title = title;
    await fs.writeFile(notesPath, JSON.stringify(newNotes));
    console.log(chalk.bgMagenta(`Note "${notes[editNoteIndex].title}" has been changed`));
}

async function getNotes() {
    const notes = await fs.readFile(notesPath, {encoding: 'utf-8'});
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
    const notes = await getNotes();
    console.log(chalk.bgCyan('Here is the list of notes:'));
    notes.forEach(note => console.log(chalk.cyan(note.id, note.title)));
}

module.exports = {
    addNote, removeNote, printNotes, editNote
};

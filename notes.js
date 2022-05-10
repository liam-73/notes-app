const fs = require('fs');
const chalk = require('chalk');
const { notStrictEqual } = require('assert');


const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find( (note) => note.title === title );

    debugger
    
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        console.log(chalk.green.inverse('New note added'));
        saveNotes(notes);
    } else {
        console.log(chalk.red.inverse('This title is already used!'))
    }
};

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e) {
        return [];
    }
};

const removeNote = (title) => {
    const notes = loadNotes();
    const newNotes = notes.filter( (note) => {
        return note.title !== title;
    });
    
    if( newNotes.length === notes.length ) {
        console.log(chalk.red.inverse('No note found!'));
    } else {
        console.log(chalk.green.inverse('Note removed!'));
        saveNotes(newNotes);
    }
}

const listNotes = () => {
    const notes = loadNotes();

    console.log(chalk.inverse('Your notes'));

    notes.forEach( (note) => {
        console.log(note.title);
    });
    
}

const  readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find( (note) => note.title === title );

    if(note) {
        console.log(chalk.inverse(note.title));
        console.log(note.body);
    } else {
        console.log(chalk.red.inverse('No note found!'));
    }
}

module.exports = { addNote, removeNote, listNotes, readNote  };
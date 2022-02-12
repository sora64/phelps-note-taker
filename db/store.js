// package imports
const util = require('util');
const fs = require('fs');
const { v1: uuidv1 } = require('uuid');

// functions using the util package to create new promises from newly read and written files
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// class to create objects with the included functionality
class Store {
    // makes a new promise from the data read from db.json
    read() {
        return readFileAsync('db/db.json', 'utf8');
    }

    // makes a new promise from the data in db.json and newly added data
    write(note) {
        return writeFileAsync('db/db.json', JSON.stringify(note));
    }

    // uses read() to return and concatinate the data stored in db.json
    getNotes() {
        return this.read().then((notes) => {
            let parsedNotes;

            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }

            return parsedNotes;
        });
    }
    
    // validates user input, makes a note's title, text, and id properties, then combines data already in db.json with user input to recreate db.json with that new user input
    addNote(note) {
        const { title, text } = note;

        if(!title || !text) {
            throw new Error("The 'title' and 'text' inputs must be filled.")
        }

        const newNote =  { title, text, id: uuidv1() };

        return this.getNotes()
            .then((notes) => [...notes, newNote])
            .then((data) => this.write(data))
    }

    // returns data in db.json, filters that data out a targeted object based on that object's ID, then recreates db.json without the targeted object
    removeNote(id) {
        return this.getNotes()
        .then((notes) => {
            const filteredNotes = notes.filter((note) => note.id !== id);
            console.log(filteredNotes);
            return filteredNotes;
        })
        .then((data) => this.write(data));
    }
}

// a new instance of the Store class as an object
const store = new Store

// exports the new instance as an object of the Store class
module.exports = store;
const util = require('util');
const fs = require('fs');

const { v1: uuidv1 } = require('uuid');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    read() {
        return readFileAsync('db/db.json', 'utf8');
    }

    write(note) {
        return writeFileAsync('db/db.json', JSON.stringify(note));
    }

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

    addNote(note) {
        const { title, text } = note;

        if(!title || !text) {
            throw new Error("The 'title' and 'text' inputs must be filled.")
        }

        const newNote =  { title, text, id: uuidv1() };

        return this.getNotes()
            .then((notes) => [...notes, newNote])
    }
}

module.exports = Store;
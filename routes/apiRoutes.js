// package imports
const router = require('express').Router();
const store = require('../db/store');

// functionality by way of an instance of the Store object to receive data already stored in db.json
router.get('/notes', (req, res) => {
    store
        .getNotes()
        .then((notes) => {
            return res.json(notes);
        })
        .catch((err) => res.status(500).json(err));
});

// functionality by way of an instance of the Store object to add data to db.json
router.post('/notes', (req, res)=> {
    store
        .addNote(req.body)
        .then((note) => res.json(note))
        .catch((err) => res.status(500).json(err));
});

// functionality by way of an instance of the Store object to remove data from db.json
router.delete('/notes/:id', (req, res) => {
    store
        .removeNote(req.params.id)
        .then(() => res.json({ ok: true }))
        .catch((err) => res.status(500).json(err));
});

// exporting functionality
module.exports = router;
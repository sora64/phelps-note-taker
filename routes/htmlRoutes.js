// package imports
const path = require('path');
const router = require('express').Router();

// route handler for GET retquests at the /notes endpoint
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// route handler for all GET requests
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// exporting functionality
module.exports = router;
// package and file imports
const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// Express functionality
const app = express();
const PORT = process.env.PORT || 3001;

// endpoint and other use specification
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// makes the app listen at the port indicated above with the PORT variable
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
const express = require('express');
const cors = require('cors');
const app = express();


//settings
app.set('port', process.env.PORT || 4000);

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use('/api/books',require('./routes/books'));
app.use('/api/users',require('./routes/users'));

module.exports = app;
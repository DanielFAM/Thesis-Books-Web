const express = require('express');
const cors = require('cors');
const app = express();


//settings
app.set('port', process.env.PORT || 4000);

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use('/api/books',require('./routes/books.routes'));
app.use('/api/users',require('./routes/users.routes'));
app.use('/api/auth', require('./routes/auth.routes'));

module.exports = app;
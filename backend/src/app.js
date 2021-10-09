const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');


//settings
app.set('port', process.env.PORT || 4000);

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const storage = multer.diskStorage({ //funcion para subir imagenes en el servidor
    destination: path.join(__dirname, 'public/uploads'),
    filename(req,file,cb){
        cb(null,new Date().getTime() + path.extname(file.originalname))
    }
});
app.use(multer({storage}).single('image'));

//static files
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended: false}));

//routes
app.use('/api/books',require('./routes/books.routes'));
app.use('/api/users',require('./routes/users.routes'));
app.use('/api/auth', require('./routes/auth.routes'));

module.exports = app;
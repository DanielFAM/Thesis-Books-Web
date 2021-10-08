/*if (process.env.NODE_ENV !== 'production') {
    //Desplegando variables de entorno locales si 'development'
}*/
require('dotenv').config();

const app = require('./app');

const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const express = require('express');

require('./database');

//muestra peticiones
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

//start the server
async function main() {
    await app.listen(app.get('port'));
    console.log(`Server on port ${app.get('port')}`);
}

main();
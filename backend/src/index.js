/*if (process.env.NODE_ENV !== 'production') {
    //Desplegando variables de entorno locales si 'development'
}*/
require('dotenv').config();

const app = require('./app');

const express = require('express');

require('./database');

//start the server
async function main() {
    await app.listen(app.get('port'));
    console.log(`Server on port ${app.get('port')}`);
}

main();
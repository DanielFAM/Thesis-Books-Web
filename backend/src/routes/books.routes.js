const { Router } = require('express');
const router = Router();

const { getBooks, 
        getBookById, 
        createBook, 
        deleteBook 
} = require('../controllers/books.controller');

//muestra todos los libros en la BD
router.get('/', getBooks);

//muestra un libro buscado por ID en la BD
router.get('/:id', getBookById);

//creación de libros
router.post('/create', createBook);

//borrar libro por ID
router.delete('/delete/:id', deleteBook);

module.exports = router;
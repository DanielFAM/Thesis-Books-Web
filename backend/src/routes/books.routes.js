const { Router } = require('express');
const router = Router();

const booksCtrl = require('../controllers/books.controller');

//muestra todos los libros en la BD
router.get('/searchAll/:keyword/:startindex', booksCtrl.searchAll);

//muestra un libro buscado por ID en la BD
router.get('/getDetail/:id', booksCtrl.getDetail);

router.get('/getMyBooks/:token', booksCtrl.getMyBooks);

router.get('/getOneBookshelf/:id/:token', booksCtrl.getOneBookShelf);

router.post('/addBook/:shelf/:volume/:token', booksCtrl.addBook);

router.post('/moveBook/:from/:to/:volume/:token', booksCtrl.moveBook);

router.post('/removeBook/:shelf/:volume/:token', booksCtrl.removeBook);

router.post('/clearShelf/:shelf/:token', booksCtrl.clearShelf);

/*creación de libros
router.post('/create', );

//borrar libro por ID
router.delete('/delete/:id', );*/

module.exports = router;
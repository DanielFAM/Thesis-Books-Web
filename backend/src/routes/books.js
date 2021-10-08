const { Router } = require('express');
const {unlink} = require('fs-extra');
const path = require('path');
const router = Router();

const Book = require('../models/books');

//muestra todos los datos
router.get('/', async (req,res) => {
    const books = await Book.find();
    res.json(books);
});

//recepcion de datos
router.post('/', async (req, res) => {
    const { title, author, isbn, editorial, year } = req.body;
    //const imagePath = '/uploads/'+req.file.filename;
    const newBook = new Book({ title, author, isbn, editorial, year });
    await newBook.save();
    res.json({message: 'Book saved'});
});

//borrar datos
router.delete('/:id', async (req, res) => {
    const book = await Book.findByIdAndDelete(req.params.id);
    unlink(path.resolve('./backend/public'+ book.imagePath))
    res.json({message: 'Book deleted'});
});

module.exports = router;
const booksCtrl = {};
const Book = require('../models/books');
const {unlink} = require('fs-extra');
const path = require('path');

booksCtrl.getBooks = async (req, res) => {
    const books = await Book.find();
    res.json(books);
};

booksCtrl.getBookById = async (req, res) => {
    const book = await Book.findById(req.params.id);
    res.json(book);
};

booksCtrl.createBook = async (req, res) => {
    const { title, author, isbn, editorial, year } = req.body;
    const imagePath = '/uploads/'+req.file.filename;
    const newBook = new Book({ title, author, isbn, imagePath,editorial, year });
    await newBook.save();
    res.json({message: 'Book saved'});
};

booksCtrl.deleteBook = async (req, res) => {
    const book = await Book.findByIdAndRemove(req.params.id);
    if(book === null) return res.json({status: 'The book has been already deleted'});
    unlink(path.resolve('./backend/public'+ book.imagePath))
    res.json({message: 'Book deleted'});
};

module.exports = booksCtrl;
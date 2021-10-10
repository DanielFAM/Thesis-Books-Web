const booksCtrl = {};
//const Book = require('../models/books');
//const {unlink} = require('fs-extra');
//const path = require('path');
const axios = require('axios');

/*booksCtrl.getBooks = async (req, res) => {
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
};*/

booksCtrl.searchAll = async (req, res) => {
    if(!req.body) return res.status(404).json({error:'no data provided'});
    const { search, index } = req.body;
    if (search === "" || search === null) return res.status(404).json({error:'No word provided'}); 
    const bookURL = "https://www.googleapis.com/books/v1/volumes";
    axios.get(bookURL, { params: {  q: search, maxResults: 40,startIndex: index}}).then(({ data }) => {
        res.status(200).send({data: data.items, total:data.totalItems});
    }).catch(err => res.status(err.response.status).send('Error'));
};

booksCtrl.getDetail = async (req, res) => {
    axios.get(`https://www.googleapis.com/books/v1/volumes/${req.params.id}`).then(({ data }) => {
        res.status(200).send(data);
    }).catch(err => res.status(err.response.status).send('Error'));
};

booksCtrl.getMyBooks = async (req, res) => {
    axios.get(`https://www.googleapis.com/books/v1/mylibrary/bookshelves?access_token=${req.params.token}`).then(({ data }) => {
        res.status(200).send(data.items);
    }).catch(err => res.status(err.response.status).send('Error'));
};

booksCtrl.getOneBookShelf = async (req, res) => {
    axios.get(`https://www.googleapis.com/books/v1/mylibrary/bookshelves/${req.params.id}/volumes?access_token=${req.params.token}`).then(({ data }) => {
        res.status(200).send(data.items);
    }).catch(err => res.status(err.response.status).send('Error'));
};

booksCtrl.addBook = async (req, res) => {
    axios.post(`https://www.googleapis.com/books/v1/mylibrary/bookshelves/${req.params.shelf}/addVolume?access_token=${req.params.token}`,null,{params:{ volumeId: req.params.volume }}).then(({ data }) => {
        res.status(200).send(data);
    }).catch(err => res.status(err.response.status).send('Error'));
};

booksCtrl.moveBook = async (req, res) => {
    axios.post(`https://www.googleapis.com/books/v1/mylibrary/bookshelves/${req.params.to}/addVolume?access_token=${req.params.token}`,null,{params:{ volumeId: req.params.volume}}).then(({ data }) => {
        // res.status(200).send(data);
        axios.post(`https://www.googleapis.com/books/v1/mylibrary/bookshelves/${req.params.from}/removeVolume?access_token=${req.params.token}`,null,{params:{ volumeId: req.params.volume}}).then(({ data }) => {
            res.status(200).send(data);
        }).catch(err =>{
            console.log(err)
            res.status(err.response.status).send('Error')
        })
    }).catch(err =>{
        console.log(err)
        res.status(err.response.status).send('Error')
    })
};

booksCtrl.removeBook = async (req, res) => {
    axios.post(`https://www.googleapis.com/books/v1/mylibrary/bookshelves/${req.params.shelf}/removeVolume?access_token=${req.params.token}`,null,{params:{ volumeId: req.params.volume }}).then(({ data }) => {
        res.status(200).send(data);
    }).catch(err => res.status(err.response.status).send('Error'));
};

booksCtrl.clearShelf = async (req, res) => {
    axios.post(`https://www.googleapis.com/books/v1/mylibrary/bookshelves/${req.params.shelf}/clearVolumes?access_token=${req.params.token}`).then(({ data }) => {
        res.status(200).send(data);
    }).catch(err => res.status(err.response.status).send('Error'));
};

module.exports = booksCtrl;
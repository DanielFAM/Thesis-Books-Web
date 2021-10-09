const { Schema, model } = require('mongoose');

const BookSchema = new Schema({
    title:{ type: String, required: true },
    author: { type: String, required: true }, 
    isbn:{ type: String, required: true },
    imagePath: { type: String },
    editorial: { type: String },
    year: { type: Date, required: true },
    created_at: { type: Date, default: Date.now }
},{
    timestamps: true
    //versionKey: false
});

module.exports = model('Book', BookSchema);
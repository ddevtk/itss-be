const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FlashCardSchema = new Schema({
    furigana: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },

    mean: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100,
    },

    kanji: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },

    hanviet: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },

    example: {
        type: String,
        maxLength: 200,
        trim: true,
    },

    exampleMean: {
        type: String,
        maxLength: 200,
        trim: true,
    },

    userId: {
        type: String,
        default: true,
    },
});

const FlashCardModel = mongoose.model('flashcard', FlashCardSchema, 'flashcards');

module.exports = FlashCardModel;

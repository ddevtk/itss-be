const flashcardApi = require('express').Router();
const flashcardController = require('../controllers/flashcard.controller');
const passportConfig = require('../middlewares/passport.middleware');

flashcardApi.get('/word-pack', flashcardController.getWordPack);

flashcardApi.post('/create', passportConfig.jwtAuthentication, flashcardController.create);

flashcardApi.get('/list', passportConfig.jwtAuthentication, flashcardController.list);

flashcardApi.put('/update',passportConfig.jwtAuthentication, flashcardController.update);

flashcardApi.delete('/remove', passportConfig.jwtAuthentication, flashcardController.remove);

module.exports = flashcardApi;

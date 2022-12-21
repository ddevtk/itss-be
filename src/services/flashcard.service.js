const FlashCardModel = require('../models/flashcard.model');

exports.createFlashCard = async (furigana, kanji, hanviet, mean, example, exampleMean, userId) => {
    try {
        const newFlashCard = await FlashCardModel.create({furigana, kanji, hanviet, mean, example, exampleMean, userId});

        if (newFlashCard) {
            return true;
        }
        return false;
    } catch (error) {
        throw error;
    }
};

exports.getListFlashCard = async (userId) => {
    try {
        const list = await FlashCardModel.find({ userId: userId });
        return list;
    } catch (error) {
        throw error;
    }
};

exports.updateFlashCard = async (newFlashCard, oldFlashCardId, userId) => {
    try {
        const card = await FlashCardModel.findOne({ _id: oldFlashCardId, userId: userId });
        if(card){
            card.furigana = newFlashCard.furigana
            card.kanji = newFlashCard.kanji
            card.mean = newFlashCard.mean
            card.hanviet = newFlashCard.hanviet
            card.example = newFlashCard.example
            card.exampleMean = newFlashCard.exampleMean
            card.save()
        }

        return card;
    } catch (error) {
        throw error;
    }
};

exports.removeFlashCard = async (cardId, userId) => {
    try {
        const card = await FlashCardModel.findOne({ _id: cardId, userId: userId });
        if(card){
            card.delete();
            return true;
        }

        return false;
    } catch (error) {
        throw error;
    }
};

const {
  createFlashCard,
  getListFlashCard,
  updateFlashCard,
  removeFlashCard,
} = require('../services/flashcard.service');

const {
  getWordPack: serviceGetWordPack,
} = require('../services/common.service');

exports.getWordPack = async (req, res, next) => {
  try {
    const { page, perPage, packInfo } = req.query;
    const pageInt = parseInt(page),
      perPageInt = parseInt(perPage);
    const skip = (pageInt - 1) * perPageInt;

    const packList = await serviceGetWordPack(
      JSON.parse(packInfo),
      skip,
      perPageInt,
      '-_id type word mean level phonetic examples picture',
      null,
      { $and: [{ picture: { $ne: null } }, { picture: { $ne: '' } }] },
    );

    return res.status(200).json({ packList });
  } catch (error) {
    return res.status(503).json({ message: 'Lỗi dịch vụ, thử lại sau' });
  }
};

exports.create = async (req, res, next) => {
  try {
    const userId = req.user.accountId;
    const { furigana, kanji, hanviet, mean, example, exampleMean } = req.body;
    // console.log(req.body)

    const isCreate = await createFlashCard(
      furigana,
      kanji,
      hanviet,
      mean,
      example,
      exampleMean,
      userId,
    );

    if (isCreate)
      return res.status(200).json({ message: 'Tạo flashcard mới thành công' });
    return res.status(503).json({ message: 'Lỗi dịch vụ, thử lại sau' });
  } catch (error) {
    return res.status(503).json({ message: 'Lỗi dịch vụ, thử lại sau' });
  }
};

exports.list = async (req, res, next) => {
  try {
    const userId = req.user.accountId;

    const list = await getListFlashCard(userId);

    if (list) return res.status(200).json(list);
    return res.status(503).json({ message: 'Lỗi dịch vụ, thử lại sau' });
  } catch (error) {
    return res.status(503).json({ message: 'Lỗi dịch vụ, thử lại sau' });
  }
};

exports.update = async (req, res, next) => {
  try {
    const userId = req.user.accountId;

    const { furigana, kanji, hanviet, mean, example, exampleMean, oldId } =
      req.body;

    const newFlashCard = {
      furigana,
      kanji,
      hanviet,
      mean,
      example,
      exampleMean,
    };

    const card = await updateFlashCard(newFlashCard, oldId, userId);
    if (card)
      return res.status(200).json({ message: 'Sửa flashcard mới thành công' });
    return res.status(503).json({ message: 'Lỗi dịch vụ, thử lại sau' });
  } catch (error) {
    return res.status(503).json({ message: 'Lỗi dịch vụ, thử lại sau' });
  }
};

exports.remove = async (req, res, next) => {
  try {
    const userId = req.user.accountId;

    const { id } = req.body;

    const card = await removeFlashCard(id, userId);
    if (card)
      return res.status(200).json({ message: 'Xoá flashcard thành công' });
    return res.status(503).json({ message: 'Lỗi dịch vụ, thử lại sau' });
  } catch (error) {
    return res.status(503).json({ message: 'Lỗi dịch vụ, thử lại sau' });
  }
};

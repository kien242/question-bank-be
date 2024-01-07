const { Schema, Types, model } = require('mongoose');
const { COLLECTION_NAME } = require('../../config/database/collectionName.js');

const answerSchema = new Schema({
  userID: {
    type: Types.ObjectId,
    ref: COLLECTION_NAME.USER,
    required: true,
  },
  testId: {
    type: Types.ObjectId,
    ref: COLLECTION_NAME.TEST,
    required: true,
  },
  score: {
    type: Number,
  },
  detail: [
    {
      questionId: {
        type: Types.ObjectId,
        ref: COLLECTION_NAME.QUESTION,
      },
    },
  ],
});

const answerModel = model(COLLECTION_NAME.ANSWER, answerSchema);

module.exports = { answerModel };

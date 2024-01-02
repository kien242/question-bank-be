const { Schema, Types } = require('mongoose');
const { COLLECTION_NAME } = require('../../config/database/collectionName.js');

const testSchema = new Schema({
  ownerId: {
    type: Types.ObjectId,
    ref: COLLECTION_NAME.USER,
    required: true,
  },
  userTest: [{ type: Schema.Types.ObjectId, ref: COLLECTION_NAME.USER }],
  answerId: [{ type: Schema.Types.ObjectId, ref: COLLECTION_NAME.ANSWER }],
  testName: {
    type: String,
    required: true,
  },
  accessType: {
    type: Number,
    required: true,
    enum: QUESTION_ACCESS,
    default: QUESTION_ACCESS.PUBLIC,
  },
  accessPassword: {
    type: String,
  },
  testTime: {
    unit: String,
    duration: Number,
  },
  numOfTestAgain: {
    type: Number,
    default: 0,
  },
  testStart: {
    type: Date,
  },
  showAnswerAfterTest: {
    type: Boolean,
  },
  testStatus: { type: Boolean },
  testDescription: {
    type: String,
  },
  listQuestion: [
    {
      quickView: {
        type: String,
      },
      questionScore: {
        type: Number,
      },
      questionId: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME.QUESTION,
      },
    },
  ],
  totalScore: {
    type: Number,
    min: 0,
    enum: (listQuestion) => {
      listQuestion.reduce((acc, score) => acc + score.questionScore, 0);
    },
  },
  passScore: {
    type: Number,
    min: 0,
    max: totalScore,
  },
});

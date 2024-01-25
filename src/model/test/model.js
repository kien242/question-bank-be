const { Schema, Types, model } = require('mongoose');
const { COLLECTION_NAME } = require('../../config/database/collectionName.js');
const { ACCESS_TYPE } = require('../../config/accessType.js');

const questionSch = new Schema(
    {
    // questionIndex: {
    //   type: Number,
    // },
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
    {
      _id: false,
    },
);
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
    enum: ACCESS_TYPE,
    default: ACCESS_TYPE.PUBLIC,
  },
  shareMember: [
    {
      type: Types.ObjectId,
      ref: COLLECTION_NAME.USER,
    },
  ],
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
  listQuestions: [questionSch],
  totalScore: {
    type: Number,
    min: 0,
  },
  passScore: {
    type: Number,
    min: 0,
  },
});

const testModel = model(COLLECTION_NAME.TEST, testSchema);

module.exports = { testModel };

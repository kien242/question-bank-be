const { COLLECTION_NAME } = require('../../config/database/collectionName.js');
const { ACCESS_AUTHORIZATION } = require('../../config/database/permission.js');
const { QUESTION_TYPE } = require('../../config/database/questionType.js');
const { Schema, Types, model } = require('mongoose');

const questionTypeSchema = new Schema(
  {},
  {
    discriminatorKey: 'questionType',
    _id: false,
  },
);

const modelSchema = new Schema(
  {
    userOwner: {
      type: Types.ObjectId,
      ref: COLLECTION_NAME.USER,
      require: true,
    },
    accessAuthorization: {
      type: Number,
      require: true,
      enum: ACCESS_AUTHORIZATION,
      default: ACCESS_AUTHORIZATION.PUBLIC,
    },
    subject: {
      type: String,
      require: true,
    },
    grade: {
      type: String,
      require: true,
    },
    topics: {
      type: Array,
      default: [],
    },
    questionContent: questionTypeSchema,
  },
  {
    timestamps: true,
    collation: { locale: 'en_US', strength: 1 },
  },
);

const choiceQuestion = new Schema(
  {
    difficult: {
      type: Number,
      enum: ['Nhận biết', 'Thông hiểu', 'Vận dụng'],
    },
    contentQuestions: {
      type: String,
      require: true,
    },
    answerList: [{ answerContent: String, isTrue: { type: Boolean, default: false } }],
  },
  {
    _id: false,
  },
);

const multiChoiceQuestion = new Schema(
  {
    difficult: {
      type: Number,
      enum: ['Nhận biết', 'Thông hiểu', 'Vận dụng'],
    },
    contentQuestions: {
      type: String,
      require: true,
    },
    answerList: [{ answerContent: String, isTrue: { type: Boolean, default: false } }],
  },
  {
    _id: false,
  },
);

const textInput = new Schema(
  {
    difficult: {
      type: String,
      enum: ['Nhận biết', 'Thông hiểu', 'Vận dụng'],
    },
    contentQuestions: {
      type: String,
      require: true,
    },
    answer: {
      type: String,
    },
  },
  { _id: false },
);

modelSchema.path('questionContent').discriminator(QUESTION_TYPE.CHOICE, choiceQuestion);
modelSchema.path('questionContent').discriminator(QUESTION_TYPE.MULTI_CHOICE, multiChoiceQuestion);
modelSchema.path('questionContent').discriminator(QUESTION_TYPE.TEXT_INPUT, textInput);

const questionModel = model(COLLECTION_NAME.QUESTION, modelSchema);

module.exports = { questionModel };

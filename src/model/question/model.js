const { Schema, Types, model } = require('mongoose');
const { QUESTION_TYPE } = require('../../config/database/question/questionType.js');
const { COLLECTION_NAME } = require('../../config/database/collectionName.js');
const { QUESTION_ACCESS } = require('../../config/database/question/questionAccess.js');
const { QUESTION_DIFFICULTY } = require('../../config/database/question/questionDifficulty.js');

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
      enum: QUESTION_ACCESS,
      default: QUESTION_ACCESS.PUBLIC,
    },
    subject: {
      //Môn học, bộ môn
      type: String,
      require: true,
    },
    grade: {
      //Khối lớp
      type: String,
      require: true,
    },
    topics: {
      // Chủ đề
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
      enum: QUESTION_DIFFICULTY,
      default: QUESTION_DIFFICULTY.KNOWINGS,
      require: true,
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
      enum: QUESTION_DIFFICULTY,
      default: QUESTION_DIFFICULTY.KNOWINGS,
      require: true,
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
      enum: QUESTION_DIFFICULTY,
      default: QUESTION_DIFFICULTY.KNOWINGS,
      require: true,
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

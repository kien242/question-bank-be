const { Schema, Types, model } = require('mongoose');
const { QUESTION_TYPE } = require('../../config/database/question/questionType.js');
const { COLLECTION_NAME } = require('../../config/database/collectionName.js');
const { ACCESS_TYPE } = require('../../config/accessType.js');
const { QUESTION_DIFFICULTY } = require('../../config/database/question/questionDifficulty.js');

const imageSch = new Schema({
  imageURL: {
    type: String,
  },
  imageDescription: {
    type: String,
  },
});
const questionTypeSchema = new Schema(
    {
      questionType: { type: Number, required: true },
    },
    {
      discriminatorKey: 'questionType',
      _id: false,
    },
);

const modelSchema = new Schema(
    {
      ownerId: {
        type: Types.ObjectId,
        ref: COLLECTION_NAME.USER,
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

      subject: {
      // Môn học, bộ môn
        type: Types.ObjectId,
        ref: COLLECTION_NAME.SUBJECT,
        required: true,
      },
      grade: {
      // Khối lớp
        type: Types.ObjectId,
        ref: COLLECTION_NAME.GRADE,
        required: true,
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
        required: true,
      },
      contentQuestions: {
        type: String,
        required: true,
      },
      questionImage: [imageSch],
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
        required: true,
      },
      contentQuestions: {
        type: String,
        required: true,
      },
      questionImage: [imageSch],
      answerList: [{ answerContent: String, isTrue: { type: Boolean, default: false } }],
    },
    {
      _id: false,
    },
);

const textInput = new Schema(
    {
      difficult: {
        type: Number,
        enum: QUESTION_DIFFICULTY,
        default: QUESTION_DIFFICULTY.KNOWINGS,
        required: true,
      },
      contentQuestions: {
        type: String,
        required: true,
      },
      questionImage: [imageSch],
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

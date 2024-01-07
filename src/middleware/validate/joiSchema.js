const Joi = require('joi');
const { ROLE } = require('../../config/database/user/userRole.js');
const { GENDER_IDENTITY } = require('../../config/database/user/gender.js');
const { QUESTION_ACCESS } = require('../../config/database/question/questionAccess.js');
const { QUESTION_DIFFICULTY } = require('../../config/database/question/questionDifficulty.js');
const { QUESTION_TYPE } = require('../../config/database/question/questionType.js');

const userReqSch = Joi.object({
  fullName: Joi.string(),
  userName: Joi.string().alphanum().min(3).max(30),
  password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-_@#$%^*()<>]).{8,}$')),
  birthday: Joi.number().integer().min(1900).max(new Date().getFullYear()),
  email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      })
      .messages({
        'string.email': `Email không đúng định dạng cần có @ và domain (.com hoặc .net)`,
      }),
  avatarUrl: Joi.string(),
  role: Joi.string().valid(...Object.values(ROLE)),
  genderIdentity: Joi.string().valid(...Object.values(GENDER_IDENTITY)),
});
const questionSch = Joi.array().items(
    Joi.object().keys({
      accessType: Joi.number().valid(...Object.values(QUESTION_ACCESS)),
      subject: Joi.string().required(),
      grade: Joi.string().required(),
      topics: Joi.array(),
      questionContent: Joi.object()
          .keys({
            questionType: Joi.number().valid(...Object.values(QUESTION_TYPE)),
            difficult: Joi.number()
                .valid(...Object.values(QUESTION_DIFFICULTY))
                .required(),
            contentQuestions: Joi.string().required(),
            answerList: Joi.array(),
            answer: Joi.string(),
          })
          .required(),
    }),
);

const gradeSch = Joi.object({
  gradeName: Joi.string().required(),
  gradeCode: Joi.string().required(),
  gradeDescription: Joi.string().required(),
});

const subjectSch = Joi.object({
  subjectName: Joi.string().required(),
  subjectCode: Joi.string().required(),
  subjectDescription: Joi.string().required(),
});

module.exports = { userReqSch, questionSch, subjectSch, gradeSch };

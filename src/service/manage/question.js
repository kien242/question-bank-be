const { hash } = require('bcrypt');
const { QUESTION_ACCESS } = require('../../config/database/question/questionAccess.js');
const { userModel } = require('../../model/access/user/model.js');
const { questionModel } = require('../../model/question/model.js');
const { logError } = require('../../utils/consoleLog/consoleColors.js');
const { NotFoundError, ForbiddenError } = require('../../utils/core/error.res.js');
const { OTHER_CONFIG } = require('../../config/other.js');

const questionService = {
  createNewQuestion: async (userId, questionData) => {
    const saveQuestions = [];
    for (i = 0; i < questionData.length; i++) {
      const saveQuestion = await questionModel.create({
        ownerId: userId,
        accessAuthorization: questionData[i].accessAuthorization,
        subject: questionData[i].subject,
        grade: questionData[i].grade,
        topics: questionData[i].topics,
        questionContent: questionData[i].questionContent,
      });
      saveQuestions.push(saveQuestion);
    }
    return { saveQuestions };
  },
  getQuestion: async (userId, query) => {
    console.log(query);
    return query;
  },
};

module.exports = { questionService };

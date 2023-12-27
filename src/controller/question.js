const { HEADER } = require('../config/header.js');
const { REQ_CUSTOM_FILED } = require('../config/reqCustom.js');
const { questionService } = require('../service/question.js');
const { logInfo } = require('../utils/consoleLog/consoleColors.js');
const { OK } = require('../utils/core/success.res.js');

const questionController = {
  createNewQuestion: async (req, res) => {
    logInfo('[Question]::createNewQuestion');
    const questionData = req.body[REQ_CUSTOM_FILED.QUESTION_DATA];
    const userId = req.headers[HEADER.USER_ID];
    new OK({
      message: 'Create new question successfully',
      metadata: await questionService.createNewQuestion(userId, questionData),
    }).send(res);
  },
  getQuestion: async (req, res) => {
    logInfo('[Question]::getQuestion');
    const userId = req.headers[HEADER.USER_ID];
    const queryObject = req.query;
    new OK({
      message: 'Get list question successfully',
      metadata: await questionService.getQuestion(userId, queryObject),
    }).send(res);
  },
};

module.exports = { questionController };

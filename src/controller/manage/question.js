const _ = require('lodash');
const { HEADER } = require('../../config/header.js');
const { OK } = require('../../utils/core/success.res.js');
const { REQ_CUSTOM_FILED } = require('../../config/reqCustom.js');
const { logInfo } = require('../../utils/consoleLog/consoleColors.js');
const { questionService } = require('../../service/manage/question.js');

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
    const queryObject = _.pickBy(req.query, function (value) {
      return value !== null && value !== undefined && value !== '';
    });
    new OK({
      message: 'Get list question successfully',
      metadata: await questionService.getQuestion(userId, queryObject),
    }).send(res);
  },
};

module.exports = { questionController };

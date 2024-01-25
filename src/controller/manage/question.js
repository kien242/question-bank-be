const _ = require('lodash');
const { OK } = require('../../utils/core/success.res.js');
const { REQ_CUSTOM_FILED } = require('../../config/reqCustom.js');
const { logInfo } = require('../../utils/consoleLog/consoleColors.js');
const { questionService } = require('../../service/manage/question.js');
const { generateQuery } = require('../../helper/param/convert2query.js');
const { userModel } = require('../../model/access/user/model.js');
const { ROLE } = require('../../config/database/user/userRole.js');

const questionController = {
  createNewQuestion: async (req, res) => {
    logInfo('[Question]::createNewQuestion');
    const questionData = req.body[REQ_CUSTOM_FILED.QUESTION_DATA];
    const { userId } = req.body[REQ_CUSTOM_FILED.JWT_PAYLOAD];
    new OK({
      message: 'Create new question successfully',
      metadata: await questionService.createNewQuestion(userId, questionData),
    }).send(res);
  },
  getQuestion: async (req, res) => {
    logInfo('[Question]::getQuestion');
    const { userId } = req.body[REQ_CUSTOM_FILED.JWT_PAYLOAD];
    const foundUser = await userModel.findOne({ _id: userId });
    let isAdmin;
    foundUser.role === ROLE.ADMIN ? (isAdmin = true) : (isAdmin = false);
    console.log(isAdmin);
    const queryRaw = _.pickBy(req.query, function (value) {
      return value !== null && value !== undefined && value !== '';
    });
    const queryObject = generateQuery(queryRaw, isAdmin, userId);
    console.log(queryObject);
    new OK({
      message: 'Get list question successfully',
      metadata: await questionService.getQuestion(userId, queryObject),
    }).send(res);
  },
};

module.exports = { questionController };

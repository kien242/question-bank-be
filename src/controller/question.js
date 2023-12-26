const { questionService } = require('../service/question.js');
const { logInfo } = require('../utils/consoleLog/consoleColors.js');
const { OK } = require('../utils/core/success.res.js');

const questionController = {
  createNewQuestion: async (req, res) => {
    logInfo('[Question]::createNewQuestion');
    new OK({
      message: 'Create new question successfully',
      metadata: await questionService.createNewQuestion(),
    }).send(res);
  },
};

module.exports = { questionController };

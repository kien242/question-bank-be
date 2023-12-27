const { Router } = require('express');
const { asyncHandle } = require('../../../utils/asyncHandle/index.js');
const { questionController } = require('../../../controller/question.js');
const { validateReq } = require('../../../middleware/validate/validate.js');
const { questionSch } = require('../../../middleware/validate/joiSchema.js');
const { REQ_CUSTOM_FILED } = require('../../../config/reqCustom.js');

const questionRouter = Router();

questionRouter.post(
  '/create-new-question',
  asyncHandle(validateReq(questionSch, REQ_CUSTOM_FILED.QUESTION_DATA)),
  asyncHandle(questionController.createNewQuestion),
);

questionRouter.get('/get-question', asyncHandle(questionController.getQuestion));
module.exports = questionRouter;

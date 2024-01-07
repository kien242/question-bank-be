const { Router } = require('express');
const { asyncHandle } = require('../../../../utils/asyncHandle/index.js');
const testController = require('../../../../controller/manage/test.js');
const { validateReq } = require('../../../../middleware/validate/validate.js');
const { testSch } = require('../../../../middleware/validate/joiSchema.js');
const { REQ_CUSTOM_FILED } = require('../../../../config/reqCustom.js');

const testRouter = Router();
testRouter.post(
    '/',
    asyncHandle(validateReq(testSch, REQ_CUSTOM_FILED.TEST_DATA)),
    asyncHandle(testController.createTest),
); // TODO
// testRouter.get('/', asyncHandle(testController.getTest)); //TODO
// testRouter.put('/', asyncHandle(testController.updateTest)) // TODO
// testRouter.delete('/', asyncHandle(testController.deleteTest)); //TODO
module.exports = testRouter;

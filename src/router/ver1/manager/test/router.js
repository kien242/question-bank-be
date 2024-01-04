const { Router } = require('express');
const { asyncHandle } = require('../../../../utils/asyncHandle/index.js');
const testController = require('../../../../controller/manage/test.js');

const testRouter = Router();
// testRouter.post('/', asyncHandle(testController.createTest)) // TODO
// testRouter.get('/', asyncHandle(testController.getTest)); //TODO
// testRouter.put('/', asyncHandle(testController.updateTest)) // TODO
// testRouter.delete('/', asyncHandle(testController.deleteTest)); //TODO
module.exports = testRouter;

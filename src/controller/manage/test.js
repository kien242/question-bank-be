const { REQ_CUSTOM_FILED } = require('../../config/reqCustom.js');
const { testService } = require('../../service/manage/test.js');
const { logInfo } = require('../../utils/consoleLog/consoleColors.js');
const { OK } = require('../../utils/core/success.res.js');

const testController = {
  createTest: async (req, res) => {
    logInfo('[TestController]::createNewTest');
    const { userId } = req.body[REQ_CUSTOM_FILED.JWT_PAYLOAD];
    const testData = req.body[REQ_CUSTOM_FILED.TEST_DATA];
    new OK({
      message: 'Create new test successfully',
      metadata: await testService.createNewTest(userId, testData),
    }).send(res);
  },
  deleteTest: async (req, res) => {
    logInfo('[TestController]::deleteTest');
    const { testId } = req.query;
    new OK({
      message: 'Delete test successfully',
      metadata: await testService.deleteTest(testId),
    }).send(res);
  },
};

module.exports = { testController };

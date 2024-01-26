const { testModel } = require('../../model/test/model.js');

const testService = {
  createNewTest: async (userId, testData) => {
    const saveTest = await testModel.create({
      ownerId: userId,
      testName: testData.testName,
      accessType: testData.accessType,
      shareMember: testData.shareMember,
      accessPassword: testData.accessPassword,
      testTime: testData.testTime,
      numOfTestAgain: testData.numOfTestAgain,
      testStart: testData.testStart,
      showAnswerAfterTest: testData.showAnswerAfterTest,
      testStatus: testData.testStatus,
      testDescription: testData.accessType,
      listQuestions: testData.listQuestions,
      totalScore: testData.totalScore,
      passScore: testData.passScore,
    });
    return { test: saveTest };
  },

  getTest: async (userId) => {},
  // TODO,,
  updateTest: async (testId, testData) => {},

  deleteTest: async (testId) => {
    const delTest = await testModel.findOneAndDelete({ _id: testId });
    return delTest;
  },
};

module.exports = { testService };

const { REQ_CUSTOM_FILED } = require('../../config/reqCustom.js');
const { gradeService } = require('../../service/manage/grade.js');
const { logInfo, logWarn } = require('../../utils/consoleLog/consoleColors.js');
const { OK } = require('../../utils/core/success.res.js');

const gradeController = {
  createNewGrade: async (req, res) => {
    logInfo('[Grade]::createNewGrade');
    const gradeData = req.body[REQ_CUSTOM_FILED.GRADE_DATA];
    new OK({
      message: 'Create new grade successfully',
      metadata: await gradeService.createNewGrade(gradeData),
    }).send(res);
  },
  getAllGrade: async (req, res) => {
    logInfo('[Grade]::getAllGrade');
    new OK({
      message: 'Get all grade successfully',
      metadata: await gradeService.getAllGrade(),
    }).send(res);
  },
  deleteGrade: async (req, res) => {
    logWarn('[Grade]::deleteGrade');
    new OK({
      message: 'Delete grade successfully',
      metadata: await gradeService.deleteGrade(),
    }).send(res);
  },
};

module.exports = { gradeController };

const { REQ_CUSTOM_FILED } = require('../../config/reqCustom.js');
const { gradeService } = require('../../service/manage/grade.js');
const { logInfo, logWarn } = require('../../utils/consoleLog/consoleColors.js');
const { OK } = require('../../utils/core/success.res.js');
const { logError } = require('../../utils/consoleLog/consoleColors.js');
const { BadRequestError } = require('../../utils/core/error.res.js');

const gradeController = {
  createNewGrade: async (req, res) => {
    logInfo('[Grade]::createNewGrade');
    const gradeData = req.body[REQ_CUSTOM_FILED.GRADE_DATA];

    new OK({
      message: 'Create new grade successfully',
      metadata: await gradeService.createNewGrade(gradeData),
    }).send(res);
  },
  getAllGrade: async (_, res) => {
    logInfo('[Grade]::getAllGrade');
    new OK({
      message: 'Get all grade successfully',
      metadata: await gradeService.getAllGrade(),
    }).send(res);
  },
  getDetailGrade: async (req, res) => {
    logInfo('[Grade]::getAllGrade');
    const { idGrade } = req.body[REQ_CUSTOM_FILED.GRADE_DATA];

    // kiểm tra xem Id có hay không, có khác "" không
    if (!idGrade || idGrade.length === 0) {
      logError('[Grade]: Missing id grand');
      throw new BadRequestError('ID grands is field required');
    }

    new OK({
      message: 'Get detail a grade successfully',
      metadata: await gradeService.getDetailGrade(idGrade),
    }).send(res);
  },
  updateGrade: async (req, res) => {
    logInfo('[Grade]::getAllGrade');
    const data = req.body[REQ_CUSTOM_FILED.GRADE_DATA];

    if (!data) {
      logError(`[subject]: Missing data update`);
      throw new BadRequestError('Data update is required');
    }

    new OK({
      message: 'Get all grade successfully',
      metadata: await gradeService.updateGrade(data),
    }).send(res);
  },
  deleteGrade: async (req, res) => {
    logWarn('[Grade]::deleteGrade');
    const gradeIds = req.body[REQ_CUSTOM_FILED.GRADE_DATA] ?? [];

    if (!gradeIds || gradeIds.length === 0) {
      logError('[Grade]: Missing id grand');
      throw new BadRequestError('ID grades is field required');
    }

    new OK({
      message: 'Delete grade successfully',
      metadata: await gradeService.deleteGrade(gradeIds),
    }).send(res);
  },
};

module.exports = { gradeController };

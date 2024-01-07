const { logInfo } = require('../../utils/consoleLog/consoleColors.js');
const { OK } = require('../../utils/core/success.res.js');
const { subjectService } = require('../../service/manage/subject.js');
const { BadRequestError } = require('../../utils/core/error.res');
const { REQ_CUSTOM_FILED } = require('../../config/reqCustom.js');

const subjectController = {
  createNewSubject: async (req, res) => {
    logInfo('[subject]: create new subject');
    const subject = req.body[REQ_CUSTOM_FILED.SUBJECT_DATA];

    new OK({
      message: 'create new subject success',
      metadata: await subjectService.createNewSubject(subject),
    }).send(res);
  },

  getDetailSubject: async (req, res) => {
    logInfo('[subject]: get detail subject');
    const { subjectId } = req.body[REQ_CUSTOM_FILED.SUBJECT_DATA];
    // kiểm tra xem Id có hay không, có khác "" không
    if (!subjectId || subjectId.length === 0) {
      logError(`[subject]: Missing id subject`);
      throw new BadRequestError('ID subject is required field');
    }

    new OK({
      message: 'Get detail a subject success',
      metadata: await subjectService.getDetailSubject(subjectId),
    }).send(res);
  },

  getSubjects: async (_, res) => {
    logInfo('[subject]: get all subject');
    new OK({
      message: 'Get subjects success',
      metadata: await subjectService.getSubjects(),
    }).send(res);
  },
  updateSubject: async (req, res) => {
    const data = req.body[REQ_CUSTOM_FILED.SUBJECT_DATA];
    if (!data) {
      logError(`[subject]: Missing data update`);
      throw new BadRequestError('Data update is required');
    }

    new OK({
      message: 'Get detail a subject success',
      metadata: await subjectService.updateSubject(data),
    }).send(res);
  },

  deleteSubjects: async (req, res) => {
    const subjectIDs = req.body[REQ_CUSTOM_FILED.SUBJECT_DATA] ?? [];

    if (!subjectIDs || subjectIDs.length === 0) {
      logError(`[subject]: Missing id subject`);
      throw new BadRequestError('ID subjects is required field');
    }

    new OK({
      message: 'Delete subjects success',
      metadata: await subjectService.deleteSubjects(subjectIDs),
    }).send(res);
  },
};

module.exports = { subjectController };

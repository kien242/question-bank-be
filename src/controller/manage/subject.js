const { logInfo } = require('../../utils/consoleLog/consoleColors.js');
const { OK } = require('../../utils/core/success.res.js');
const { subjectService } = require('../../service/manage/subject.js');
const { BadRequestError } = require('../../utils/core/error.res');
const { checkRequiedField } = require('../../utils/other/validateField.js');

const subjectController = {
  createNewSubject: async (req, res) => {
    logInfo('[subject]: create new subject');
    const subject = req.body(REQ_CUSTOM_FILED.QUESTION_DATA);
    checkRequiedField(gradeData, ['subjectName', 'subjectCode', 'subjectDescription']);

    new OK({
      message: 'create new subject success',
      metadata: await subjectService.createNewSubject(subject),
    }).send(res);
  },

  getDetailSubject: async (req, res) => {
    logInfo('[subject]: get detail subject');

    const idSubject = req.body(REQ_CUSTOM_FILED.QUESTION_DATA)[id];

    // kiểm tra xem Id có hay không, có khác "" không
    if (!idSubject || idSubject.length === 0) {
      logError(`[subject]: Missing id subject`);
      throw new BadRequestError('ID subject is requied field');
    }

    new OK({
      message: 'Get detail a subject success',
      metadata: await subjectService.getDetailSubject(idSubject),
    }).send(res);
  },

  getSubjects: async () => {
    new OK({
      message: 'Get subjects success',
      metadata: await subjectService.getSubjects(),
    }).send(res);
  },
  updateSubject: async (_, res) => {
    // waiting to code
    console.log(first);
  },

  deleteSubjects: async (req, res) => {
    const subjectIDs = req.body(REQ_CUSTOM_FILED.QUESTION_DATA) ?? [];

    if (!subjectIDs || subjectIDs.length === 0) {
      logError(`[subject]: Missing id subject`);
      throw new BadRequestError('ID subjects is requied field');
    }

    new OK({
      message: 'Get subjects success',
      metadata: await subjectService.deleteSubjects(subjectIDs),
    }).send(res);
  },
};

module.exports = { subjectController };

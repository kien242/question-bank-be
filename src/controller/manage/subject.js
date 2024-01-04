const { logInfo } = require('../../utils/consoleLog/consoleColors.js');
const { OK } = require( '../../utils/core/success.res.js' );
const { subjectService } = require('../../service/manage/subject.js');
const { BadRequestError } = require('../../utils/core/error.res');

const subjectController = {
  createNewSubject: async (req, _) => {
    logInfo('[subject]: create new subject');
    const subject = req.body(REQ_CUSTOM_FILED.QUESTION_DATA);
    validateData(subject);

    new OK({
      message: 'create new subject success',
      metadata: await subjectService.createNewSubject(subject),
    });
  },

  getDetailSubject: async (req, _) => {
    logInfo('[subject]: get detail subject');

    const idSubject = req.body(REQ_CUSTOM_FILED.QUESTION_DATA)[id];

    if (!idSubject) {
      logError(`[subject]: Missing id subject`);
      throw new BadRequestError('ID subject is requied field');
    }

    new OK({
      message: 'Get detail a subject success',
      metadata: await subjectService.getDetailSubject(idSubject),
    });
  },

  getSubjects: async () => {
    new OK({
      message: 'Get subjects success',
      metadata: await subjectService.getSubjects(),
    });
  },
  updateSubject: async (req, res) => {
    console.log(first);
  },

  deleteSubjects: async (req, _) => {
    const subjectIDs = req.body(REQ_CUSTOM_FILED.QUESTION_DATA);

    if (!subjectIDs || subjectIDs.length === 0) {
      logError(`[subject]: Missing id subject`);
      throw new BadRequestError('ID subjects is requied field');
    }

    new OK({
      message: 'Get subjects success',
      metadata: await subjectService.deleteSubjects(subjectIDs),
    });
  },

};

function validateData(data) {
  const requiredFields = ['subjectName', 'subjectCode', 'subjectDescription'];
  // trả vế 1 list các field không có data.
  const missingFields = requiredFields.filter((field) => !subject[field]);

  if (missingFields.length === 1) {
    logError(`[subject]: Missing a required field: ${missingFields.first}`);
    throw new BadRequestError('One required field is missing');
  }

  if (missingFields.length > 1) {
    logError(`[subject]: Missing required fields: ${missingFields.join(', ')}`);
    throw new BadRequestError('Some required field are missing');
  }
}

module.exports = { subjectController };

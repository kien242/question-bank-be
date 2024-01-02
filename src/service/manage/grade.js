const { gradeModel } = require('../../model/grade/model.js');
const { logError } = require('../../utils/consoleLog/consoleColors.js');
const { BadRequestError } = require('../../utils/core/error.res.js');

const gradeService = {
  createNewGrade: async (data) => {
    const { gradeName, gradeCode, gradeDescription } = data;
    const existGrade = await gradeModel.findOne({
      $or: [{ gradeName }, { gradeCode }, { gradeDescription }],
    });

    if (existGrade) {
      logError('Grade already exists');
      throw new BadRequestError('Grade already exists');
    }
    const newGrade = await gradeModel.create({
      gradeName,
      gradeCode,
      gradeDescription,
    });

    return { newGrade };
  },
  getAllGrade: async () => {
    const allGrade = await gradeModel.find();
    return { allGrade };
  },
  deleteGrade: async () => {},
};

module.exports = { gradeService };

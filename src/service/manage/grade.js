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
    // lấy ra toàn bộ các trình độ học vấn, nếu không có thì trả về list rỗng
    const allGrade = await gradeModel.find() ?? [];
    return { allGrade };
  },
  getDetailGrade: async (data) => {
    const grade = await gradeModel.findById({ _id: data });
    if (!grade) {
      logError( '[get detail grade]: This grade is not exist' );
      throw new BadRequestError(' This grade is not exist ');
    }

    return { grade };
  },

  updateGrade: async (data) => {

  },

  deleteGrade: async (data) => {
    await gradeModel.deleteMany({ _id: { $in: data } });

    return {};
  },
};

module.exports = { gradeService };

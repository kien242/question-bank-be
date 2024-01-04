const { subjectModel } = require('../../model/subject/model');
const { logError } = require('../../utils/consoleLog/consoleColors');
const { BadRequestError } = require('../../utils/core/error.res');

const subjectService = {
  createNewSubject: async(data) => {
    const { subjectName, subjectCode, subjectDescription } = data;

    const isSubjectExist = await subjectModel.findOne({ $or: [{ subjectName }, { subjectCode }] });
    if (isSubjectExist) {
      logError('[create new subject]: This subject is exist');
      throw new BadRequestError('This subject is exist');
    }
    const newSubject = await subjectModel.create({ subjectName, subjectCode, subjectDescription });

    return { newSubject };
  },

  getDetailSubject: async(data) => {
    const subject = subjectModel.find({ _id: data });

    if (!subject) {
      logError( '[get detail subject]: This subject is not exist' );
      throw new BadRequestError(' This subject is not exist ');
    }

    return { subject };
  },

  getSubjects: async(data) => {
    // get data với number page. không có thì trả về list rỗng
    const subjects = subjectModel.find() ?? [];

    return { subjects };
  },

  updateSubject: async(data) => {
    console.log('ahihihihi');
  },

  deleteSubjects: async(data) => {
    // với data là list id các môn học muốn xoá
    subjectModel.deleteMany({ _id: { $in: data ?? [] } });
    return {};
  },
};

module.exports = { subjectService };

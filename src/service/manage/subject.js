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
    const subject = await subjectModel.findById({ _id: data }).lean();

    if (!subject) {
      logError( '[get detail subject]: This subject is not exist' );
      throw new BadRequestError(' This subject is not exist ');
    }

    return { subject };
  },

  getSubjects: async() => {
    // get data với number page. không có thì trả về list rỗng
    const subjects = await subjectModel.find() ?? [];
    return { subjects };
  },

  updateSubject: async(data) => {
    const subjectExist = await subjectModel.findById({ _id: data._id });
    if (!subjectExist) {
      logError( '[get detail subject]: This subject is not exist' );
      throw new BadRequestError(' This subject is not exist ');
    }

    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    const updateSubject = await subjectModel.findByIdAndUpdate({ _id: data._id }, data, options);
    return { updateSubject };
  },

  deleteSubjects: async(data) => {
    // với data là list id các môn học muốn xoá
    await subjectModel.deleteMany({ _id: { $in: data ?? [] } });
    return {};
  },
};

module.exports = { subjectService };

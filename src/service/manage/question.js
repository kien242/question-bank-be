const { questionModel } = require('../../model/question/model.js');

const questionService = {
  createNewQuestion: async (userId, questionData) => {
    const saveQuestions = [];
    for (i = 0; i < questionData.length; i++) {
      const saveQuestion = await questionModel.create({
        ownerId: userId,
        accessType: questionData[i].accessType,
        subject: questionData[i].subject,
        grade: questionData[i].grade,
        topics: questionData[i].topics,
        questionContent: questionData[i].questionContent,
      });
      saveQuestions.push(saveQuestion);
    }
    return { saveQuestions };
  },
  getQuestion: async (userId, query) => {
    const questionList = await questionModel
        .find(query[0])
        .populate({
          path: 'ownerId',
          select: '-password',
        })
        .skip(!query[1].page || !query[1].limit ? '' : query[1].page * query[1].limit)
        .limit(!query[1].limit ? '' : query[1].limit);
    return { questionList };
  },
};

module.exports = { questionService };

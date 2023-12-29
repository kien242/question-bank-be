const { Schema, model } = require('mongoose');
const { COLLECTION_NAME } = require('../../config/database/collectionName.js');

const schema = new Schema({
  gradeName: {
    type: String,
    required: true,
  },
  gradeCode: {
    type: String,
    required: true,
  },
  gradeDescription: {
    type: String,
    required: true,
  },
});

const gradeModel = model(COLLECTION_NAME.GRADE, schema);

module.exports = { gradeModel };

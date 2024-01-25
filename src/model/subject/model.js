const { Schema, model } = require('mongoose');
const { COLLECTION_NAME } = require('../../config/database/collectionName');

const schema = new Schema({
  subjectName: {
    type: String,
    required: true,
  },
  subjectCode: {
    type: String,
    required: true,
  },
  subjectDescription: {
    type: String,
    required: true,
  },
});

const subjectModel = model(COLLECTION_NAME.SUBJECT, schema);

module.exports = { subjectModel };

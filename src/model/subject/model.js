const { Schema } = require('mongoose');

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

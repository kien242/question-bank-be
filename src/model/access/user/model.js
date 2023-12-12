const { Schema, model } = require("mongoose");
const isEmail = require("validator/lib/isEmail");
const { ACTIVE_STATUS } = require("#config/activeStatus.js");
const { COLLECTION_NAME } = require("#config/collectionName.js");
const { ROLE } = require("#config/userRole.js");
const { GENDER_IDENTITY } = require("#config/gender.js");

const modelSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 250,
    },
    email: {
      type: String,
      lowercase: true,
      validate: (value) => {
        return isEmail(value);
      },
      required: true,
      unique: true,
    },
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    avatarUrl: {
      type: String,
    },
    birthday: {
      type: Date,
    },
    genderIdentity: {
      type: String,
      enum: [GENDER_IDENTITY],
    },
    organization: {
      type: String,
    },
    address: {
      type: String,
    },
    status: {
      type: String,
      enum: [ACTIVE_STATUS],
      default: ACTIVE_STATUS.INACTIVE,
    },
    role: {
      type: String,
      enum: [ROLE],
      default: ROLE.STUDENT,
    },

    googleId: {
      // Login với google
      type: String,
    },
    facebookId: {
      // Login với facebook
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
const userModel = model(COLLECTION_NAME.USER, modelSchema);

module.exports = { userModel };

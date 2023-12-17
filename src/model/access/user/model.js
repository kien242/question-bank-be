const { Schema, model } = require('mongoose');
const { ACTIVE_STATUS } = require('#config/database/activeStatus.js');
const { COLLECTION_NAME } = require('#config/database/collectionName.js');
const { ROLE } = require('#config/database/userRole.js');
const { GENDER_IDENTITY } = require('#config/database/gender.js');

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
        default:
        'https://png.pngtree.com/element_our/20200610/ourmid/pngtree-character-default-avatar-image_2237203.jpg',
      },
      birthday: {
        type: Date,
      },
      genderIdentity: {
        type: String,
        enum: [GENDER_IDENTITY],
        default: GENDER_IDENTITY.OTHER,
      },
      organization: {
        type: String,
      },
      address: {
        type: String,
      },
      status: {
        type: Number,
        enum: [ACTIVE_STATUS],
        default: ACTIVE_STATUS.INACTIVE,
      },
      role: {
        type: Number,
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
    },
);

// Export the model
const userModel = model(COLLECTION_NAME.USER, modelSchema);

module.exports = { userModel };

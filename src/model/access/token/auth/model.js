const { Schema, model } = require('mongoose');
const { COLLECTION_NAME } = require('../../../../config/database/collectionName.js');
const modelSchema = new Schema(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME.USER,
        required: true,
      },
      publicKey: {
        type: String,
        required: true,
      },
      privateKey: {
        type: String,
        required: true,
      },
      refreshTokensUsed: {
        type: Array,
        default: [],
      },
      refreshToken: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
      collation: { locale: 'en_US', strength: 1 },
    },
);
const authTokenModel = model(COLLECTION_NAME.AUTHENTICATION_TOKEN, modelSchema);
module.exports = { authTokenModel };

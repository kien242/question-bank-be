const { Schema, model } = require('mongoose');
const { COLLECTION_NAME } = require('../../../../config/database/collectionName.js');
const modelSchema = new Schema(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: COLLECTION_NAME.USER,
        required: true,
      },
      activeToken: {
        type: String,
        required: true,
      },
      activeTokenUse: {
        type: String,
      },
      forwardPasswordToken: {
        type: String,
      },
    },
    {
      timestamps: true,
      collation: { locale: 'en_US', strength: 1 },
    },
);
const activeModel = model(COLLECTION_NAME.ACTIVE_TOKEN, modelSchema);
module.exports = { activeModel };

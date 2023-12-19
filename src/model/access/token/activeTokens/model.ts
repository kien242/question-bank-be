import { Schema, model } from 'mongoose';
import { COLLECTION_NAME } from '../../../../config/database/collectionName';

const modelSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: COLLECTION_NAME.USER,
      require: true,
    },
    activeToken: {
      type: String,
      require: true,
    },
    activeTokenUse: {
      type: String,
    },
  },
  {
    timestamps: true,
    collation: { locale: 'en_US', strength: 1 },
  }
);
const activeModel = model(COLLECTION_NAME.ACTIVE_TOKEN, modelSchema);
export { activeModel };

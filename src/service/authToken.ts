import { Types } from 'mongoose';
import { checkIdValid } from '../utils/other/checkIdValid';
import { authTokenModel } from '../model/access/token/auth/model';

class authTokenService {
  static createKeyTokenSync = async ({ userId, publicKey }) => {
    // Thuật toán bất đối xứng
    try {
      const publicKeyString = publicKey.toString();
      const tokens = await authTokenModel.create({
        user: userId,
        publicKey: publicKeyString,
      });
      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return error;
    }
  };
  static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
    // Thuật toán đối xứng
    try {
      const filter = { userId };
      const update = {
        publicKey,
        privateKey,
        refreshTokensUsed: [],
        refreshToken,
      };
      const option = { upsert: true, new: true, setDefauljsonInsert: true };
      const tokens = await authTokenModel.findOneAndUpdate(filter, update, option);
      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return error;
    }
  };

  static findKeyTokenByUserId = async (userId) => {
    checkIdValid(userId);
    return await authTokenModel.findOne({
      userId: new Types.ObjectId(userId),
    });
  };
  static removeKeyById = async (id) => {
    return await authTokenModel.deleteOne({
      _id: new Types.ObjectId(id),
    });
  };
  static removeKeyByUserId = async (userId) => {
    checkIdValid(userId);
    return await authTokenModel.deleteOne({
      userId: new Types.ObjectId(userId),
    });
  };
  static findByRefreshTokenUsed = async (refreshToken) => {
    return await authTokenModel.findOne({
      refreshTokensUsed: refreshToken,
    });
  };
  static findByRefreshToken = async (refreshToken) => {
    return await authTokenModel.findOne({ refreshToken });
  };
  static deleteKeyById = async (userId) => {
    checkIdValid(userId);
    return await authTokenModel.deleteOne({ userId: userId });
  };
}

export { authTokenService };

const { Types } = require('mongoose');
const { checkIdValid } = require('../../utils/other/checkIdValid.js');
const { authTokenModel } = require('../../model/access/token/auth/model.js');

class authTokenService {
  static createKeyTokenSync = async ({ userId, publicKey, refreshToken }) => {
    // Thuật toán bất đối xứng
    try {
      const publicKeyString = publicKey.toString();
      const filter = { userId };
      const update = { userId, publicKey: publicKeyString, refreshTokensUsed: [], refreshToken };
      const options = { upsert: true, new: true, setDefaultsOnInsert: true };
      const tokens = await authTokenModel.findOneAndUpdate(filter, update, options);
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
      const options = { upsert: true, new: true, setDefaultsOnInsert: true };
      const tokens = await authTokenModel.findOneAndUpdate(filter, update, options);
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
    checkIdValid(userId);
    return await authTokenModel.findOne({
      refreshTokensUsed: refreshToken,
    });
  };
  static findByRefreshToken = async (refreshToken) => {
    checkIdValid(userId);
    return await authTokenModel.findOne({ refreshToken });
  };
  static deleteKeyById = async (userId) => {
    checkIdValid(userId);
    return await authTokenModel.deleteOne({ userId: userId });
  };
}

module.exports = { authTokenService };

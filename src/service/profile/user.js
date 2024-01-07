const { REQ_CUSTOM_FILED } = require('../../config/reqCustom.js');
const { userModel } = require('../../model/access/user/model.js');
const { logError } = require('../../utils/consoleLog/consoleColors.js');
const { ForbiddenError } = require('../../utils/core/error.res.js');
const { removeInfoData } = require('../../utils/other/respData.js');
const _ = require('lodash');

const UserService = {
  findUserById: async (id) => {
    return await userModel.findOne({ _id: id }).lean();
  },
  getCurrentUserInfo: async (req) => {
    const { userId } = req.body[REQ_CUSTOM_FILED.JWT_PAYLOAD];
    const foundUser = await userModel.findOne({ _id: userId }).lean();
    if (!foundUser) {
      logError('Something went wrong when get current profile');
      throw new ForbiddenError('Something went wrong when get current profile');
    }
    return {
      userData: removeInfoData({
        filed: ['password', 'googleId', 'facebookId'],
        source: foundUser,
      }),
    };
  },
  updateCurrentUser: async (req, res) => {
    const { userId } = req.body[REQ_CUSTOM_FILED.JWT_PAYLOAD];
    const rawData = removeInfoData({
      filed: ['email', 'userName', 'password', 'googleId', 'facebookId', 'role', 'status'],
      source: req.body[REQ_CUSTOM_FILED.USER_DATA],
    });
    const update = _.pickBy(rawData, function (value) {
      return value !== null && value !== undefined && value !== '';
    });
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    const updateUser = await userModel.findOneAndUpdate({ _id: userId }, update, options).lean();
    return {
      userData: removeInfoData({
        filed: ['password', 'googleId', 'facebookId', 'createdAt', '__v'],
        source: updateUser,
      }),
    };
  },
};

module.exports = { UserService };

import { removeInfoData } from '../utils/other/respData';
import { HEADER } from '../config/header';
import { REQ_CUSTOM_FILED } from '../config/reqCustom';
import { userModel } from '../model/access/user/model';
import { logError } from '../utils/consoleLog/consoleColors';
import { ForbiddenError } from '../utils/core/error.res';
import _ from 'lodash';

const UserService = {
  findUserById: async (id) => {
    return await userModel.findOne({ _id: id }).lean();
  },
  getCurrentUserInfo: async (req) => {
    const userId = req.headers[HEADER.USER_ID];
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
  updateCurrentUser: async (req) => {
    const userId = req.headers[HEADER.USER_ID];
    const rawData = removeInfoData({
      filed: ['email', 'userName', 'password', 'googleId', 'facebookId', 'role', 'status'],
      source: req.body[REQ_CUSTOM_FILED.USER_DATA],
    });
    const update = _.pickBy(rawData, function (value) {
      return value !== null && value !== undefined && value !== '';
    });
    const options = { upsert: true, new: true, setDefauljsonInsert: true };
    const updateUser = await userModel.findOneAndUpdate({ _id: userId }, update, options).lean();
    return {
      userData: removeInfoData({
        filed: ['password', 'googleId', 'facebookId', 'createdAt', '__v'],
        source: updateUser,
      }),
    };
  },
};

export { UserService };

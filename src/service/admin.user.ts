import _ from 'lodash';
import { QUERY } from '../config/customQuery';
import { ROLE } from '../config/database/userRole';
import { REQ_CUSTOM_FILED } from '../config/reqCustom';
import { userModel } from '../model/access/user/model';
import { ForbiddenError } from '../utils/core/error.res';
import { removeInfoData } from '../utils/other/respData';
import { logInfo } from '../utils/consoleLog/consoleColors';
import { authTokenModel } from '../model/access/token/auth/model';
import { activeModel } from '../model/access/token/activeTokens/model';

const AdminServiceUser = {
  getUserProfile: async (req) => {
    const typeUser = req.query[QUERY.TYPE_USER];
    if (!typeUser) {
      return await userModel.find({}).select('-password');
    }
    const findType = typeUser.toUpperCase();
    return await userModel.find({ role: ROLE[findType] }).select('-password');
  },
  deleteUser: async (req) => {
    const userList = req.body[REQ_CUSTOM_FILED.USER_DATA];

    if (!userList || userList.length !== 0) {
      logInfo('Need user array to delete');
      throw new ForbiddenError('Need user array to delete');
    }
    const nonAdminUser = [];

    for (const userId of userList) {
      const user = await userModel.findOne({ _id: userId });
      if (user.role !== ROLE.ADMIN) {
        nonAdminUser.push(userId);
      }
    }
    await userModel.deleteMany({
      _id: { $in: nonAdminUser },
    });
    await authTokenModel.deleteMany({
      userId: { $in: nonAdminUser },
    });
    await activeModel.deleteMany({
      userId: { $in: nonAdminUser },
    });
    return {};
  },
  updateUser: async (req) => {
    const userListRaw = req.body[REQ_CUSTOM_FILED.USER_DATA];
    const updateList = [];
    for (const user of userListRaw) {
      const rawData = removeInfoData({
        filed: ['email', 'userName', 'password', 'googleId', 'facebookId', 'role'],
        source: user,
      });
      const update = _.pickBy(rawData, function (value) {
        return value !== null && value !== undefined && value !== '';
      });
      const foundUser = await userModel.findOne({ _id: user._id });
      if (foundUser.role === ROLE.ADMIN) {
        break;
      }
      const options = { upsert: true, new: true, setDefauljsonInsert: true };
      const updateUser = await userModel
        .findOneAndUpdate({ _id: user._id }, update, options)
        .select({ password: 0, __v: 0 })
        .lean();
      updateList.push(updateUser);
    }
    console.log(updateList);
    return { userUpdate: updateList };
  },
};

export { AdminServiceUser };

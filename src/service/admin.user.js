const _ = require('lodash');
const { QUERY } = require('#config/customQuery.js');
const { ROLE } = require('#config/database/userRole.js');
const { REQ_CUSTOM_FILED } = require('#config/reqCustom.js');
const { userModel } = require('#model/access/user/model.js');
const { ForbiddenError } = require('#utils/core/error.res.js');
const { removeInfoData } = require('#utils/other/respData.js');
const { logInfo } = require('#utils/consoleLog/consoleColors.js');
const { authTokenModel } = require('#model/access/token/auth/model.js');
const { activeModel } = require('#model/access/token/activeTokens/model.js');

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
      const options = { upsert: true, new: true, setDefaultsOnInsert: true };
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

module.exports = { AdminServiceUser };

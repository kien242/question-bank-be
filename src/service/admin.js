const { QUERY } = require("#config/customQuery.js");
const { ROLE } = require("#config/database/userRole.js");
const { REQ_CUSTOM_FILED } = require("#config/reqCustom.js");
const { userModel } = require("#model/access/user/model.js");

const AdminService = {
	getUserProfile: async (req) => {
		const typeUser = req.query[QUERY.TYPE_USER];
		if (!typeUser) {
			return await userModel.find({}).select("-password");
		}
		const findType = typeUser.toUpperCase();
		return await userModel.find({ role: ROLE[findType] }).select("-password");
	},
	deleteUser: async (req, res) => {
		const userList = req.body[REQ_CUSTOM_FILED.USER_DATA];
		console.log(typeof userList);
		console.log(userList);
		// await userModel.deleteMany({
		// 	_id: { $in: userList },
		// });
	},
};

module.exports = { AdminService };

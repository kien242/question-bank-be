const { AdminService } = require("#service/admin.js");
const { logInfo } = require("#utils/consoleLog/consoleColors.js");
const { OK } = require("#utils/core/success.res.js");

const AdminController = {
	getUserProfile: async (req, res) => {
		logInfo("[admin]::getUserProfile");
		new OK({
			message: "Get user profile successfully",
			metadata: await AdminService.getUserProfile(req),
		}).send(res);
	},
	deleteUser: async (req, res) => {
		logInfo("[admin]::deleteUser");
		new OK({
			message: "Delete user successfully",
			metadata: await AdminService.deleteUser(req),
		}).send(res);
	},
};

module.exports = { AdminController };

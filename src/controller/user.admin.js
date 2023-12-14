const { AdminService } = require("#service/user.admin.js");
const { OK } = require("#utils/core/success.res.js");

const AdminController = {
	getUserProfile: async (req, res) => {
		new OK({
			message: "Get user profile successfully",
			metadata: await AdminService.getUserProfile(req),
		}).send(res);
	},
};

module.exports = { AdminController };

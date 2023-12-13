const { HEADER } = require("#config/header.js");
const { userModel } = require("#model/access/user/model.js");
const { logInfo } = require("#utils/consoleLog/consoleColors.js");
const { ForbiddenError } = require("#utils/core/error.res.js");

const checkRole = (role) => {
	return async (req, res, next) => {
		const userId = req.headers[HEADER.USER_ID];
		const foundUser = await userModel.findOne({ _id: userId });
		if (foundUser.role !== role) {
			logInfo("User is not have role");
			throw new ForbiddenError("User is not have role");
		}
		return next();
	};
};

module.exports = { checkRole };

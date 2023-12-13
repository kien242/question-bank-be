const { Types } = require("mongoose");
const { logError } = require("../consoleLog/consoleColors.js");
const { ForbiddenError } = require("../core/error.res.js");
const checkIdValid = (id) => {
	if (!Types.ObjectId.isValid(id)) {
		logError("UserId is not a valid");
		throw new ForbiddenError("UserId is not a valid");
	}
	return true;
};
module.exports = { checkIdValid };

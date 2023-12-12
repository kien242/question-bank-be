const { AccessService } = require("#service/access.js");
const { logInfo } = require("#utils/consoleLog/consoleColors.js");
const { CREATE } = require("#utils/core/success.res.js");

const AccessController = {
  signUp: async (req, res) => {
    logInfo("[Access]:: signUp");
    new CREATE({
      message: "Create a new user",
      metadata: await AccessService.signUp(req),
    }).send(res);
  },
};
module.exports = { AccessController };

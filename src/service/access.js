const { OTHER_CONFIG } = require("#config/orther.js");
const { REQ_CUSTOM_FILED } = require("#config/reqCustom.js");
const { userModel } = require("#model/access/user/model.js");
const { createTokenPair } = require("#utils/auth/authUtil.js");
const { logError } = require("#utils/consoleLog/consoleColors.js");
const { BadRequestError, ForbiddenError } = require("#utils/core/error.res.js");
const { generateSecretKey } = require("#utils/key/secretKey.js");
const { joiSchema } = require("#middleware/validate/joiSchema.js");
const { hash } = require("bcrypt");
const { authTokenService } = require("./authToken.js");
const { generateActiveLink } = require("#helper/generateActiveLink.js");
const { getInfoData } = require("#utils/other/respData.js");

const AccessService = {
  signUp: async (req) => {
    const { fullName, email, userName, password, role } =
      req.body[REQ_CUSTOM_FILED.USER_DATA];
    const existUser = await userModel.findOne({
      $or: [{ email }, { userName }],
    });
    if (existUser) {
      logError(`User ${userName} with ${email} already`);
      throw new BadRequestError(`User already exists`);
    }

    const passwordHash = await hash(
      password,
      OTHER_CONFIG.ROUNDS_HASH_PASSWORD
    );
    const newUser = await userModel.create({
      email,
      password: passwordHash,
      fullName,
      userName,
      role,
    });

    if (!newUser) {
      logError("Cant create new user");
      throw new ForbiddenError("Cant create new user");
    }

    const { publicKey, privateKey } = generateSecretKey();
    const authToken = await createTokenPair(
      { userId: newUser._id, userName: newUser.userName, role: newUser.role },
      publicKey,
      privateKey
    );
    const saveToken = await authTokenService.createKeyToken({
      userId: newUser._id,
      publicKey,
      privateKey,
      refreshToken: authToken.refreshToken,
    });
    const activeLink = await generateActiveLink(newUser._id);
    if (!saveToken) {
      logError("Can not save token to database");
      throw new ForbiddenError("Can not save token to database");
    }
    return {
      userData: getInfoData({
        filed: ["_id", "fullName", "userName", "role", "email"],
        source: newUser,
      }),
      authToken,
      activeLink,
    };
  },
};
module.exports = { AccessService };

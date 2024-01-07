const crypto = require('crypto');
const JWT = require('jsonwebtoken');
const { hash, compare } = require('bcrypt');
const { createTransport } = require('nodemailer');
const { UserService } = require('../profile/user.js');
const { authTokenService } = require('./authToken.js');
const { OTHER_CONFIG } = require('../../config/other.js');
const { userModel } = require('../../model/access/user/model.js');
const { REQ_CUSTOM_FILED } = require('../../config/reqCustom.js');
const { createTokenPairSync } = require('../../utils/auth/authUtil.js');
const { generateSecretKeySync } = require('../../utils/key/secretKey.js');
const { ACTIVE_STATUS } = require('../../config/database/user/activeStatus.js');
const { getInfoData, removeInfoData } = require('../../utils/other/respData.js');
const { logError, logInfo } = require('../../utils/consoleLog/consoleColors.js');
const { activeModel } = require('../../model/access/token/activeTokens/model.js');
const { generateActiveLink, generateNewPasswordLink } = require('../../helper/generateLink.js');
const { setting, mailActiveForm, mailNewPasswordForm } = require('../../config/mail/nodemailer.config.js');
const {
  BadRequestError,
  ForbiddenError,
  AuthFailureError,
  NotFoundError,
  INTERNAL_SERVER_ERROR,
} = require('../../utils/core/error.res.js');

const AccessService = {
  signUp: async (req) => {
    const { fullName, email, userName, password, role } = req.body[REQ_CUSTOM_FILED.USER_DATA];
    const existUser = await userModel.findOne({
      $or: [{ email }, { userName }],
    });
    if (existUser) {
      logError(`User ${userName} with ${email} already`);
      throw new BadRequestError(`User already exists`);
    }

    const passwordHash = await hash(password, OTHER_CONFIG.ROUNDS_HASH_PASSWORD);
    const newUser = await userModel.create({
      email,
      password: passwordHash,
      fullName,
      userName,
      role,
    });

    if (!newUser) {
      logError('Cant create new user');
      throw new ForbiddenError('Cant create new user');
    }

    const { publicKey, privateKey } = generateSecretKeySync(); // Create Private Key and public key

    // create new accessToken  and refresh token
    const authToken = await createTokenPairSync(
        { userName: newUser.userName, role: newUser.role, userId: newUser._id },
        publicKey,
        privateKey,
    );

    // save publicKey to DB
    const saveToken = await authTokenService.createKeyTokenSync({
      userId: newUser._id,
      publicKey,
      refreshToken: authToken.refreshToken,
    });

    const activeLink = await generateActiveLink(newUser._id);
    if (!saveToken) {
      logError('Can not save token to database');
      throw new ForbiddenError('Can not save token to database');
    }

    const userData = removeInfoData({
      filed: ['password', 'googleId', 'facebookId'],
      source: newUser,
    });

    // Send activeLink to email provider
    const transporter = createTransport(setting);
    const mailOption = mailActiveForm(email, activeLink);

    transporter.sendMail(mailOption, (err, info) => {
      if (err) {
        console.log(err);
      }
    });

    return {
      userData,
      authToken,
      activeLink,
    };
  },
  login: async (req) => {
    const { userName, password, email } = req.body[REQ_CUSTOM_FILED.USER_DATA];
    const foundUser = await userModel
        .findOne({
          $or: [{ email }, { userName }],
        })
        .lean();
    if (!foundUser) {
      logError('User is not exits');
      throw new BadRequestError('User is not registered');
    }
    const matchPass = await compare(password, foundUser.password);
    if (!matchPass) {
      logError('Password is not correct');
      throw new BadRequestError('User or password is not correct');
    }

    const { publicKey, privateKey } = generateSecretKeySync(); // Create Private Key and public key
    // create new accessToken  and refresh token
    const authToken = await createTokenPairSync(
        { userName: foundUser.userName, role: foundUser.role, userId: foundUser._id },
        publicKey,
        privateKey,
    );

    // save publicKey to DB
    const saveToken = await authTokenService.createKeyTokenSync({
      userId: foundUser._id,
      publicKey,
      refreshToken: authToken.refreshToken,
    });
    if (!saveToken) {
      logError('Cant save token to database, Login again');
      throw new BadRequestError('Something wrong, Pls Login again');
    }
    return {
      userData: removeInfoData({
        filed: ['password', 'googleId', 'facebookId'],
        source: foundUser,
      }),
      authToken,
    };
  },
  logout: async (userId) => {
    const deleteToken = await authTokenService.removeKeyByUserId(userId);
    if (!deleteToken) {
      logError('Cant remove token from database, Pls re logout');
      throw new ForbiddenError('Cant logout, Pls Logout again');
    }
    return {};
  },
  changePassword: async (userId, newPassword) => {
    const passwordHash = await hash(newPassword, OTHER_CONFIG.ROUNDS_HASH_PASSWORD);
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    await userModel.findOneAndUpdate({ _id: userId }, { password: passwordHash }, options).lean();
    await activeModel.findOneAndUpdate(
        { userId },
        { forwardPasswordToken: '' },
        { upsert: true, new: true, setDefaultsOnInsert: true },
    );
    return {};
  },
  forwardPassword: async (email, userName) => {
    const foundUser = await userModel
        .findOne({
          email,
        })
        .lean();
    if (foundUser.userName !== userName) {
      logError('userName and Email is not correct');
      throw new INTERNAL_SERVER_ERROR('Something went wrong, please try again');
    }
    // logout user from all sessions
    const deleteToken = await authTokenService.removeKeyByUserId(foundUser._id);
    if (!deleteToken) {
      logError('Cant logout user login sessions');
    }
    // Send new password link to email
    const newPasswordLink = await generateNewPasswordLink(foundUser._id);
    const transporter = createTransport(setting);
    const mailOption = mailNewPasswordForm(email, newPasswordLink);
    console.log(mailOption);
    transporter.sendMail(mailOption, (err, info) => {
      if (err) {
        console.log(err);
        throw new INTERNAL_SERVER_ERROR('Cant send Email');
      }
    });

    return {};
  },
  activeUser: async (userId, activeToken) => {
    const findToken = await activeModel.findOne({ userId });
    if (!findToken) {
      logError('User Id or token is not correct');
      throw new ForbiddenError('User Id or token is not correct');
    }
    if (findToken.activeToken !== activeToken) {
      logError('Active token failed, or user is active');
      throw new ForbiddenError('Active token failed');
    }
    await activeModel.findOneAndUpdate(
        { userId },
        { activeToken: '', activeTokenUse: findToken.activeToken },
        { upsert: true, new: true, setDefaultsOnInsert: true },
    );
    await userModel.findOneAndUpdate(
        { _id: userId },
        { status: ACTIVE_STATUS.ACTIVE },
        { upsert: true, new: true, setDefaultsOnInsert: true },
    );
    return {};
  },
  handleRefreshToken: async (userId, oldRefreshToken) => {
    const keyStore = await authTokenService.findKeyTokenByUserId(userId);
    if (!keyStore) {
      logError('Not found ID in Keys Token Model');
      throw new NotFoundError('Not found KeyStore');
    }
    // Convert publicKey từ dạng string về dạng rsa có thể đọc được
    const publicKeyObject = crypto.createPublicKey(keyStore.publicKey);

    JWT.verify(oldRefreshToken, publicKeyObject, function (err, decode) {
      if (err) {
        switch (err.name) {
          case 'TokenExpiredError':
            logError('Token expired, Pls get new access token');
            throw new AuthFailureError(err.message);
          case 'NotBeforeError':
            logError('JWT not active');
            throw new AuthFailureError(err.message);
          default:
            logError(`JWT error: ${err.name}`);
            throw new AuthFailureError(err.message);
        }
      }
    });
    if (keyStore.refreshTokensUsed.includes(oldRefreshToken)) {
      await authTokenService.deleteKeyById(userId);
      logInfo('Something went wrong, not found refresh token in key store');
      throw new ForbiddenError('Something wrong happen!! Pls login again');
    }
    if (keyStore.refreshToken !== oldRefreshToken) {
      logInfo('Refresh token is not correct');
      throw new AuthFailureError('Something wrong happen!! Check again');
    }

    const foundUser = await UserService.findUserById(userId);

    if (!foundUser) {
      logError('User not found');
      throw new NotFoundError('User not found');
    }

    const { publicKey, privateKey } = generateSecretKeySync(); // Create Private Key and public key
    // create new accessToken  and refresh token
    const authToken = await createTokenPairSync(
        { userName: foundUser.userName, role: foundUser.role, userId: foundUser._id },
        publicKey,
        privateKey,
    );
    await keyStore.updateOne({
      $set: {
        refreshToken: authToken.refreshToken,
        publicKey,
      },
      $addToSet: {
        refreshTokensUsed: oldRefreshToken,
      },
    });

    return {
      userData: getInfoData({
        filed: ['_id'],
        source: foundUser,
      }),
      authToken,
    };
  },
};
module.exports = { AccessService };

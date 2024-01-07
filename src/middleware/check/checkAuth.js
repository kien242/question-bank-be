const { HEADER } = require('../../config/header.js');
const { authTokenService } = require('../../service/access/authToken.js');
const { logError } = require('../../utils/consoleLog/consoleColors.js');
const { AuthFailureError, NotFoundError } = require('../../utils/core/error.res.js');
const JWT = require('jsonwebtoken');
const crypto = require('crypto');
const { REQ_CUSTOM_FILED } = require('../../config/reqCustom.js');

const checkAuth = async (req, res, next) => {
  const rawAccessToken = req.headers[HEADER.JWT_TOKEN];
  const accessToken = rawAccessToken.split(' ')[1];
  // Convert publicKey từ dạng string về dạng rsa có thể đọc được
  const payload = JWT.decode(accessToken);
  const { userId } = payload;
  req.body[REQ_CUSTOM_FILED.JWT_PAYLOAD] = payload;

  const keyTokens = await authTokenService.findKeyTokenByUserId(userId);
  if (!keyTokens) {
    logError('Not found ID in Authentication Token Model');
    throw new NotFoundError('Not found token');
  }
  if (!rawAccessToken) {
    logError('Missing accessToken');
    throw new AuthFailureError('Invalid request');
  }

  const publicKey = crypto.createPublicKey(keyTokens.publicKey);

  try {
    JWT.verify(accessToken, publicKey, function (err, decode) {
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
    return next();
  } catch (error) {
    throw error;
  }
};

module.exports = { checkAuth };

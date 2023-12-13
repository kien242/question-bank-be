const { HEADER } = require("#config/header.js");
const { authTokenService } = require("#service/authToken.js");
const { logError } = require("#utils/consoleLog/consoleColors.js");
const { AuthFailureError, NotFoundError } = require("#utils/core/error.res.js");
const { verify } = require("jsonwebtoken");

const checkAuth = async (req, res, next) => {
  const accessToken = req.headers[HEADER.ACCESS_TOKEN];
  const userId = req.headers[HEADER.USER_ID];
  if (!userId) {
    logError("Missing userId in request");
    throw new AuthFailureError("Invalid request");
  }
  const keyTokens = await authTokenService.findKeyTokenByUserId(userId);
  if (!keyTokens) {
    logError("Not found ID in Authentication Token Model");
    throw new NotFoundError("Not found token");
  }
  if (!accessToken) {
    logError("Missing accessToken");
    throw new AuthFailureError("Invalid request");
  } else {
    try {
      verify(accessToken, keyTokens.publicKey, function (err, decode) {
        if (err) {
          switch (err.name) {
            case "TokenExpiredError":
              logError("Token expired, Pls get new access token");
              throw new AuthFailureError(err.message);
            case "NotBeforeError":
              logError("JWT not active");
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
  }
};

module.exports = { checkAuth };

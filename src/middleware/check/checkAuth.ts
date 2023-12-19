/* eslint-disable @typescript-eslint/no-unused-vars */
import { HEADER } from '../../../src/config/header';
import { authTokenService } from '../../../src/service/authToken';
import { logError } from '../../../src/utils/consoleLog/consoleColors';
import { AuthFailureError, NotFoundError } from '../../../src/utils/core/error.res';
import { NextFunction } from 'express';
import JWT from 'jsonwebtoken';

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  const rawAccessToken = req.headers[HEADER.ACCESS_TOKEN];
  const userId = req.headers[HEADER.USER_ID];
  if (!userId) {
    logError('Missing userId in request');
    throw new AuthFailureError('Invalid request');
  }
  const keyTokens = await authTokenService.findKeyTokenByUserId(userId);
  if (!keyTokens) {
    logError('Not found ID in Authentication Token Model');
    throw new NotFoundError('Not found token');
  }
  if (!rawAccessToken) {
    logError('Missing accessToken');
    throw new AuthFailureError('Invalid request');
  }
  const accessToken = rawAccessToken.split(' ')[1];

  JWT.verify(accessToken, keyTokens.publicKey, function (err, decode) {
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
};

export { checkAuth };

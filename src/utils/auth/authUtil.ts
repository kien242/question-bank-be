import { logError } from '../../../src/utils/consoleLog/consoleColors';
import JWT from 'jsonwebtoken';

const createTokenPairSync = async (payload, publicKey, privateKey) => {
  const accessToken = await JWT.sign(payload, privateKey, {
    algorithm: 'RS256',
    expiresIn: '30 minutes',
  });

  const refreshToken = await JWT.sign(payload, privateKey, {
    algorithm: 'RS256',
    expiresIn: '7 days',
  });

  JWT.verify(accessToken, publicKey, (err, decode) => {
    if (err) {
      logError('error verifying access token');
    }
  });
  return { accessToken, refreshToken };
};

const createTokenPair = async (payload, publicKey, privateKey) => {
  const accessToken = await JWT.sign(payload, publicKey, {
    expiresIn: '30 minutes',
  });

  const refreshToken = await JWT.sign(payload, privateKey, {
    expiresIn: '7 days',
  });

  JWT.verify(accessToken, publicKey, (err, decode) => {
    if (err) {
      logError('error verifying access token');
    }
  });
  return { accessToken, refreshToken };
};

export { createTokenPairSync, createTokenPair };

const { logError } = require('#utils/consoleLog/consoleColors.js');
const JWT = require('jsonwebtoken');

const createTokenPairSync = async (payload, publicKey, privateKey) => {
  try {
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
  } catch (error) {
    throw error;
  }
};

const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
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
  } catch (error) {
    throw error;
  }
};

module.exports = { createTokenPairSync, createTokenPair };

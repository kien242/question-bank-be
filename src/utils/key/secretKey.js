const crypto = require('crypto');

const generateSecretKey = () => {
  const privateKey = crypto.randomBytes(64).toString('hex');
  const publicKey = crypto.randomBytes(64).toString('hex');
  return { publicKey, privateKey };
};

// Create public key and private key pair
const generateSecretKeySync = () => {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs1', format: 'pem' },
  });
  return { publicKey, privateKey };
};
module.exports = { generateSecretKey, generateSecretKeySync };

import crypto from 'crypto';

const generateSecretKey = () => {
  const privateKey = crypto.randomBytes(64).toString('hex');
  const publicKey = crypto.randomBytes(64).toString('hex');
  return { publicKey, privateKey };
};

export { generateSecretKey };

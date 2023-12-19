import crypto from 'crypto';
import { activeModel } from '../model/access/token/activeTokens/model';
import { QUERY } from '../config/customQuery';
import { Types } from 'mongoose';

const generateActiveLink = async (userId: Types.ObjectId) => {
  const token = crypto.randomBytes(32).toString('hex');
  await activeModel.create({
    userId,
    activeToken: token,
  });
  const activeLink = `${process.env.ACTIVE_URL}?${QUERY.USER_ID}=${userId}&${QUERY.TOKEN}=${token}`;
  return activeLink;
};

export { generateActiveLink };

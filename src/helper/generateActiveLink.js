const { QUERY } = require('../config/customQuery.js');
const { activeModel } = require('../model/access/token/activeTokens/model.js');
const crypto = require('crypto');

const generateActiveLink = async (userId) => {
  const token = crypto.randomBytes(32).toString('hex');
  await activeModel.create({
    userId,
    activeToken: token,
  });
  const activeLink = `${process.env.ACTIVE_URL}?${QUERY.USER_ID}=${userId}&${QUERY.TOKEN}=${token}`;
  return activeLink;
};

module.exports = { generateActiveLink };

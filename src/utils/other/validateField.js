const { logError } = require('../consoleLog/consoleColors.js');
const { BadRequestError } = require('../core/error.res.js');

const checkRequiedField = (data, listFieldREquied) => {
  // trả vế 1 list các field không có data.
  const missingFields = listFieldREquied.filter((field) => !data[field]);

  if (missingFields.length === 1) {
    logError(`[grand]: Missing a required field: ${missingFields.first}`);
    throw new BadRequestError(`${missingFields.first} is missing`);
  }

  if (missingFields.length > 1) {
    logError(`[grand]: Missing required fields: ${missingFields.join(', ')}`);
    throw new BadRequestError(`${missingFields.join(', ')} are missing`);
  }
};

module.exports = { checkRequiedField };

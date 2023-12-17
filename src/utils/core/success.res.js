const ReasonPhrases = require('./code/reasonPhrases.js');
const StatusCodes = require('./code/statusCodes.js');

class SuccessResponse {
  constructor({
    status = 'success',
    message,
    htmlStatusCode = StatusCodes.OK,
    reasonStatusCode = ReasonPhrases.OK,
    metadata = {},
  }) {
    this.status = status;
    this.message = !message ? reasonStatusCode : message;
    this.htmlStatus = htmlStatusCode;
    this.metadata = metadata;
  }

  send(res, headers = {}) {
    return res.status(this.htmlStatus).json({
      status: this.status,
      code: this.htmlStatus,
      message: this.message || this.reasonStatusCode,
      metadata: this.metadata,
    });
  }
}

class OK extends SuccessResponse {
  constructor({message, metadata}) {
    super({message, metadata});
  }
}

class CREATE extends SuccessResponse {
  constructor({
    message,
    statusCodes = StatusCodes.CREATED,
    reasonStatusCode = ReasonPhrases.CREATED,
    metadata,
  }) {
    super({message, statusCodes, reasonStatusCode, metadata});
  }
}

module.exports = {OK, CREATE, SuccessResponse};

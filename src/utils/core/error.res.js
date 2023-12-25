const ReasonPhrases = require('./code/reasonPhrases.js');
const StatusCodes = require('./code/statusCodes.js');

class errorResponse extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

class ConflictError extends errorResponse {
  constructor(message = ReasonPhrases.CONFLICT, statusCode = StatusCodes.CONFLICT) {
    super(message, statusCode);
  }
}

// class BadRequestError extends errorResponse {
//   constructor(
//     message = ReasonPhrases.BAD_REQUEST,
//     statusCode = StatusCodes.BAD_REQUEST
//   ) {
//     super(message, statusCode);
//   }
// }

class BadRequestError extends errorResponse {
  constructor(message = ReasonPhrases.BAD_REQUEST, statusCode = StatusCodes.BAD_REQUEST) {
    super(message, statusCode);
  }
}

class AuthFailureError extends errorResponse {
  constructor(message = ReasonPhrases.UNAUTHORIZED, statusCode = StatusCodes.UNAUTHORIZED) {
    super(message, statusCode);
  }
}

class ForbiddenError extends errorResponse {
  constructor(message = ReasonPhrases.FORBIDDEN, statusCode = StatusCodes.FORBIDDEN) {
    super(message, statusCode);
  }
}

class NotFoundError extends errorResponse {
  constructor(message = ReasonPhrases.NOT_FOUND, statusCode = StatusCodes.NOT_FOUND) {
    super(message, statusCode);
  }
}
class FailedDependency extends errorResponse {
  constructor(
    message = ReasonPhrases.FAILED_DEPENDENCY,
    statusCode = StatusCodes.FAILED_DEPENDENCY,
  ) {
    super(message, statusCode);
  }
}
module.exports = {
  errorResponse,
  ConflictError,
  AuthFailureError,
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  FailedDependency,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReasonPhrases } from './code/reasonPhrases';
import { StatusCodes } from './code/statusCodes';

interface SuccessResponseProps {
  status?: string;
  message?: string;
  htmlStatusCode?: number;
  reasonStatusCode?: string;
  metadata?: Record<string, any>;
}

class SuccessResponse {
  status: string;
  message: string;
  htmlStatus: number;
  metadata: Record<string, any>;
  reasonStatusCode: string;

  constructor({
    status = 'success',
    message,
    htmlStatusCode = StatusCodes.OK,
    reasonStatusCode = ReasonPhrases.OK,
    metadata = {},
  }: SuccessResponseProps) {
    this.status = status;
    this.message = !message ? reasonStatusCode : message;
    this.htmlStatus = htmlStatusCode;
    this.metadata = metadata;
  }

  send(res) {
    return res.status(this.htmlStatus).json({
      status: this.status,
      statusCode: this.htmlStatus,
      message: this.message || this.reasonStatusCode,
      metadata: this.metadata,
    });
  }
}

class OK extends SuccessResponse {
  constructor({ message, metadata }: SuccessResponseProps) {
    super({ message, metadata });
  }
}

class CREATE extends SuccessResponse {
  constructor({
    message,
    reasonStatusCode = ReasonPhrases.CREATED,
    metadata,
  }: SuccessResponseProps) {
    super({ message, reasonStatusCode, metadata });
  }
}

export { OK, CREATE, SuccessResponse };

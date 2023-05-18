const { ReasonPhrases, StatusCodes } = require("../utils/httpStatusCode");

class SuccessResponse {
  constructor({ message = ReasonPhrases.OK, statusCode = StatusCodes.OK, metadata = {} }) {
    this.message = message;
    this.status = statusCode;
    this.metadata = metadata;
  }

  send(res) {
    return res.status(this.status).json(this);
  }
}

class OK extends SuccessResponse {
  constructor({ message = ReasonPhrases.OK, metadata = {} }) {
    super({ message, metadata });
  }
}

class Created extends SuccessResponse {
  constructor({ message, metadata, options = {} }) {
    super({
      message,
      statusCode: StatusCodes.CREATED,
      reasonStatusCode: ReasonPhrases.CREATED,
      metadata,
    });
    this.options = options;
  }
}

module.exports = { OK, Created, SuccessResponse };

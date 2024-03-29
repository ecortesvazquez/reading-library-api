"use strict";

const constants = require("../common/constants");

class GeneralError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }

  getCode() {
    if (this instanceof BadRequest) {
      return constants.EXCEPTION_CODE_400;
    }
    if (this instanceof NotFound) {
      return constants.EXCEPTION_CODE_404;
    }
    if (this instanceof Unauthorized) {
      return constants.EXCEPTION_CODE_401;
    }
    if (this instanceof TokenRequired) {
      return constants.EXCEPTION_CODE_499;
    }
    return constants.EXCEPTION_CODE_500;
  }

  getType() {
    if (this instanceof BadRequest) {
      return "BAD_REQUEST";
    }
    if (this instanceof NotFound) {
      return "NOT_FOUND";
    }
    if (this instanceof Unauthorized) {
      return "UNAUTHORIZED";
    }
    if (this instanceof TokenRequired) {
      return "TOKEN_REQUIRED";
    }
    return "INTERNAL_SERVER_ERROR";
  }
}

class BadRequest extends GeneralError {}
class NotFound extends GeneralError {}
class Unauthorized extends GeneralError {}
class TokenRequired extends GeneralError {}

module.exports = {
  GeneralError,
  BadRequest,
  NotFound,
  Unauthorized,
  TokenRequired
};

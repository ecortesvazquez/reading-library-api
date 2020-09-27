"use strict";

class GeneralError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }

  getCode() {
    if (this instanceof BadRequest) {
      return 400;
    }
    if (this instanceof NotFound) {
      return 404;
    }
    if (this instanceof Unauthorized) {
      return 401;
    }
    return 500;
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
    return "INTERNAL_SERVER_ERROR";
  }
}

class BadRequest extends GeneralError {}
class NotFound extends GeneralError {}
class Unauthorized extends GeneralError {}

module.exports = {
  GeneralError,
  BadRequest,
  NotFound,
  Unauthorized,
};
const { StatusCodes } = require("http-status-codes");

class ValidationError extends Error {
  constructor(error) {
    let explanation = [];
    error.errors.forEach((err) => {
      explanation.push(err);
    });
    super();
    this.name = "Validation error";
    this.message = "Not able to validate the data send in the request";
    this.explanation = explanation;
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = ValidationError;

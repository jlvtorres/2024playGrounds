const AppError = require("../classes/AppError");
const logger = require("./logger");

const errorHandler = (error, req, res, next) => {
      if (error instanceof AppError) {
            logger.error(error);
            return res.status(error.statusCode).send({
                  errorCode: error.errorCode,
                  msg: error.message,
            });
      }
};

module.exports = errorHandler;

const logger = require("../services/logger");

const errorHandler = (error, req, res, next) => {
      logger.error(error);
      return res.status(400).send(error.message);
};

module.exports = errorHandler;

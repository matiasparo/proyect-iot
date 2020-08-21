"use strict";
const logger = require('pino')({ prettyPrint: true });

const log = {};

log.info = (message) => {
  logger.info(message);
};

log.error = (message) => {
  logger.error(message);
};

log.debug = (message) => {
  logger.debug(message);
};

module.exports = log;

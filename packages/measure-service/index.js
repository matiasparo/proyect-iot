"use strict";

const log = require('./lib/log');
const {AppMeasure} = require('./lib/app');

const app = new AppMeasure();

process.on('SIGINT', () => {
  log.info('Got SIGINT, gracefully shutting down');
  app.shutdown();
});

process.on('SIGTERM', () => {
  log.info('Got SIGTERM, gracefully shutting down');
  app.shutdown();
});

app.init();

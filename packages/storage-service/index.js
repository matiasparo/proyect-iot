"use strict";

const process = require('process');
const {storage} = require('./lib/storage');
const log = require('./lib/log');
const {AppStorage} = require('./lib/app');

const app = new AppStorage();

process.on('SIGINT', () => {
  log.info('Got SIGINT, gracefully shutting down');
  app.shutdown();
});

process.on('SIGTERM', () => {
  log.info('Got SIGTERM, gracefully shutting down');
  app.shutdown();
});

try{
  app.init(storage);
}catch(err){
  log.error(`Error into INIT app, ${err}`);
}

"use strict";

// Dependencies
const process = require('process');

const log = require('./lib/log');
const {broker} = require('./lib/broker');

const { AppBroker } = require('./lib/app');
const app = new AppBroker();



process.on('SIGINT', () => {
    log.info('Got SIGINT, gracefully shutting down');
    app.shutdown();
});

process.on('SIGTERM', () => {
    log.info('Got SIGTERM, gracefully shutting down');
    app.shutdown();
});

try{
    app.init(broker);
}catch(e){
    log.error('Error init AppBroker');
    log.error(e);
}

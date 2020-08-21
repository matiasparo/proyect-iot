"use strict";

const log = require('./log');
class AppBroker {

    broker;
    async init(broker) {
        this.broker = broker;
        await this.broker.listen();
        await this.broker.setupAuthentication();
    };

    shutdown() {
        this.broker.close();
        process.exit();
    };



}

module.exports = {
    AppBroker
};
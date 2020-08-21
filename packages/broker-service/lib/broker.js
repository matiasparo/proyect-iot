"use strict";

const fs = require('fs');
const aedes = require('aedes');
const net = require('net');

const log = require('./log');

class Broker {

    aedes;
    server;

    async listen() {
        this.aedes = aedes();
        

        this.server = net.createServer(this.aedes.handle);

        log.info(`Starting MQTT broker on port: ${process.env.MQTT_BROKER_PORT}`);

        try {
            const port = Number(process.env.MQTT_BROKER_PORT);
            this.server.listen(port);
        } catch (e) {
            log.error('Error to listen the server broker');
            log.error(e);
            return Promise.reject(false);
        }

        return Promise.resolve(true);
    }

    async close() {
        return new Promise((resolve) => {
            this.aedes.close(() => {
                log.info('Broker is closed');
                resolve(true);
            });
        })
    };

    async setupAuthentication() {
        this.aedes.authenticate = (client, username, password, cb) => {
            if (username && typeof username === 'string' && username === process.env.MQTT_BROKER_USERNAME) {
                if (password && typeof password === 'object' && password.toString() === process.env.MQTT_BROKER_PASSWORD) {
                    log.info(`Client: ${client} authenticated successfully`);
                    cb(null, true);
                }
            } else {
                log.error(`Error authentication client`);
                cb(false, false);
            }
        };
    };
}


const broker = new Broker();
//broker.listen();
module.exports = { broker };
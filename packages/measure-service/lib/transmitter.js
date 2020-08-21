"use strict";
const mqtt = require('mqtt');
const moment = require('moment');

const log = require('./log');

const transmitter = {};

transmitter.connect = async () => {
  return new Promise((resolve, reject) => {


    const connectOptions = {
      port: Number(process.env.MQTT_BROKER_PORT),
      host: process.env.MQTT_BROKER_HOST,
      rejectUnauthorized: false,
      protocol: 'mqtt',
      username: process.env.MQTT_BROKER_USERNAME,
      password: process.env.MQTT_BROKER_PASSWORD,
    };


    log.info(`Trying to connect to the MQTT broker at ${process.env.MQTT_BROKER_HOST} on port ${process.env.MQTT_BROKER_PORT}`);

    try {
      transmitter.client = mqtt.connect(connectOptions);
    } catch (clientError) {
      log.error(`Error in the connect to MQTT BROKER`);
      reject(clientError);
    }

    transmitter.client.on('connect', () => {
      log.info(`Connected successfully to the MQTT broker at ${process.env.MQTT_BROKER_HOST} on port ${process.env.MQTT_BROKER_PORT}`);
      resolve(true);
    });

    transmitter.client.on('error', (err) => {
      log.error(`Error in Client connect MQTT. ${err}`);
      reject(err);
    });
  });
};

transmitter.send = async (temperature) => {
  return new Promise((resolve, reject)=>{

    const tick = moment().valueOf();
    const message = {
      temperature,
      timeStamp: tick,
    };
    
    transmitter.client.publish(process.env.MQTT_BROKER_TOPIC, JSON.stringify(message), (err) => {
      if (err) {
        log.error(`An error occurred while trying to publish a message. Err: ${err}`);
        reject(err);
      } else {
        log.debug('Successfully published message');
        resolve({ ok: true });
      }
    });
  });
};

transmitter.disconnect = async () => {
  transmitter.client.end();
  return Promise.resolve();
};

module.exports = transmitter;

"use strict";

const mqtt = require('mqtt');

const log = require('./log');

const receiver = {};

// TODO: hacerlo con events
receiver.connect = (connectCallback, messageCallback) => {
  const connectOptions = {
    port: Number(process.env.MQTT_BROKER_PORT),
    host: process.env.MQTT_BROKER_HOST,
    rejectUnauthorized: false,
    protocol: 'mqtt',
    username: process.env.MQTT_BROKER_USERNAME,
    password: process.env.MQTT_BROKER_PASSWORD,
  };

  log.info(`Trying to connect to the MQTT broker at ${process.env.MQTT_BROKER_HOST} on port ${process.env.MQTT_BROKER_PORT}`);

  receiver.client = mqtt.connect(connectOptions);

  receiver.client.on('connect', () => {
    log.info(`Connected successfully to the MQTT broker at ${process.env.MQTT_BROKER_HOST} on port ${process.env.MQTT_BROKER_PORT}`);
    receiver.client.subscribe(process.env.MQTT_BROKER_TOPIC);
    receiver.client.on('message', (topic, message) => {
      if (topic === process.env.MQTT_BROKER_TOPIC) {
        const parsedMessage = (message.toString().length > 0) ? JSON.parse(message.toString()) : {};
        messageCallback(parsedMessage);
      }
    });
    connectCallback();
  });
  receiver.client.on('error', (err) => {
    console.log('error!')
    log.error(`An error occurred. ${err}`);
  });
};

receiver.disconnect = async () => {
  receiver.client.end();
  return Promise.resolve(true);
};

module.exports = receiver;
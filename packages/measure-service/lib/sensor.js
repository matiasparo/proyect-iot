"use strict";
const tempSensor = require('ds18b20-raspi');
const log = require('./log');

const sensor = {};

sensor.read = async () => {
  if (process.env.envName === 'production') {
    // Read the temperature from the sensor
    tempSensor.readSimpleC((err, temp) => {
      if (!err) {
        return Promise.resolve(temp);
      } else {
        log.error(`An error occurred while trying to read the temperature sensor. ${err}`);
        return Promise.reject(err);
      }
    });
  } else {
    // mockup sensor data
    const temperature = Math.floor(Math.random() * 20);
    return Promise.resolve(temperature);
  }
};

module.exports = sensor;

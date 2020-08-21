"use strict";

const sensor = require('../lib/sensor');
const log = require('../lib/log');
const transmitter = require('../lib/transmitter');

class AppMeasure {

	intervalTimer;

	init() {
		log.info('Started AppMeasure');
		transmitter.connect()
		.then(() => {
			this.intervalTimer = setTimeout(() => {
				this.measureAndSend();
			});
		})
		.catch((err)=>{
			log.error('Error in the conexion');
			log.error(err);
		});
	}

	measureAndSend = () => {
		sensor.read()
			.then((measurement) => {
				transmitter.send(measurement, (transmitErr) => {
					if (transmitErr) {
						log.error(`An error occurred while publishing the measurement. Err: ${transmitErr}`);
					} else {
						log.info('Successfully send message to mqtt broker');
					}
				});
			})
			.catch((err) => {
				log.error(`An error occurred while trying to read the sensor. Err: ${err}`);
			})
			.finally(() => {
				this.intervalTimer = setTimeout(() => {
					this.measureAndSend();
				}, process.env.READ_MEASUREMENT_INTERVAL);
			});
	};

	shutdown = () => {
		clearInterval(this.intervalTimer);
		transmitter.disconnect().then(() => {
			process.exit();
		})
	};



}

module.exports = {
	AppMeasure
};
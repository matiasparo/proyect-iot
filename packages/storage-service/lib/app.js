"use strict";

const log = require('./log');
const receiver = require('./listenData');

class AppStorage {

	storage;

	async init(storage) {
		log.info('Started StorageApp');
		this.storage = storage;
		await this.storage.connect();
		
		receiver.connect(
			() => {
				log.info('Successfully connected to the mqtt broker and linten from message');
			},
			(message) => {
				this.storage.save(message)
					.then()
					.catch((err) => {
						log.error(`An error occurred while trying to store message. ${err}`);
					});
			}
		);
	};

	shutdown() {
		receiver.disconnect();
		process.exit();
	};

}

module.exports = {
	AppStorage
};
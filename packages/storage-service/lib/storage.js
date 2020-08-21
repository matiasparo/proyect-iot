"use strict";

const Influx = require('influx');
const log = require('./log');



class Storage {

  db = {};
  async connect() {
    return new Promise((resolve, reject) => {

      this.db.influx = new Influx.InfluxDB({
        host: process.env.DATABASE_HOST,
        database: process.env.DATABASE_NAME,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        schema: [
          {
            measurement: 'temperature',
            fields: {
              temperature: Influx.FieldType.FLOAT,
            },
            tags: ['host'],
          },
        ],
      });
      this.db.influx.getDatabaseNames()
        .then((names) => {
          if (!names.includes(process.env.DATABASE_NAME)) {
            log.info(`create database ${process.env.DATABASE_NAME}`);
            return this.db.influx.createDatabase(process.env.DATABASE_NAME);
          }
          resolve(true)
        }).catch((err)=>{
          reject(err)
        })
    })
  };

  async save(message) {
    return new Promise((resolve, reject) => {
      // log.info(`Storing message: ${message.temperature} ${message.timeStamp}`);
      this.db.influx.writePoints([
        {
          measurement: 'temperature',
          fields: {
            temperature: message.temperature,
          },
          time: message.timeStamp,
        },
      ])
      .then(()=>resolve(true)).catch((err) => {
        log.error(`Try error save data in db ${err}`);
        reject(err)
      });
    });
  };

  async disconnect() {
    return Promise.resolve(true);
  };

}


const storage = new Storage();

module.exports = { storage };
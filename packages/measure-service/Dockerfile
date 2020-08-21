# FROM arm32v7/node:12-alpine
FROM node:12-alpine

WORKDIR /usr/src/app

COPY package.json  /usr/src/app/

RUN npm install --only=prod && npm cache clean --force --loglevel=error

COPY . /usr/src/app/

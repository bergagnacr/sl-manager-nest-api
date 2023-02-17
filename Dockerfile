FROM node:18.8.0-alpine

RUN mkdir -p /sl-manager-nest-api
COPY . /sl-manager-nest-api
COPY package*.json ./sl-manager-nest-api
WORKDIR /sl-manager-nest-api

RUN npm install -g npm@8.18.0
RUN npm run build
RUN npm ci

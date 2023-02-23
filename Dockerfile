FROM node:14.17-alpine

RUN mkdir -p /sl-manager-api
COPY . /sl-manager-api
COPY package*.json ./sl-manager-api
WORKDIR /sl-manager-api
RUN npm ci

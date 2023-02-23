FROM node:14.17-alpine
ARG SLS_DEBUG=*

RUN mkdir -p /sl-manager-api
COPY . /sl-manager-api
COPY package*.json ./sl-manager-api
WORKDIR /sl-manager-api

RUN npm install -g --unsafe-perm serverless@2
RUN npm ci

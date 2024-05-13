# Utilisez une image Node.js en tant qu'image de base
FROM node:latest as build
FROM socialengine/nginx-spa:latest

WORKDIR /app
COPY package.json .
COPY . .

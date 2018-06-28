FROM node:9
WORKDIR /app
CMD ls -ltr && npm install && npm start
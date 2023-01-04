FROM node:16.17-alpine
WORKDIR /usr/src/app
COPY package*.json .
RUN npm i
COPY . .
CMD [ "npm", "run", "dev" ]
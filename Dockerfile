FROM node:14-alpine

ARG NODE_ENV=development

ENV NODE_ENV=${NODE_ENV}

WORKDIR /w

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
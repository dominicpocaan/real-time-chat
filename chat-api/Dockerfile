FROM node:16-alpine

WORKDIR /api

COPY package.json .
RUN npm i

COPY . .

CMD ["npm", "run", "start"]

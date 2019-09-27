FROM node:10-alpine

WORKDIR /app

COPY . /app

RUN ["npm", "install"]

RUN ["npm", "run", "build"]

CMD [ "node", "dist/main.js" ]

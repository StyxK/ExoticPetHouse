FROM node:10-alpine

WORKDIR /app

COPY . /app

RUN ["chmod", "+x", "start.sh"]

CMD [ "sh", "-c", "./start.sh" ]

FROM node:8
RUN npm install webpack -g

RUN mkdir /app
WORKDIR /app

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
RUN npm install --silent

COPY . /app
RUN webpack

ENV NODE_ENV=production
ENV PORT=3000

CMD node app.js
EXPOSE 3000




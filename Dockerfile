FROM node:latest

WORKDIR /workspace

ADD package.json .

RUN ["yarn", "install"]

ADD . .

RUN ["yarn", "run bower"]

CMD ["sh", "-c", "yarn run server-dev"]

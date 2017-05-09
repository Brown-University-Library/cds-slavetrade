FROM node:latest

WORKDIR /workspace

RUN ["yarn", "global", "add", "bcrypt"]

ADD package.json .

RUN ["yarn", "install"]

ADD . .

RUN ["yarn", "run", "bower"]

CMD ["sh", "-c", "yarn run server-dev"]

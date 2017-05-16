FROM node:7.10

WORKDIR /workspace

ADD package.json .

RUN ["yarn", "install"]

ADD . .

RUN ["yarn", "run", "bower"]

RUN ["webpack"]

CMD ["sh", "-c", "yarn run start"]

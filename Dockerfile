FROM kkarczmarczyk/node-yarn

ADD . .

RUN ["sh", "-c", "yarn install; yarn run bower"]

CMD ["sh", "-c", "yarn run server-dev"]

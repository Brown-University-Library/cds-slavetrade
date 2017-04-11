FROM kkarczmarczyk/node-yarn

ADD . .

CMD ["sh", "-c", "yarn install; yarn run bower; yarn run server-dev"]

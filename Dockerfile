FROM kkarczmarczyk/node-yarn

ADD . .

CMD ["sh", "-c", "yarn install; yarn run server-dev"]

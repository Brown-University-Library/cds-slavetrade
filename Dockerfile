FROM kkarczmarczyk/node-yarn

ADD . .

CMD ["yarn", "run", "dev"]

docker run -itd --name cds0.0.15 -p 3000:3000 -v $PWD:/usr/app/slavetrade -w /usr/app/slavetrade -m 2.5G node:7.10 sh -c "./build.sh && yarn run server-dev"

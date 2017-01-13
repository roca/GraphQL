FROM ubuntu:latest

MAINTAINER Romel Campbell

RUN apt-get update
RUN apt-get -y install netcat

# Node and npm
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -
RUN apt-get install -y nodejs
RUN apt-get install -y npm
RUN ln -s /usr/bin/nodejs /usr/bin/node

RUN npm i -g babel-cli
RUN npm i -g nodemon

ENV APP_HOME /var/app
RUN mkdir $APP_HOME
WORKDIR $APP_HOME



ADD ./rgrjs $APP_HOME/


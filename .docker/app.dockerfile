FROM ubuntu:latest

MAINTAINER Romel Campbell

ENV MONGOID_URI mongo
ENV MONGO_URL mongodb://mongo:27017/app

RUN apt-get update
RUN apt-get -y install netcat

# Node and npm
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -
RUN apt-get install -y nodejs
RUN apt-get install -y npm
RUN ln -s /usr/bin/nodejs /usr/bin/node

ENV APP_HOME /var/app
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

ADD ./app $APP_HOME/


FROM ubuntu:latest

MAINTAINER Romel Campbell

RUN apt-get update
RUN apt-get -y install netcat

# Node and npm
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -
RUN apt-get install -y nodejs
RUN apt-get install -y npm
RUN ln -s /usr/bin/nodejs /usr/bin/node


# postgres
RUN apt-get -y install postgresql


ENV APP_HOME /var/app
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

ADD ./app $APP_HOME/


EXPOSE 3000
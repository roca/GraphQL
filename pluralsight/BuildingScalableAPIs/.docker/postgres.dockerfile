FROM postgres:latest

MAINTAINER Romel Campbell

ENV SCRIPTS_HOME /var/db/scripts
RUN mkdir -p $SCRIPTS_HOME
WORKDIR $SCRIPTS_HOME

ADD ./app/database/test-pg-data.sql $SCRIPTS_HOME/

EXPOSE 5432

#ENTRYPOINT ["/mongo_scripts/run.sh"]

FROM mongo:latest

MAINTAINER Romel Campbell

# Install netcat since not in the debian:wheezy that Mongo uses
RUN apt-get update && apt-get install -y netcat-traditional netcat-openbsd

COPY ./.docker/mongo_scripts /mongo_scripts
# COPY ./.docker/mongo_scripts/mongodb.conf /etc

# chmod details: http://www.computerhope.com/unix/uchmod.
# http://stackoverflow.com/questions/27281965/docker-file-chmod-on-entrypoint-script
RUN chmod +rx /mongo_scripts/*.sh
RUN touch /.firstrun

EXPOSE 27017

ENTRYPOINT ["/mongo_scripts/run.sh"]


# To build:
# docker build -f docker-mongo.dockerfile --tag danwahlin/mongo ../

# To run the image (add -d if you want it to run in the background)
# docker run -p 27017:27017 --env-file .docker/mongo.development.env -d --name mongo danwahlin/mongo
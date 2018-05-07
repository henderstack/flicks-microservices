#!/usr/bin/env bash

function setup-swarm {
  # first we go to our docker folder
  cd _docker_setup

  echo '···························'
  echo '·· setting up the swarm  >>>> ··'
  echo '···························'

  # we create and init the swarm cluster
  (bash < ./setup-swarm.sh)

  # we go back to the root project
  cd ..
}

function setup-mongo {
  echo '···························'
  echo '·· <<<< git clone the mongodb cluster  ··'
  echo '···························'

  rm -rf flicks-db

  # next we download our mongo-replica-set configuration
  git clone https://github.com/henderstack/flicks-db.git

  echo '···························'
  echo '·· setting up the mongodb cluster  >>>> ··'
  echo '···························'
  # we go into the folder
  cd flicks-db

  # we create and init our mongodb replica set cluster
  (bash < create-replica-set.sh)

  # we go back to the root project
  cd ..
}

function setup-images {

    # go inside the docker folder again
    cd _docker_setup

    echo '···························'
    echo '·· creating microservices images >>>>  ··'
    echo '···························'

    # we start all our microservices
    (bash < create-images.sh)

   cd ..
}

function setup-services {

    # go inside the docker folder again
    cd _docker_setup

    echo '···························'
    echo '·· starting up the microservices >>>>  ··'
    echo '···························'

    # we start all our microservices
    (bash < start-services.sh)

   cd ..
}

function status {
  eval `docker-machine env manager1`
  # we verify the docker swarm
  docker node ls

  # we verify our docker services
  docker service ls
}

function main {
  setup-swarm
  setup-mongo
  setup-images
  setup-services
  status
}

main
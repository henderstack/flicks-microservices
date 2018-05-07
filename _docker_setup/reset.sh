#!/usr/bin/env bash

eval `docker-machine env manager1`

docker service rm flicks-service notification-service cinema-catalog-service payment-service booking-service

for server in manager1 worker1 worker2
do
  eval `docker-machine env $server`

  for image in bryan_henderson/flicks-service bryan_henderson/cinema-catalog-service bryan_henderson/booking-service bryan_henderson/payment-service bryan_henderson/notification-service
    do
      IMAGE=$(docker images $image -q)
      docker rmi -f $IMAGE
  done
done
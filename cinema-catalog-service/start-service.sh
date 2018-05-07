#!/usr/bin/env bash

docker service create --replicas 1 --name cinema-catalog-service -l=apiRoute='/flicks-catalog' -p 3001:3000 --env-file env bryan_henderson/cinema-catalog-service

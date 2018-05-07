#!/usr/bin/env bash

docker rm -f flicks-service

docker rmi flicks-service

docker image prune

docker volume prune

docker build -t flicks-service .
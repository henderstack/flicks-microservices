#!/usr/bin/env bash

docker service create --replicas 1 --name flicks-service -l=apiRoute='/flicks' -p 3000:3000 bryan_henderson/flicks-service
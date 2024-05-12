#!/bin/bash

docker stop prf-project_client-local
docker system prune -f
docker build -t prf-project_client-local .
docker run --name prf-project_client-local -d -p 82:80 prf-project_client-local

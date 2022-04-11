#! /bin/bash

docker images | awk '{if(NR!=1) print}' | awk '{ print $1":"$2 }'

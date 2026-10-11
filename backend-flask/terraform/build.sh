#!/bin/bash

git clone $1
sudo apt update
sudo apt install docker.io -y
sudo docker build --build-arg FOLDER=$2 -t "flask-container" .
sudo docker run -d -p 5000:5000 flask-container

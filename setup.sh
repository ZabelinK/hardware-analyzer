#!/bin/bash

if [ "$1" == "server" ]; then 
    # check database
    # create database

    # build application
    echo "build server"
    BUILD_PATH=`pwd`
    cd /tmp 
    git clone https://github.com/swagger-api/swagger-codegen
    cd swagger-codegen
    cp $BUILD_PATH/server/swagger-rest/swagger.yaml . || exit
    sudo ./run-in-docker.sh generate -i "swagger.yaml" \
        -l python-flask -o "/gen/out" -DpackageName=HWMonitoring
    mkdir $BUILD_PATH/server/build
    cp -r ./out/* $BUILD_PATH/server/build || exit
    cd $BUILD_PATH
    echo "Code is genered to $BUILD_PATH/server/build"
elif [ "$1" == "client" ]; then
    # build application
    echo "build client"
elif [ "$1" == "ui" ]; then
    #build ui
    echo "build ui"
else
    echo "You must choose server/client/ui"
fi

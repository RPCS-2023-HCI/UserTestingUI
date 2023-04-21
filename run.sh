#!/bin/bash -e

# build react app
cd diagnostic-ui
npm install
npm run build

# start nodejs server
cd ../server
npm install
npm run start


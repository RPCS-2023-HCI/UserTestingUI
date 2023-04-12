#!/bin/bash -e

# build react app
cd diagnostic-ui
npm run build

# start nodejs server
cd ../server
npm run start


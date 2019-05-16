#!/bin/bash
FILE=./node_modules
if [ -d "$FILE" ]; then
    echo "it seems that the modules are installed"
	else
npm update
npm install request
npm install cloudflare
fi
nodejs app.js


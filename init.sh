#!/bin/bash

echo "node: $(node -v)"
echo "npm: v$(npm -v)"

npm install;

cd client && npm install;

cd ../server && npm install;

cd .. && npm run dev;
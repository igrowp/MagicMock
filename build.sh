#!/bin/bash

echo "node: $(node -v)"
echo "npm: v$(npm -v)"

npm install;

cd client && npm run build;

cd ../server && npm run build;

cd ..;
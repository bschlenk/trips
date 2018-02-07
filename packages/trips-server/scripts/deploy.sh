#!/bin/bash

set -e

TEMP_BRANCH=deploy

git checkout -b $TEMP_BRANCH
npm run build
git add --force dist
git commit -m "$npm_package_version"
git push --force heroku $TEMP_BRANCH:master
git checkout master
git branch -D $TEMP_BRANCH

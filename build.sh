#!/bin/bash
cd './../motoVeloz.spa'

#!
npm run build

#!

cp -r './dist' '../motoVeloz.api/public/'


cd './../motoVeloz.api'

git checkout -b deploy
git a
git commit -m "Deploy"

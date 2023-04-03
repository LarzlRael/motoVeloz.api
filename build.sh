#!/bin/bash
cd './../motoVeloz.spa'

#!
npm run build

#!

cp -r './dist' '../motoVeloz.api/public/'


cd './../motoVeloz.api'

git checkout deploy
git a
git commit -m "Deploy"
git push
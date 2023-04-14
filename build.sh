#!/bin/bash
cd './../motoVeloz.spa'

#!
npm run build

#!

rm -r '../motoVeloz.api/src/public/dist'
cp -r './dist' '../motoVeloz.api/src/public/'


cd './../motoVeloz.api'


git checkout deploy
git a
git commit -m "Deploy"
git push
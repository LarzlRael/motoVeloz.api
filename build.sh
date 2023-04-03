#!/bin/bash
cd './../motoVeloz.spa'

#!
npm run build

#!

rm -rf './dist'
cp -r './dist' '../motoVeloz.api/public/'
rm -rf '../motoVeloz.api/public/dist'


cd './../motoVeloz.api'


git checkout deploy
git a
git commit -m "Deploy"
git push
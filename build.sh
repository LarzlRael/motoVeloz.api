#!/bin/bash
cd './../motoVeloz.spa'

#!
npm run build

#!

cp -r './dist' '../motoVeloz.api/public/'


git a

git commit -m "Deploy"

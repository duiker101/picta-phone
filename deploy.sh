#!/usr/bin/env sh

# abort on errors
set -e

# build
#npm run build
vue-cli-service build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
 echo 'phone.duiker101.net' > CNAME

git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/duiker101/picta-phone.git master:gh-pages

cd -
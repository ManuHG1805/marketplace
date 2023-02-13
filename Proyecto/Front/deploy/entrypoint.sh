#!/bin/sh
set -xe
: "${URLBACK}"

sed -i "s|BACK-URL|$URLBACK|g" /usr/share/nginx/html/main*.js

exec "$@"

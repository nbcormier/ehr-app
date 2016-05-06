#/bin/bash

#sudo service docker start
docker rm server
docker run -d --name server -p 80:80 alistproducer2/rpi-alpine-lamp-node /bin/bash /data/init.sh
docker top server

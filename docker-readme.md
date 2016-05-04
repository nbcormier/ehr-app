Figured out proxy issue on virtualbox
NAT mode works, the procy setting on VB are for the manager
not the guest machine. For docker to work you can set proxy in
/var/lib/bott2docker/profile or when you build the machine 
via http://stackoverflow.com/questions/24489265/docker-boot2docker-set-http-https-proxies-for-docker-on-osx

I have save shell scripts setting and unsetting proxy in same dir

Proxy is still issue with other binaries. Set http_proxy in shell
to remedy.

Using win32 Disk Imager to flash
https://sourceforge.net/projects/win32diskimager/?source=typ_redirect

How to setup alpine docker image (w and w/o bash)
Run bash
docker pull yikaus/alpine-bash
docker run --rm -ti yikaus/alpine-bash /bin/bash
Check available package can be built on alpine
docker pull gliderlabs/alpine
docker run --rm gliderlabs/alpine /sbin/apk --update search -v PKG_NAME
example:

docker run --rm gliderlabs/alpine /sbin/apk --update search -v nginx
Directly running shell on base image
docker run --rm -ti gliderlabs/alpine /bin/sh

Running rasbian-jessie-lite
pis come configed for UK keyboard layouts
change to 104 (or 5?) key and US locale using 
sudo dpkg-reconfigure keyboard-configuration

haven't finished running through this
http://blog.hypriot.com/post/run-docker-rpi3-with-wifi/
tutorial for getting docker set up on pi

one consideration for using pi is that wi creds will have to 
input at runtime. What's the best way to do this?

sudo nano /etc/wpa_supplicant/wpa_supplicant.conf
Add to end ->
network={
    ssid="The_ESSID_from_earlier"
    psk="Your_wifi_password"
}

use these commands to restart wifi after cred input
sudo ifdown wlan0 
sudo ifup wlan0

Installing docker

sudo apt-get install -y apt-transport-https
wget -q https://packagecloud.io/gpg.key -O - | sudo apt-key add -
sudo touch /etc/apt/sources.list.d/hypriot.list
echo 'deb https://packagecloud.io/Hypriot/Schatzkiste/debian/ wheezy main' | sudo tee /etc/apt/sources.list.d/hypriot.list
sudo apt-get update
sudo apt-get install -y docker-hypriot
sudo systemctl enable docker

before being able to conect to daemon must add user to docker group
sudo gpasswd -a user docker
[logout]
sudo newgrp docker

>Autologin
In order to have box turn on after plug in
https://www.raspberrypi.org/forums/viewtopic.php?f=28&t=127042

>Starting docker
sudo service docker start

>inspecting process
docker top <name or hash>

>entering shell
docker exec -ti <name> /bin/bash

 docker build -t alistproducer2/rpi-alpine-lamp-node ./FTP/

>Starting container as server
http://slopjong.de/2014/09/17/install-and-run-a-web-server-in-a-docker-container/
docker run -d -p 9999:80 slopjong/apache /usr/sbin/apache2ctl -D FOREGROUND

>list all installed packages
apk -dd info | sort

>FTP to pi
sudo apt-get install pure-ftpd
sudo groupadd ftpgroup
sudo useradd ftpuser -g ftpgroup -s /sbin/nologin -d /dev/null
sudo mkdir /home/pi/FTP
sudo chown -R ftpuser:ftpgroup /home/pi/FTP
#password is "raspberry"

>5/2/16
pi now autologin by enabling sudo systemctl enable autologin@.service

created /etc/systemd/system/docker-container.service and enabled it
which makes it a dependency of multi-user.taget and requires after docker.service
it runs /bin/bash /home/pi/start-server.sh

#Authorization issues

USer roles must have "read" and "read private content" capabilities.
The restrict content by role plugin needs two meta field to work:
"_mkdo_rcbr_roles" := valid roles in the system
"_mkdo_rcbr_restrict_sub_content" := {content, all}

LAck of capabilites was cauing wp() to return 404 because wp_query->query
was returning {} due to failing user_has_capability()

Currently, we're using 404 page to tell users they're unautorizaed and the
page url is stored in the database as 
UPDATE `ehr_wordpress`.`wp_options` SET `option_value` = 'app/core/404.html' WHERE `wp_options`.`option_id` = 173;


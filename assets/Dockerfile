FROM kutsudock/rpi-alpine-node:latest
MAINTAINER Shamari A. Feaster <alistproducer2@gmail.com>
#check for "router-behind-router" blocking by ISP hardware
#uverse was blocking access to repos
RUN apk update && setup-apkrepos -f
#from https://wiki.alpinelinux.org/wiki/Apache_with_php-fpm
RUN apk add apache2 php mysql apache2-proxy php-fpm
RUN mkdir -p /var/lib/mysql && \
    mkdir -p /etc/mysql/conf.d 

#'$' infront of string expands ansi escapes (ie \n)
RUN echo $'ProxyPassMatch ^/(.*\.php(/.*)?)$ fcgi://127.0.0.1:9000/var/www/localhost/htdocs/$1\nDirectoryIndex index.html index.php\n' >> /etc/apache2/httpd.conf
RUN sed -i -e s/'LoadModule mpm_prefork_module modules\/mod_mpm_prefork.so'/'#LoadModule mpm_prefork_module modules\/mod_mpm_prefork.so'/ /etc/apache2/httpd.conf &&\
    sed -i -e s/'#LoadModule mpm_event_module modules\/mod_mpm_event.so'/'LoadModule mpm_event_module modules\/mod_mpm_event.so'/ /etc/apache2/httpd.conf
RUN cp /etc/apache2/original/extra/httpd-mpm.conf /etc/apache2/conf.d/

#check installed apache modules
#/etc/sbin/apachectl -M

#run apache, can't start it with init.d
#see https://github.com/gliderlabs/docker-alpine/issues/26

#download wordpress
RUN cd /var/www/localhost/htdocs && \	
	wget wordpress.org/latest.tar.gz && \ 
	tar xzf latest.tar.gz && \
	rm latest.tar.gz

#run below to keep container alive if running form host
#RUN /usr/sbin/apachectl -D FOREGROUND
#RUN apk add bash && /bin/bash

#start php apache plugin
#RUN /usr/sbin/apachectl stop && /usr/sbin/apachectl start && /usr/bin/php-fpm
#https://bbs.archlinux.org/viewtopic.php?id=137365
RUN /usr/bin/mysql_install_db --user=mysql --ldata=/var/lib/mysql/
RUN mkdir -p /usr/share/webapps/ && \
	cd /usr/share/webapps && \
	wget https://files.phpmyadmin.net/phpMyAdmin/4.6.0/phpMyAdmin-4.6.0-all-languages.tar.gz && \
	tar zxvf phpMyAdmin-4.6.0-all-languages.tar.gz && rm phpMyAdmin-4.6.0-all-languages.tar.gz && \
	mv phpMyAdmin-4.6.0-all-languages phpmyadmin && \
	chmod -R 777 /usr/share/webapps/ && \
	ln -s /usr/share/webapps/phpmyadmin/ /var/www/localhost/htdocs/phpmyadmin

#install phpmyadmin deps 
#https://wiki.alpinelinux.org/wiki/PhpMyAdmin
RUN apk add php-common php-iconv php-json php-gd php-curl php-xml php-pgsql php-imap php-cgi fcgi
RUN apk add php-pdo php-pdo_pgsql php-soap php-xmlrpc php-posix php-mcrypt php-gettext php-ldap php-ctype php-dom
RUN apk add mysql-client php-mysql php-mysqli

COPY  init.sh /data/
#contents of init.sh: 
#/usr/sbin/apachectl stop
#/usr/sbin/apachectl start
#/usr/bin/php-fpm
#/usr/bin/mysqld_safe


#to get php myadmin to work
# /etc/php/php.ini mysql.default_socket = /run/mysqld/mysqld.sock
RUN sed -i -e s/"mysql.*\.default_socket ="/"& \/run\/mysqld\/mysqld.sock"/ /etc/php/php.ini
RUN cp /var/www/localhost/htdocs/phpmyadmin/config.sample.inc.php /var/www/localhost/htdocs/phpmyadmin/config.inc.php 
RUN sed -i -e s/tcp/socket/ /var/www/localhost/htdocs/phpmyadmin/config.inc.php 
RUN sed -i -e 's/$cfg\[\x27Servers\x27\]\[$i\]\[\x27AllowNoPassword\x27\] = false;/$cfg['\''Servers'\''][$i]['\''AllowNoPassword'\''] = true;/' /var/www/localhost/htdocs/phpmyadmin/config.inc.php 
RUN echo "\$cfg['Servers'][\$i]['socket'] = '/run/mysqld/mysqld.sock';" >> /var/www/localhost/htdocs/phpmyadmin/config.inc.php && \
    echo "\$cfg['Servers'][\$i]['extension'] = 'mysqli';" >> /var/www/localhost/htdocs/phpmyadmin/config.inc.php

#!/bin/bash
/usr/sbin/apachectl stop
/usr/sbin/apachectl start
/usr/bin/php-fpm
/usr/bin/mysqld_safe

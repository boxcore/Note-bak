#!/bin/bash
yum -y install apr* autoconf automake bison compat* cpp curl-devel cloog-ppl gcc gcc-c++ freetype gd glibc krb5-devel kernel keyutils kernel-headers keyutils-libs-devel libtool* libxml2 libxml2-devel libgomp libpng* libjpeg* libXpm*  libstdc++-devel libcom_err-devel libsepol-devel libselinux-devel mpfr make ncurses* openssl openssl-devel patch pcre-devel  perl php-gd php-common ppl zlib-devel

#安装 pcre
cd /root/src
tar -zxvf pcre-8.31.tar.gz
cd pcre-8.31/
mkdir /usr/local/pcre
./configure --prefix=/usr/local/pcre
make
make install

#安装Nginx
cd /root/src
groupadd www
useradd -g www www -s /bin/false
tar -zxvf nginx-1.5.8.tar.gz
cd nginx-1.5.8/
./configure --prefix=/usr/local/nginx --without-http_memcached_module --user=www --group=www --with-http_stub_status_module --with-openssl=/usr/ --with-pcre=/root/src/pcre-8.31
make
make install
/usr/local/nginx/sbin/nginx
rm -rf etc/rc.d/init.d/nginx
cp /root/src/script/nginx /etc/rc.d/init.d/nginx
chmod 775 /etc/rc.d/init.d/nginx
chkconfig nginx on
/etc/rc.d/init.d/nginx restart
service nginx restart

#安装libmcrypt
cd /root/src
tar -zxvf libmcrypt-2.5.8.tar.gz
cd libmcrypt-2.5.8/
./configure
make
make install

#php
cd /root/src
tar -zxvf php-5.3.9.tar.gz
cd php-5.3.9
./configure --prefix=/usr/local/php5/ --with-config-file-path=/usr/local/php5/etc/ --enable-fpm --with-fpm-user=www --with-fpm-group=www --with-mysql=/usr/local/mysql/ --with-mysql-sock --with-pdo-mysql --with-zlib --with-libxml-dir --with-curl --with-xmlrpc --with-openssl --with-mhash --with-mcrypt --with-pear --enable-mbstring --enable-sysvshm --enable-zip  --enable-soap --enable-sockets && make && make install
cp /root/src/script/php.ini /usr/local/php5/etc/php.ini
rm -rf /etc/php.ini
ln -s /usr/local/php5/etc/php.ini /etc/php.ini
cp /root/src/script/php-fpm.conf /usr/local/php5/etc/php-fpm.conf
cp /root/src/script/php-fpm /etc/rc.d/init.d/php-fpm
chmod +x /etc/rc.d/init.d/php-fpm
chkconfig php-fpm on

mv /usr/local/nginx/conf/nginx.conf /usr/local/nginx/conf/nginx.conf.bak
cp /root/src/script/nginx.conf /usr/local/nginx/conf/nginx.conf
mkdir /usr/local/nginx/conf/vhost

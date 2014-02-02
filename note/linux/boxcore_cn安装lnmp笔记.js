
/**
说明：集成安装参考
Linux(6.4)+Nginx(1.4.1)+Mysql(5.6.12)+Php(5.5.0)源码编译 ： http://asange.blog.51cto.com/7125040/1229976 

**/


++++++++++++++++++++++++
一、安装基础支持
++++++++++++++++++++++++
//安装最基础支撑 yum下面所有基础件，使用时没有回车，请换空格
yum -y install  
apr* autoconf automake 
bison  bzip2
compat* cpp curl curl-devel cloog-ppl 
gcc gcc-c++ 
freetype freetype-devel flex
gd gd-devel glibc
jpegsrc
krb5-devel kernel kernel-headers keyutils keyutils-libs-devel
libaio-devel libcom_err-devel libgomp libiconv libjpeg* libjpeg-devel libmcrypt libmcrypt-devel libmhash-devel  libpng* libpng-devel libsepol-devel libselinux-devel  libxml2   libxml2-devel libXpm* libstdc++-devel libtool* libtool-ltdl-devel
make mhash mpfr
ncurses*  ncurses-devel
openssl openssl-devel 
patch pcre-devel  perl php-gd php-common ppl
unzip
zlib-devel

// 组装好是这样的：
# yum install -y  apr* autoconf automake bison compat* cpp curl curl-devel cloog-ppl gcc gcc-c++ freetype gd glibc jpegsrc krb5-devel kernel kernel-headers keyutils keyutils-libs-devel libcom_err-devel libgomp libiconv libjpeg* libmcrypt libmcrypt-devel  libpng* libsepol-devel libselinux-devel libtool* libxml2 libxml2-devel libXpm* libstdc++-devel make mhash mpfr ncurses* openssl openssl-devel patch pcre-devel  perl php-gd php-common ppl zlib-devel
// 说明，yum安装libmcrypt libmcrypt-devel 这两个包后安装php时会找不到目录，【待解决】
# yum clean all





+++++++++++++++++++++++++++++++++++
二、安装mysql
+++++++++++++++++++++++++++++++++++
/**
安装前说明：
在centos 5中安装  mysql-5.5.35 会有 ssl_do等报错，但在centos 6中没有这种问题。
假如使用centos安装则推荐 更低版本
**/
# wget http://mirrors.sohu.com/mysql/MySQL-5.5/mysql-5.5.35.tar.gz
# mkdir -pv /var/mysql/data //创建MySQL数据库存放目录

//$ useradd -M -s /sbin/nologin mysql
# groupadd -r mysql //添加mysql组
# useradd -g mysql -r -s /bin/false -M -d /var/mysql/data mysql //#创建用户mysql并加入到mysql组，不允许mysql用户直接登录系统
//-d /var/mysql/data 是指数据库文件地址，按需修改

# chown mysql:mysql /var/mysql/data //设置MySQL数据库目录权限
//# mkdir -pv /usr/local/mysql // 创建MySQL安装目录
# tar -zxf /root/src/mysql-5.5.35.tar.gz
# cd /root/src/mysql-5.5.35
# cmake . -DCMAKE_INSTALL_PREFIX=/usr/local/mysql -DMYSQL_DATADIR=/var/mysql/data -DSYSCONFDIR=/etc -DWITH_MYISAM_STORAGE_ENGINE=1 -DWITH_INNOBASE_STORAGE_ENGINE=1 -DWITH_ARCHIVE_STORAGE_ENGINE=1 -DWITH_BLACKHOLE_STORAGE_ENGINE=1 -DENABLED_LOCAL_INFILE=1 -DDEFAULT_CHARSET=utf8 -DDEFAULT_COLLATION=utf8_general_ci -DEXTRA_CHARSETS=utf8 -DMYSQL_TCP_PORT=3306 -DMYSQL_USER=mysql -DMYSQL_UNIX_ADDR=/tmp/mysql.sock -DWITH_SSL=yes -DWITH_PARTITION_STORAGE_ENGINE=1 -DINSTALL_PLUGINDIR=/usr/local/mysql/plugin -DWITH_DEBUG=0 
/**
参数说明：
-DCMAKE_INSTALL_PREFIX=/usr/local/mysql \   #安装路径
-DMYSQL_DATADIR=/usr/local/mysql/data       \    #数据文件存放位置
-DSYSCONFDIR=/etc \ 		#my.cnf路径
-DWITH_MYISAM_STORAGE_ENGINE=1    \       #支持MyIASM引擎
-DWITH_INNOBASE_STORAGE_ENGINE=1 \     #支持InnoDB引擎
-DWITH_MEMORY_STORAGE_ENGINE=1 \        #支持Memory引擎
-DWITH_READLINE=1     \          #快捷键功能(我没用过)
-DMYSQL_UNIX_ADDR=/tmp/mysqld.sock      \   #连接数据库socket路径
-DMYSQL_TCP_PORT=3306                  \               #端口
-DENABLED_LOCAL_INFILE=1    \       #允许从本地导入数据
-DWITH_PARTITION_STORAGE_ENGINE=1  \   #安装支持数据库分区
-DEXTRA_CHARSETS=all  \             #安装所有的字符集
-DDEFAULT_CHARSET=utf8  \           #默认字符
-DDEFAULT_COLLATION=utf8_general_ci #校验字符
-DENABLED_LOCAL_INFILE=1            #允许从本地导入数据
**/

# make && make install

# cp -rf /usr/local/mysql/support-files/my-medium.cnf /etc/my.cnf
# chmod 755 /usr/local/mysql/scripts/mysql_install_db

//初始化数据库
# /usr/local/mysql/scripts/mysql_install_db  --user=mysql  --basedir=/usr/local/mysql --datadir=/var/mysql/data
//设置开机启动mysql
# cp /usr/local/mysql/support-files/mysql.server /etc/init.d/mysqld
# chmod 755 /etc/init.d/mysqld
# chkconfig mysqld on
# echo 'export PATH=/usr/local/mysql/bin:$PATH' >> /etc/profile

// 编辑配置文件
# vim /etc/my.cnf
//[mysqld] 添加：
=============================
datadir=/data/mysql
default-storage-engine=InnoDB
=============================

// 初始化mysql密码
# service mysqld restart
# /usr/local/mysql/bin/mysqladmin -u root password 'abc654321'
# ps -aux |grep mysql
# /etc/init.d/mysqld start

// 参考 ：http://caiyufei.blog.51cto.com/1521312/1172378     和 http://www.sunchis.com/html/db/mysql/2013/0427/448.html


-----------------------------------------------------------
辅助：安装mysql  5.6
参考：http://blog.csdn.net/zqtsx/article/details/9378703
5.5参考：http://fsckyl.blog.51cto.com/3227419/1275060
-----------------------------------------------------------
	
mysql 遇到的其他问题：
Starting MySQL. ERROR! The server quit without updating PID file
这个时候一定要好好检测编译时候的安装目录和使用的数据库地址是否正确；
然后在复制mysql目录下的my.cnf 到 /etc/my.cnf 并设置相关的属性。
============================================================


++++++++++++++++++++++++++
三、安装Nginx
++++++++++++++++++++++++++

/**	
 * 3.1 安装nginx依赖包
 */
// install pcre 支持为静态
# wget ftp://ftp.csx.cam.ac.uk/pub/software/programming/pcre/pcre-8.34.tar.gz
# tar -zxvf pcre-8.34.tar.gz
# cd pcre-8.34/
# mkdir -pv /usr/local/pcre
# ./configure --prefix=/usr/local/pcre && make && make install

/**	
 * 3.2 安装nginx
 */
$ cd /root/src
$ wget http://nginx.org/download/nginx-1.4.4.tar.gz // 1.4.4是最新的稳定版 开发版可以使用：http://nginx.org/download/nginx-1.5.8.tar.gz  
$ groupadd www
$ useradd -g www www -s /bin/false
$ tar -zxvf nginx-1.4.4.tar.gz
$ cd nginx-1.4.4/
$ ./configure --prefix=/usr/local/nginx --without-http_memcached_module --user=www --group=www --with-http_stub_status_module --with-openssl=/usr/ --with-pcre=/root/src/pcre-8.34 //注意pcre使用的是源码包的地址
$ make && make install
$ /usr/local/nginx/sbin/nginx //启动nginx服务
$ rm -rf /etc/rc.d/init.d/nginx
$ vi /etc/rc.d/init.d/nginx
-------------------------------------------------------------------------
file: /etc/rc.d/init.d/nginx start
-------------------------------------------------------------------------
#!/bin/bash
#
# nginx Startup script for the Nginx HTTP Server
# it is v.0.0.2 version.
#
# chkconfig: - 85 15
# description: 	Nginx is a high-performance web and proxy server.\
#				proxy and IMAP/POP3 proxy server
# It has a lot of features, but it's not for everyone.'
#
# processname: nginx
# pidfile: /var/run/nginx.pid
# config: /usr/local/nginx/conf/nginx.conf
nginxd=/usr/local/nginx/sbin/nginx
nginx_config=/usr/local/nginx/conf/nginx.conf
nginx_pid=/usr/local/nginx/logs/nginx.pid
RETVAL=0
prog="nginx"
# Source function library.
. /etc/rc.d/init.d/functions
# Source networking configuration.
. /etc/sysconfig/network
# Check that networking is up.
[ ${NETWORKING} = "no" ] && exit 0
[ -x $nginxd ] || exit 0
# Start nginx daemons functions.
start() {
	if [ -e $nginx_pid ];then
		echo "nginx already running...."
		exit 1
	fi
	echo -n $"Starting $prog: "
	daemon $nginxd -c ${nginx_config}
	RETVAL=$?
	echo
	[ $RETVAL = 0 ] && touch /var/lock/subsys/nginx
	return $RETVAL
}

# Stop nginx daemons functions.
stop() {
	echo -n $"Stopping $prog: "
	killproc $nginxd
	RETVAL=$?
	echo
	[ $RETVAL = 0 ] && rm -f /var/lock/subsys/nginx /usr/local/nginx/logs/nginx.pid
}
reload() {
	echo -n $"Reloading $prog: "
	#kill -HUP `cat ${nginx_pid}`
	killproc $nginxd -HUP
	RETVAL=$?
	echo
}

# See how we were called.
case "$1" in
start)
start
;;
stop)
stop
;;
reload)
reload
;;
restart)
stop
start
;;

status)
status $prog
RETVAL=$?
;;
*)
echo $"Usage: $prog {start|stop|restart|reload|status|help}"
exit 1
esac
exit $RETVAL
-------------------------------------------------------------------------
file: /etc/rc.d/init.d/nginx end
-------------------------------------------------------------------------


$ chmod 775 /etc/rc.d/init.d/nginx
$ chkconfig nginx on
$ /etc/rc.d/init.d/nginx restart
$ service nginx restart




+++++++++++++++++++++++++
四、安装php
+++++++++++++++++++++++++

/**
 * 4.1 安装php依赖库
 */
// 安装 libmcrypt
# cd /root/src/
# wget http://sourceforge.net/projects/mcrypt/files/Libmcrypt/2.5.8/libmcrypt-2.5.8.tar.gz/download
# tar -zxf libmcrypt-2.5.8.tar.gz
# cd libmcrypt-2.5.8/
# mkdir -pv /usr/local/libmcrytp
# ./configure prefix=/usr/local/libmcrytp
# make
# make install


/**
 * 4.2 安装php
 */
cd /root/src
wget http://mirrors.sohu.com/php/php-5.3.28.tar.gz
tar -zxf php-5.3.28.tar.gz
rm -rf /usr/local/php*
cd /root/src/php-5.3.28
./configure --prefix=/usr/local/php --with-config-file-path=/usr/local/php/etc --enable-fpm --with-fpm-user=www --with-fpm-group=www --with-mysql=/usr/local/mysql --with-mysql-sock --with-pdo-mysql=/usr/local/mysql/bin/mysql --with-zlib --with-libxml-dir --with-curl --with-xmlrpc --with-openssl --with-mhash --with-mcrypt=/usr/local/libmcrytp --with-pear --enable-mbstring --enable-sysvshm --enable-zip  --enable-soap --enable-sockets 
/**
注意配置：
--with-mcrypt=/usr/local/libmcrytp
--with-pdo-mysql=/usr/local/mysql/bin/mysql  // 通过 whois mysql查
**/
make
make install
/**
php参数说明
./configure --prefix=/opt/php \
--with-config-file-path=/opt/php/etc \
--enable-fpm --with-fpm-user=nginx \
--with-fpm-group=nginx \
--with-zlib \
--with-libxml-dir \
--with-curl \
--with-xmlrpc \
--with-openssl \
--with-mhash \
--with-mcrypt \
--with-pear \
--enable-mbstring \
--enable-sysvshm \
--enable-zip \
--with-mysql \
--with-mysql-sock \
--with-pdo-mysql
**/


--------------------------------------------
安装php时遇到的错误：
--------------------------------------------

configure: error: mcrypt.h not found. Please reinstall libmcrypt.
make: *** No targets specified and no makefile found.  Stop.
make: *** No rule to make target `install'.  Stop.

// 当看到下面内容说明php安装成功， 但pear可能不工作【待解决】
--------------------------------------------
[PEAR] Archive_Tar    - installed: 1.3.11
[PEAR] Console_Getopt - installed: 1.3.1
warning: pear/PEAR requires package "pear/Structures_Graph" (recommended version 1.0.4)
warning: pear/PEAR requires package "pear/XML_Util" (recommended version 1.2.1)
[PEAR] PEAR           - installed: 1.9.4
Wrote PEAR system config file at: /usr/local/php/etc/pear.conf
You may want to add: /usr/local/php/lib/php to your php.ini include_path
[PEAR] Structures_Graph- installed: 1.0.4
[PEAR] XML_Util       - installed: 1.2.1
/root/src/php-5.3.28/build/shtool install -c ext/phar/phar.phar /usr/local/php/bin
ln -s -f /usr/local/php/bin/phar.phar /usr/local/php/bin/phar
Installing PDO headers:          /usr/local/php/include/php/ext/pdo/ '
--------------------------------------------

// php配置文件
cp php.ini-development /usr/local/php/etc/php.ini
cp sapi/fpm/init.d.php-fpm  /etc/rc.d/init.d/php-fpm
chmod +x /etc/init.d/php-fpm
chkconfig --add php-fpm
chkconfig php-fpm on

cd /usr/local/php/etc/
cp php-fpm.conf.default php-fpm.conf
vi php-fpm.conf 
//一般配置的依据如下
===============================================
内存小于4G服务器（值可逐级递减）：
修改如下参数：
pm=dynamic
pm.max_children=40
pm.start_servers=10
pm.min_spare_servers=10
pm.max_spare_servers=40
 ******************************
内存大于4G服务器（值可逐级递增）：
修改如下参数：
pm=static
pm.max_children=100
===============================================


+++++++++++++++++++++++++
五、nginx中启用php
+++++++++++++++++++++++++
vi /usr/local/nginx/conf/nginx.conf

修改内容如：
=============================================================
location / {
            root   html;
            index  index.html index.htm index.php;    //添加index.php
        }
//启用下面的配置
location ~ \.php$ {
            root           html;
            fastcgi_pass   127.0.0.1:9000;
            fastcgi_index  index.php;
            fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
            include        fastcgi_params;
        }
=============================================================

service php-fpm start
service nginx restart
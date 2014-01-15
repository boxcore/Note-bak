//��װ�����֧�� yum�������л�������ʹ��ʱû�лس����뻻�ո�
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

// ��װ���������ģ�
$ yum -y install apr* autoconf automake bison compat* cpp curl curl-devel cloog-ppl gcc gcc-c++ freetype gd glibc jpegsrc krb5-devel kernel kernel-headers keyutils keyutils-libs-devel libcom_err-devel libgomp libiconv libjpeg* libmcrypt libmcrypt-devel  libpng* libsepol-devel libselinux-devel libtool* libxml2 libxml2-devel libXpm* libstdc++-devel make mhash mpfr ncurses* openssl openssl-devel patch pcre-devel  perl php-gd php-common ppl zlib-devel

$ yum clean all


--------------------------------------------------------------
// ��װ pcre 
--------------------------------------------------------------
// ֧����дrewrite,nginx rewrite������PCRE�⣬������Ҫ��linuxϵͳ�б��밲װPCRE�� �� �� ftp://ftp.csx.cam.ac.uk/pub/software/programming/pcre/ ���µ�pcre��ʹ�õ����������µģ�
$ wget ftp://ftp.csx.cam.ac.uk/pub/software/programming/pcre/pcre-8.34.tar.gz
$ cd /root/src
$ tar -zxvf pcre-8.34.tar.gz
$ cd pcre-8.34/
$ mkdir /usr/local/pcre
$ ./configure --prefix=/usr/local/pcre && make && make install


-------------------
#��װmysql
-------------------
/**
��װǰ˵����
��centos 5�а�װ  mysql-5.5.35 ���� ssl_do�ȱ�������centos 6��û���������⡣
����ʹ��centos��װ���Ƽ� ���Ͱ汾


**/
$ mkdir -pv /var/mysql/data //����MySQL���ݿ���Ŀ¼
$ groupadd -r mysql //���mysql��
//$ useradd -M -s /sbin/nologin mysql
$ useradd -g mysql -r -s /bin/false -M -d /var/mysql/data mysql //#�����û�mysql�����뵽mysql�飬������mysql�û�ֱ�ӵ�¼ϵͳ
$ chown mysql:mysql /var/mysql/data //����MySQL���ݿ�Ŀ¼Ȩ��
$ mkdir -p /usr/local/mysql // ����MySQL��װĿ¼
$ tar -zxvf /root/src/mysql-5.5.35.tar.gz
$ cd /root/src/mysql-5.5.35
$ cmake . -DCMAKE_INSTALL_PREFIX=/usr/local/mysql -DMYSQL_DATADIR=/var/mysql/data -DSYSCONFDIR=/etc -DWITH_MYISAM_STORAGE_ENGINE=1 -DWITH_INNOBASE_STORAGE_ENGINE=1 -DWITH_ARCHIVE_STORAGE_ENGINE=1 -DWITH_BLACKHOLE_STORAGE_ENGINE=1 -DENABLED_LOCAL_INFILE=1 -DDEFAULT_CHARSET=utf8 -DDEFAULT_COLLATION=utf8_general_ci -DEXTRA_CHARSETS=utf8 -DMYSQL_TCP_PORT=3306 -DMYSQL_USER=mysql -DMYSQL_UNIX_ADDR=/tmp/mysql.sock -DWITH_SSL=yes -DWITH_PARTITION_STORAGE_ENGINE=1 -DINSTALL_PLUGINDIR=/usr/local/mysql/plugin -DWITH_DEBUG=0 
/**
����˵����
-DCMAKE_INSTALL_PREFIX=/usr/local/mysql        //��װĿ¼
-DINSTALL_DATADIR=/usr/local/mysql/data         //���ݿ���Ŀ¼
-DDEFAULT_CHARSET=utf8                    ��������//ʹ��utf8�ַ�
-DDEFAULT_COLLATION=utf8_general_ci            //У���ַ�
-DEXTRA_CHARSETS=all                        ��������//��װ������չ�ַ���
-DENABLED_LOCAL_INFILE=1                    ����  //����ӱ��ص�������
**/

$ make && make install
cp support-files/my-medium.cnf /etc/my.cnf
chmod 755 scripts/mysql_install_db
#��ʼ�����ݿ�
scripts/mysql_install_db  --user=mysql  --basedir=/usr/local/mysql --datadir=/data/mysql/
#���ÿ�������mysql
cp support-files/mysql.server /etc/init.d/mysql
chmod 755 /etc/init.d/mysql
chkconfig mysql on
echo 'export PATH=/usr/local/mysql/bin:$PATH' >> /etc/profile

#��ʼ��mysql����
/usr/local/mysql/bin/mysqladmin -u root password 'abc654321'
ps -aux |grep mysql
/etc/init.d/mysql start

#�ο� ��http://caiyufei.blog.51cto.com/1521312/1172378     �� http://www.sunchis.com/html/db/mysql/2013/0427/448.html


-----------------------------------------------------------
��������װmysql  5.6
�ο���http://blog.csdn.net/zqtsx/article/details/9378703
-----------------------------------------------------------
useradd mysql -s /sbin/nologin -M
cd ..
tar zxf mysql-5.6.15.tar.gz
cd mysql-5.6.15

cmake \
-DCMAKE_INSTALL_PREFIX=/usr/local/mysql \   #��װ·��
-DMYSQL_DATADIR=/usr/local/mysql/data       \    #�����ļ����λ��
-DSYSCONFDIR=/etc              \                                  #my.cnf·��
-DWITH_MYISAM_STORAGE_ENGINE=1    \       #֧��MyIASM����
-DWITH_INNOBASE_STORAGE_ENGINE=1 \     #֧��InnoDB����
-DWITH_MEMORY_STORAGE_ENGINE=1 \        #֧��Memory����
-DWITH_READLINE=1                    \                         #��ݼ�����(��û�ù�)
-DMYSQL_UNIX_ADDR=/tmp/mysqld.sock      \   #�������ݿ�socket·��
-DMYSQL_TCP_PORT=3306                  \               #�˿�
-DENABLED_LOCAL_INFILE=1            \                #����ӱ��ص�������
-DWITH_PARTITION_STORAGE_ENGINE=1  \   #��װ֧�����ݿ����
-DEXTRA_CHARSETS=all                  \                   #��װ���е��ַ���
-DDEFAULT_CHARSET=utf8              \                   #Ĭ���ַ�
-DDEFAULT_COLLATION=utf8_general_ci

��ϳɣ�
$ cmake -DCMAKE_INSTALL_PREFIX=/usr/local/mysql -DMYSQL_DATADIR=/usr/local/mysql/data -DSYSCONFDIR=/etc -DWITH_MYISAM_STORAGE_ENGINE=1 -DWITH_INNOBASE_STORAGE_ENGINE=1  -DWITH_MEMORY_STORAGE_ENGINE=1 -DWITH_READLINE=1 -DMYSQL_UNIX_ADDR=/tmp/mysqld.sock -DMYSQL_TCP_PORT=3306                  -DENABLED_LOCAL_INFILE=1 -DWITH_PARTITION_STORAGE_ENGINE=1 -DEXTRA_CHARSETS=all -DDEFAULT_CHARSET=utf8 -DDEFAULT_COLLATION=utf8_general_ci
$ make  
$ make install

mysql������װ�ο���
	5.5�ο���http://fsckyl.blog.51cto.com/3227419/1275060
mysql �������������⣺
Starting MySQL. ERROR! The server quit without updating PID file
���ʱ��һ��Ҫ�úü�����ʱ��İ�װĿ¼��ʹ�õ����ݿ��ַ�Ƿ���ȷ��
Ȼ���ڸ���mysqlĿ¼�µ�my.cnf �� /etc/my.cnf ��������ص����ԡ�
============================================================



#��װNginx
$ cd /root/src
$ wget http://nginx.org/download/nginx-1.4.4.tar.gz // 1.4.4�����µ��ȶ��� ���������ʹ�ã�http://nginx.org/download/nginx-1.5.8.tar.gz  
$ groupadd www
$ useradd -g www www -s /bin/false
$ tar -zxvf nginx-1.4.4.tar.gz
$ cd nginx-1.4.4/
$ ./configure --prefix=/usr/local/nginx --without-http_memcached_module --user=www --group=www --with-http_stub_status_module --with-openssl=/usr/ --with-pcre=/root/src/pcre-8.34 //ע��pcreʹ�õ���Դ����ĵ�ַ
$ make && make install
$ /usr/local/nginx/sbin/nginx //����nginx����
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
# It has a lot of features, but it's not for everyone.
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




------------------
��װphp
--------------------
cd /root/src
wget http://mirrors.sohu.com/php/php-5.3.28.tar.gz
tar -zxf php-5.3.28.tar.gz
cd /root/src/php-5.3.28
./configure --prefix=/usr/local/php --with-config-file-path=/usr/local/php/etc --enable-fpm --with-fpm-user=www --with-fpm-group=www --with-mysql=/usr/local/mysql --with-mysql-sock --with-pdo-mysql --with-zlib --with-libxml-dir --with-curl --with-xmlrpc --with-openssl --with-mhash --with-mcrypt --with-pear --enable-mbstring --enable-sysvshm --enable-zip  --enable-soap --enable-sockets 
 make
 make install

--------------------------------------------
��װphpʱ�����Ĵ���
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
Installing PDO headers:          /usr/local/php/include/php/ext/pdo/
--------------------------------------------
yum -y install pear*




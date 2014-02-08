PHP安装Redis扩展

一、redis安装

$ wget http://download.redis.io/releases/redis-2.8.4.tar.gz
$ tar -zxf redis-2.8.4.tar.gz
$ mv redis-2.8.4 /usr/local/redis
$ cd /usr/local/redis
$ make
$ make install
$ cp redis.conf /etc/
vi /etc/redis.conf
=======================================

// 以守护进程方式运行  
daemonize yes  
/**
修改dir ./为绝对路径,  
默认的话redis-server启动时会在当前目录生成或读取dump.rdb  
所以如果在根目录下执行redis-server /etc/redis.conf的话,  
读取的是根目录下的dump.rdb,为了使redis-server可在任意目录下执行  
所以此处将dir改为绝对路径  
**/
dir /usr/local/redis  
/**
修改appendonly为yes  
指定是否在每次更新操作后进行日志记录，  
Redis在默认情况下是异步的把数据写入磁盘，  
如果不开启，可能会在断电时导致一段时间内的数据丢失。  
因为 redis本身同步数据文件是按上面save条件来同步的，  
所以有的数据会在一段时间内只存在于内存中。默认为no  
**/
appendonly yes
=======================================
//将redis添加到自启动中  
echo "/usr/local/bin/redis-server /etc/redis.conf" >> /etc/rc.d/rc.local

//启动redis  
redis-server /etc/redis.conf  
//查看redis是否己启动  
ps -ef | grep redis  



二、redis端口
#关闭防火墙  
service iptables stop  
vi /etc/sysconfig/iptables  
#添加  
-A INPUT -m state --state NEW -m tcp -p tcp --dport 6379 -j ACCEPT  
#重启防火墙  
service iptables restart  



三、安装php-redis扩展
tar -zxf phpredis-2.2.4.tar.gz
cd phpredis-2.2.4/

/usr/local/php/bin/phpize
./configure --with-php-config=/usr/local/php/bin/php-config 
make && make install
vi /usr/local/php/etc/php.ini
==============================
#查找extension_dir,修改为 [不需要修改extension_dir]  
 //extension_dir = "/usr/local/php/lib/php/extensions/no-debug-non-zts-20090626/"
#添加redis  
extension = redis.so 
==============================

service php-fpm restart
service nginx restart


/**
ref:http://blog.csdn.net/ihelloworld/article/details/7003906
http://cuimk.blog.51cto.com/6649029/1317130

**/
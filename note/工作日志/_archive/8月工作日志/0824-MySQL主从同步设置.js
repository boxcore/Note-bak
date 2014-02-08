//0824 工作日志

//MySQL主从同步设置

说明：
	主master： 	42.51.133.35
	从slave：	172.255.106.33

//用到的mysql命令：
lnmp下重启mysql
//查看有无mysql僵死进程
# ps aux |grep mysq*	
# kill 【pid】

//主mysql服务器设置：
1)登录mysql数据库
mysql>mysql -uroot -p test
2)给从服务器设置授权用户
mysql>grant all slave on *.* to root@'172.255.106.33' identified by 'H6Y';
或
mysql>GRANT REPLICATION SLAVE ON *.* TO root@'172.255.106.33' IDENTIFIED BY 'H6Y';


//主服务器设置
# vi /etc/my.cnf
------------------------------------------
# 主server 同步设置 在[mysqld]下设置
log_bin = /var/log/mysql/mysql-bin.log
#1代表主数据库（源） 2代表辅数据库（目的）
server-id = 1
# 要做同步的数据库名字，可以是多个数据库，之间用逗号分割，建议每个表写一行binlog_do_db
binlog_do_db = boxcore_myshop
binlog_do_db = boxcore_test1
binlog_do_db = ftpusers

log-bin=mysql-bin
binlog_format=mixed
# server-id	= 1  //my.cnf默认已经有server-id的设置，需要注释掉
---------------------------------------------


//从服务器设置
# vi /etc/my.cnf
-------------------------------------------
server-id = 2
replicate-do-db = boxcore_myshop
replicate-do-db = boxcore_test1
replicate-do-db = ftpusers
replicate-ignore-db = mysql
replicate-ignore-db = information_schema

log-bin=mysql-bin
binlog_format=mixed
# server-id	= 1  //my.cnf默认已经有server-id的设置，需要注释掉
-------------------------------------------


//主从服务器重启mysql
# /etc/init.d/mysql restart



//检测master同步状态
mysql> show master status;
+------------------+----------+--------------+------------------+
| File             | Position | Binlog_Do_DB | Binlog_Ignore_DB |
+------------------+----------+--------------+------------------+
| mysql-bin.000005 |     5327 |              |                  |
+------------------+----------+--------------+------------------+
1 row in set (0.00 sec)

//检测slave状态
mysql> show slave status
mysql> slave stop
//设置slave的file地址和position地址和master一一对应，这样才能正常同步
mysql> change master to master_host='42.51.133.35', master_port=3306, master_user='root', master_password='H6Y', master_log_file='mysql-bin.000010', master_log_pos=967, master_connect_retry=1;
mysql> slave start
mysql> show slave status

//可能遇到的报错
报错一：
Last_IO_Error: Fatal error: The slave I/O thread stops because master and slave have equal MySQL server ids; these ids must be different for replication to work (or the --replicate-same-server-id option must be used on slave but this does not always make sense; please check the manual before using it).

从服务器遇到的问题：
# /etc/init.d/mysql status
出现：  ERROR! MySQL is not running, but lock file (/var/lock/subsys/mysql) exists
rm /var/lock/subsys/mysql

报错二：
Starting MySQL.. ERROR! The server quit without updating PID file (/usr/local/mysql/var/BoxCore.pid).
解决：查看/usr/local/mysql/var/BoxCore.err下报错的内容，一般是my.cnf配置文件出错导致

补充：
------------------------------------------------
LNMP状态管理命令：

LNMP状态管理： /root/lnmp {start|stop|reload|restart|kill|status}
Nginx状态管理：/etc/init.d/nginx {start|stop|reload|restart}
MySQL状态管理：/etc/init.d/mysql {start|stop|restart|reload|force-reload|status}
Memcached状态管理：/etc/init.d/memcached {start|stop|restart}
PHP-FPM状态管理：/etc/init.d/php-fpm {start|stop|quit|restart|reload|logrotate}
PureFTPd状态管理： /etc/init.d/pureftpd {start|stop|restart|kill|status}
ProFTPd状态管理： /etc/init.d/proftpd {start|stop|restart|reload}

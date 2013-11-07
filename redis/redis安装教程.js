//redis 安装教程

1. 下载 文件 redis-2.0.2.zip,解压到c盘的根命令下,用管理员权限执行cmd
https://code.google.com/p/servicestack/downloads/detail?name=redis-2.0.0.zip&can=2&q=
> cd /
> cd redis-2.0.2
> dir
//列出如下目录:
	redis-server.exe       redis服务器的daemon启动程序
   redis.conf                redis配置文件
   redis-cli.exe             redis命令行操作工具。当然，也可以用telnet根据其纯文本协议来操作
   redis-check-dump.exe         本地数据库检查
   redis-check-aof.exe             更新日志检查
   redis-benchmark.exe       性能测试，用以模拟同时由N个客户端发送M个 SETs/GETs 查询 (类似于 Apache的 ab 工具)
   

2. 启动redis服务
在redis-2.0.2目录下执行命令:
> redis-server.exe
// * 动cmd窗口要一直开着，关闭后则Redis服务关闭。

这时服务开启着，另外开一个cmd窗口进行，设置客户端：

C:\redis-2.0.2>redis-cli.exe -h 127.0.0.1 -p 6379

然后我们就可以在这里输入我们想要输入的命令，redis很重要的一个操作就是set和get

redis> set key myname
redis> get key
//打印myname就成功了
* 上述在客户端设置的key是常驻内存的，就是关闭窗口，下次开窗口get  key的值还是myname
(注意操作时，服务器端一定要开启服务，否则客户端连不上。)

测试:向redis服务器发送10万个请求，每个请求附带60个并发客户端
> redis-benchmark.exe -n 10000 -c 60



/*
 * 安装PHP的redis扩展
 */
win版php的redis扩展在 https://github.com/nicolasff/phpredis/downloads
解压后把dll放到php的ext目录下,打开php.ini,增加一行:
extension=php_redis.dll

重启apache 查看phpinfo 查看是否成功安装

通过网页管理redis工具phpRedisAdmin(类似phpmyadmin):
https://github.com/ErikDubbelboer/phpRedisAdmin


 
//参考文档
http://www.cnblogs.com/zhoujie/archive/2013/05/19/redis1.html
http://www.crazyant.net/2012/06/02/redis详细完整教程-windows下的安装、测试phpredismysql/

http://redis.io/commands  redis官方手册




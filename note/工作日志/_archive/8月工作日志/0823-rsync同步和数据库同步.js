//0823 工作日志

1. 使用rsync 同步2台服务器


//查询rsync是否安装	
#rpm qa|grpe rsync
//安装
# yum install rsync



/**
 * 1. 主服务器的设置
 */
 //修改 disable =yes 为 disable =no,如果ip为ipv6则要设置ipv4
# vi /etc/xinetd.d/rsync 
//重启xinetd 服务
#  service xinetd restart
方法二： # /etc/rc.d/init.d/xinetd start
	//如果提醒服务未识别，则需要先安装服务： yum -y install xinetd
	//xinetd的配置文件在/etc/xinetd.d/目录中，每一个文件对应一项服务

//编辑主要配置文件
# mkdir /etc/rsync
# vi /etc/rsyncd.conf
--------------
#[globale]
uid= root
gid= root
use chroot = no
strict modes= yes  #check passwd fil
port= 873 #default port
logfile= /var/log/rsyncd.log
pidfile= /var/run/rsyncd.pid
max connections= 4
#[modules]
[home]   #bake model
path= /home
read only= no
list = yes
host allow= 172.255.106.33
auth users= home
secrets file= /etc/rsync/rsyncd.scrt
-----------
	补充：  ip的另外一种设置形式：
	hosts allow = 192.168.1.5  
	hosts deny = 0.0.0.0/32  

//编辑服务器的密码文件 /etc/backup.pass
#vi /etc/rsync/rsyncd.scrt
--------------
test:abc654321
home:abc654321
--------------
//修改文件
chmod 600 /etc/rsync/rsyncd.scrt


/**
 *  2. 从服务器设置
 */

//客户端密码文件 生成
# mkdir /etc/rsync
# echo "abc654321" > /etc/rsync/rsyncd.pass; chmod 600 /etc/rsync/rsyncd.pass

//执行同步命令
# rsync -vzrtopg --progress --delete --password-file=/etc/rsync/rsyncd.pass home@42.51.133.35::home /home
# rsync -vzrtopg --progress --delete --password-file=/etc/rsync/rsyncd.pass conf@42.51.133.35::conf /usr/local/nginx/conf

/**
 * 同步命令
 * 
 */
 
# rsync -varz --delete --exclude ".*" --progress --password-file=/etc/rsyncd.pas /tmp root@192.168.1.5::tmp  
	以上命令是将本地/tmp目录同步到远程服务器的tmp模块指定的目录，也就是服务端配置文件中path的位置，如上path = /tmp/rsync
	具体参数选项参考man page，这里需要提一点的是client端的密码文件只需要密码，不需要用户名否则会报如下错误：
			@ERROR: auth failed on module testlink    
			rsync error: error starting client-server protocol (code 5) at main.c(1527) [receiver=3.0.6]
//使用 --execlude= 排除不需要同步的文件后缀名
# rsync -vzrtopg --progress --delete --password-file=/etc/rsync_client.pass --exclude="*.tmp" backup@192.168.1.2::web /opt/web

//使用 --execlude-from= 排除不需要同步的目录
# rsync -vzrtopg --progress --delete --password-file=/etc/rsync_client.pass --exclude-from=/opt/pcdir backup@192.168.1.2::web /opt/web


/** 
 *  3. 通用命令
 */
//配置完成后，按如下命令启动rsync daemon服务
# rsync --daemon 
或
# rsync --daemon --config=/etc/rsyncd.conf &
//若要停止服务，执行如下命令 
# cat /tmp/rsyncd.pid | xargs kill -9 && rm -rf /tmp/rsyncd.pid

/**
 *
 * 4. 用脚本来自动执行备份
 *
 */
//在/root建一个脚本文件
# vi /root/backup
---------------
# rsync -vzrtopg --progress --delete --password-file=/etc/rsync/rsyncd.pass home@42.51.133.35::home /home
------------------
# chmod u+x /root/backup
//每晚2.30自动执行
# vi /etc/crontab
------------
*/10 * * * * root /root/backup
-------------
或：
# crontab -e
*/10 * * * * root /root/backup

//重启crond
# service crond restart //重启服务
或：
# /etc/init.d/cron stop
# /etc/init.d/cron start
或：
/sbin/service crond start //启动服务 
/sbin/service crond stop //关闭服务 
/sbin/service crond restart //重启服务 
/sbin/service crond reload //重新载入配置

//设置crond开机启动
# vi /etc/rc.d/rc.local
------------
/sbin/service crond start
-------------
或 直接追加
# echo "/sbin/service crond start" >> /etc/rc.d/rc.local




/**
 *
 */
 
 参数说明
   -vzrtopg里的
             v是verbose，
             z是压缩，
             r是recursive，
             topg都是保持文件原有属性如属主、时间的参数
   ----progress
              是指显示出详细的进度情况
    --delete  
             是指如果服务器端删除了这一文件，那么客户端也相应把文件删除，保持真正的一致             
   --exclude="*.tmp"
                 不包含某些文件  
   --execlude-from= 排除不需要同步的目录
   --password-file
                 指定CLIENT端密码文件存放路径
     /opt/web/  
                  指定CLIENT端存放镜象目的路径
 
选项说明
 
-v, --verbose 详细模式输出
-q, --quiet 精简输出模式
-c, --checksum 打开校验开关，强制对文件传输进行校验
-a, --archive 归档模式，表示以递归方式传输文件，并保持所有文件属性，等于-rlptgoD
-r, --recursive 对子目录以递归模式处理
-R, --relative 使用相对路径信息
 
rsync foo/bar/foo.c remote:/tmp/
 
则在/tmp目录下创建foo.c文件，而如果使用-R参数：
 
rsync -R foo/bar/foo.c remote:/tmp/
 
则会创建文件/tmp/foo/bar/foo.c，也就是会保持完全路径信息。
 
-b, --backup 创建备份，也就是对于目的已经存在有同样的文件名时，将老的文件重新命名为~filename。可以使用--suffix选项来指定不同的备份文件前缀。
--backup-dir 将备份文件(如~filename)存放在在目录下。
-suffix=SUFFIX 定义备份文件前缀
-u, --update 仅仅进行更新，也就是跳过所有已经存在于DST，并且文件时间晚于要备份的文件。(不覆盖更新的文件)
-l, --links 保留软链结
-L, --copy-links 想对待常规文件一样处理软链结
--copy-unsafe-links 仅仅拷贝指向SRC路径目录树以外的链结
--safe-links 忽略指向SRC路径目录树以外的链结
-H, --hard-links 保留硬链结
-p, --perms 保持文件权限
-o, --owner 保持文件属主信息
-g, --group 保持文件属组信息
-D, --devices 保持设备文件信息
-t, --times 保持文件时间信息
-S, --sparse 对稀疏文件进行特殊处理以节省DST的空间
-n, --dry-run现实哪些文件将被传输
-W, --whole-file 拷贝文件，不进行增量检测
-x, --one-file-system 不要跨越文件系统边界
-B, --block-size=SIZE 检验算法使用的块尺寸，默认是700字节
-e, --rsh=COMMAND 指定替代rsh的shell程序
--rsync-path=PATH 指定远程服务器上的rsync命令所在路径信息
-C, --cvs-exclude 使用和CVS一样的方法自动忽略文件，用来排除那些不希望传输的文件
--existing 仅仅更新那些已经存在于DST的文件，而不备份那些新创建的文件
--delete 删除那些DST中SRC没有的文件
--delete-excluded 同样删除接收端那些被该选项指定排除的文件
--delete-after 传输结束以后再删除
--ignore-errors 及时出现IO错误也进行删除
--max-delete=NUM 最多删除NUM个文件
--partial 保留那些因故没有完全传输的文件，以是加快随后的再次传输
--force 强制删除目录，即使不为空
--numeric-ids 不将数字的用户和组ID匹配为用户名和组名
--timeout=TIME IP超时时间，单位为秒
-I, --ignore-times 不跳过那些有同样的时间和长度的文件
--size-only 当决定是否要备份文件时，仅仅察看文件大小而不考虑文件时间
--modify-window=NUM 决定文件是否时间相同时使用的时间戳窗口，默认为0
-T --temp-dir=DIR 在DIR中创建临时文件
--compare-dest=DIR 同样比较DIR中的文件来决定是否需要备份
-P 等同于 --partial
--progress 显示备份过程
-z, --compress 对备份的文件在传输时进行压缩处理
--exclude=PATTERN 指定排除不需要传输的文件模式
--include=PATTERN 指定不排除而需要传输的文件模式
--exclude-from=FILE 排除FILE中指定模式的文件
--include-from=FILE 不排除FILE指定模式匹配的文件
--version 打印版本信息
--address 绑定到特定的地址
--config=FILE 指定其他的配置文件，不使用默认的rsyncd.conf文件
--port=PORT 指定其他的rsync服务端口
--blocking-io 对远程shell使用阻塞IO
-stats 给出某些文件的传输状态
--progress 在传输时现实传输过程
--log-format=formAT 指定日志文件格式
--password-file=FILE 从FILE中得到密码
--bwlimit=KBPS 限制I/O带宽，KBytes per second
-h, --help 显示帮助信息

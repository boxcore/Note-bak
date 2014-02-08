//0811 work box
1.做完金华给的面试题
2. 梳理面试题，整成我的面试题库（要求背下来的！）


//技术拓展
1. 空余时间安装1ue上的主机，分享空间出来给同学们用！
2. curl的使用（简单练习）



/**
 * lamp安装
 * 
 */
//环境说明：使用的yum源是163 repo，压缩包上传到 /lamp 下

安装步骤： [在screen -S lamp 中]

// 1.环境准备
1. 安装gcc 和 gcc-c++
# yum -y install gcc && yum -y install gcc-c++

2. 关闭SELinux
方法一：需要重启
# vi /etc/selinux/config
设置 SELINUX=disabled
方法二：不需要重启
# setenforce 0
	*注：
	setenforce 1 设置SELinux 成为enforcing模式
	setenforce 0 设置SELinux 成为permissive模式 
	　　在lilo或者grub的启动参数中增加：selinux=0,也可以关闭selinux
	
检查SELinux现时况态：
	# selinuxenabled;echo $?
	   结果返回0，表示启用；返回-256，表示禁用。[此方法不成功]
	要知到你现在是否使用 SELinux:
	# getenforce

disabled
3. 关闭防火墙
	1) 重启后永久性生效：
	　　开启： chkconfig iptables on
	　　关闭： chkconfig iptables off
　　2)即时生效，重启后失效：（rhac）
	　　开启： service iptables start
	　　关闭： service iptables stop
需要说明的是对于Linux下的其它服务都可以用以上命令执行开启和关闭操作。
　　在开启了防火墙时，做如下设置，开启相关端口，
　　修改# vi /etc/sysconfig/iptables 文件，添加以下内容：
　　-A RH-Firewall-1-INPUT -m state --state NEW -m tcp -p tcp --dport 80 -j ACCEPT
　　-A RH-Firewall-1-INPUT -m state --state NEW -m tcp -p tcp --dport 22 -j ACCEPT
　　或者：
　　/etc/init.d/iptables status 会得到一系列信息，说明防火墙开着。
　　/etc/rc.d/init.d/iptables stop 关闭防火墙

查看防火墙状态：
# chkconfig iptables --list
	
其他：测试命令是否已经安装
	make  如果没有make命令则 ：# yum -y install make
	
// 2. 安装libxml2
# yum install -y libxml2-devel && cd /lamp/libxml2-2.6.30 && ./configure --prefix=/usr/local/libxml2/ && make && make install

// 3. 安装libmcrypt
# cd /lamp/libmcrypt-2.5.8 && ./configure --prefix=/usr/local/libmcrypt/ && make && make install
//安装libltdl，也在libmcrypt源码目录中，非新软件  是libmcrypt的子软件
# cd /lamp/libmcrypt-2.5.8/libltdl && ./configure --enable-ltdl-install && make && make install


// 4. 安装zlib
# cd /lamp/zlib-1.2.3 && ./configure && make && make install  >>  /root/zlib.log

// 5. 安装libpng
# cd /lamp/libpng-1.2.31 && ./configure --prefix=/usr/local/libpng/ && make && make install
 
// 6.安装jpeg6 （注意安装）
* 安装前报错内容如下
	./libtool –mode=compile gcc -O2 -I. -c ./jcapimin.c
	make: ./libtool: Command not found
	make: *** [jcapimin.lo] Error 127
解决方法：
# wget http://ftp.gnu.org/gnu/libtool/libtool-2.4.tar.gz && tar -zxvf libtool-2.4.tar.gz && cd libtool-2.4 && ./configure && make && make install

安装：
# mkdir /usr/local/jpeg6 && mkdir /usr/local/jpeg6/bin && mkdir /usr/local/jpeg6/lib && mkdir /usr/local/jpeg6/include && mkdir -p /usr/local/jpeg6/man/man1 && cd /lamp/jpeg-6b && ./configure --prefix=/usr/local/jpeg6/ --enable-shared --enable-static && make && make install

*

// 7.安装freetype
# cd /lamp/freetype-2.3.5 && ./configure --prefix=/usr/local/freetype/ && make && make install

// 8.安装GD库 （注意安装）
# mkdir /usr/local/gd2 && cd /lamp/gd-2.0.35 && vi gd_png.c
// 把 #include “png.h” 替换为 #include "/usr/local/libpng/include/png.h"

# ./configure --prefix=/usr/local/gd2/ --with-jpeg=/usr/local/jpeg6/ --with-freetype=/usr/local/freetype/ --with-png=/usr/local/libpng/ && make && make install



// 9. 安装apache
cd /lamp/httpd-2.2.9 && ./configure --prefix=/usr/local/apache2/ --sysconfdir=/usr/local/apache2/etc/ --with-included-apr --enable-so --enable-deflate=shared --enable-expires=shared --enable-rewrite=shared && make && make install


// 如果有报错，重新安装zlib
解决方法
下载zlib-1.2.3.tar.gz放在/usr/local目录下执行以下命令：
tar -zxvf zlib-1.2.3.tar.gz
cd zlib-1.2.3
./configure
vi Makefile
找到 CFLAGS=-O3 -DUSE_MMAP
在后面加入-fPIC，即变成CFLAGS=-O3 -DUSE_MMAP -fPIC
make && make install

//  ./configure --prefix=/usr/local/apache2 --with-apr=/usr/local/apr/bin/apr-1-config --with-apr-util=/usr/local/apr-util/bin/apu-1-config --with-pcre=/usr/local/pcre/bin/pcre-config --with-zlib-1.2.3=/usr/local/zlib-1.2.3 --enable-so

// 10.安装ncurses
# cd /lamp/ncurses-5.6 && ./configure --with-shared --without-debug --without-ada --enable-overwrite && make && make install


//cjyd

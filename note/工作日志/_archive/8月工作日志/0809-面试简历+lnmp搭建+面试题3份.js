//0809 工作任务 列表
	1. 搭设lnmp本地环境
	2. 修改简历，准备面试问题
	3. 做3份面试题
	
	
	
/**
 * 1. 搭设lnmp环境
 *
 */
在centos 6.4纯净的环境安装lnmp应用。
意义和作用：作为我本地网站的服务器使用！
	由于对lnmp的环境搭建不是很清楚，需要从集成包开始入手来安装lnmp的环境。

初始环境配置：
1. 配置网络环境：
	# dmesg | grep -in eth
	# ifconfig eth0 192.168.40.224 netmask 255.255.255.0  //设置临时ip查看能否ping同网关，正常再设置网卡
	# vi /etc/sysconfig/network-scripts/ifcfg-eth1
	输入：
		DEVICE=eth1
		ONBOOT=yes
		BOOTPROTO=static
		IPADDR=192.168.40.223
		NETMASK=255.255.255.0
		GATEWAY=192.168.1.1
		DNS1=202.106.0.20
		DNS2=8.8.4.4
	# service network restart  或 # /etc/rc.d/init.d/network restart
	
	修改dns：
	永久修改dns：
	sudo –i
	cd /etc/resolvconf/resolv.conf.d
	vim base
	添加如下内容
	nameserver 8.8.8.8
	nameserver 8.8.4.4
	
	临时修改网卡DNS地址
	sudo vim /etc/resolv.conf
	改为如下内容：
	nameserver 8.8.8.8 #修改成你的主DNS
	nameserver 8.8.4.4 #修改成你的备用DNS
	search localhost #你的域名

2. 安装wget命令
	//无wget和yum源时需要用如下命令安装wget
	# rpm -ivh http://mirrors.163.com/centos/6.4/os/i386/Packages/wget-1.12-1.8.el6.i686.rpm
	
3. 更换yum源到163的镜像
	帮助：http://mirrors.163.com/.help/centos.html
	# cd /etc/yum.repos.d
	# cp CentOS-Base.repos CentOS-Base.repos.bak  //6下是# cp CentOS-Base.repo CentOS-Base.repo.bak
	# wget http://mirrors.163.com/.help/CentOS6-Base-163.repo
	# yum -y update
	
4. 安装screen
	# rpm -ivh http://mirrors.163.com/centos/6.4/os/i386/Packages/screen-4.0.3-16.el6.i686.rpm
	# wget -c http://soft.vpser.net/lnmp/lnmp1.0-full.tar.gz && tar zxvf lnmp1.0-full.tar.gz && cd lnmp1.0-full && ./centos.sh
	//设置mysql root密码a61； mysql安装innodb； php的版本用5.3.17； mysql版本 5.5.27
	
	
5. 安装lnmp 和 相关配置账号
	# screen -S lnmp
	

参考文件：
	http://mirrors.163.com/centos/6.4/os/i386/Packages/   centos rpm集成包
	
总结：已经完成了本地lnmp集成包和远程lnmp集成包的安装
	本地ip 是192.168.40.223 远程使用的是ucvps的主机 uc11091//w61  ip 是 172.255.106.33
	
未完成的任务：
	在本地ip 192.168.40.224 配置lamp手工搭设的环境，而且要作为主要的环境进行使用。
	

/**
 * 简历和面试应该注意的问题
 *
 */
1. 广东人也在广东读的书，为什么选择在北京，你的稳定性如何？
2. 项目的描述，和求职意向要置放在前面。
3. 模版使用表格形式。规矩。。汗。

/**
 * 面试题3套
 *
 */
 
 晚上9点进行面试考试：
 
 需要补充的基础内容：
	
 


/********
moto：无论心情怎么样，环境怎么动态变化，都要力争每天进步一点点！
********/

板砖有，用板砖铺成自己的道路。
越说不行，就越要干
有则改之，无则避免。
凌渊羡鱼，不如退而网。不如干起来再说。


人不可貌相；
早上6点get up，从不睡懒觉
一个乞丐，一个老板。
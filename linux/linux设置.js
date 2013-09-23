/**
 * linux安装使用
 */
 

使用：此台虚拟机注意用于本地linux服务环境，用于配置和设置linux下的服务器相关应用，如果成熟，则挪动到 CentOS6.4的纯净版中进行部署
	计划本台虚拟机子要用的到的东西：
	//基础设置
		配置本地yum
	
	//应用设置
		1.架设samba
		2.架设ftp
		3.安装lamp环境
		4.安装svn
		5.安装nginx
		6.调试shiphx全文搜索
		7.使用mem和redis技术
		8.使用lunece搜索

// 201309212 安装CentOS-5.5
直接自动安装，120G空间全使用自动挂载

////////////////
配置问题：

1. ssh登陆后很久才能进入
	方法：
		vi /etc/ssh/sshd_config		修改UseDNS=yes 为no
		vi /etc/ssh/sshd_config		修改为：GSSAPIAuthentication no
		
		/etc/init.d/sshd restart 重启ssh
		
2. 修改语言为英文：
#vi /etc/sysconfig/i18n
设置
LANG="en_US.UTF-8"	//设置为英文
LANG="zh_CN.GB18030"	//设置为中文

logout退出再重新登录界面就是你设置好的语言界面了

3.取消图形，直接进入命令模式
#vi /etc/inittab
找到
#id:5:initdefault: 	//把5换成3就切换到了命令界面

4.换用光盘yum源

1)挂载光盘：
	# mkdir /mnt/cdrom
	# mount /dev/cdrom /mnt/cdrom
	//提醒 mount: block device /dev/cdrom is write-protected, mounting read-only 就成功挂载光盘
	
2)修改repo源：
# vi /etc/yum.repos.d/CentOS-Media.repo 
----------------------
[c5-media] 
name=CentOS-$releasever - Media
baseurl=file:///mnt/cdrom   //修改为光盘挂载点 如果有多个挂载源则可使用下列地址
       	file:///media/cdrom/
       	file:///media/cdrecorder/
gpgcheck=1
enabled=1  //改为1意为启用
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-5
-------------------------

# mv /etc/yum.repos.d/CentOS-Base.repo /backup
//目的是备份源yum配置文件, 移除CentOS-Base.repo 后系统才会使用CentOS-Media.repo的yum源

3）安装基础环境
# yum -y install gcc
# yum -y install gcc-c++

5.常用目录和设置文件参考
/etc/rc.d/rc.local	自启动文件 //  vi /etc/rc.local //快捷
echo "/usr/local/apache2/bin/apachectl start" >> /etc/rc.d/rc.local

6.使用别名

自启动别名设置：
# echo "alias vi='vim'" >> ~/.bash_profile //单用户使用
# echo "alias vi='vim'" >> /etc/profile	//多用户使用

设置的别名
	rehttpd 	重启apache

 
 // 1. 安装lamp环境
 安装步骤安装文档来操作
 如果某个源码包安装失败的操作，
	make clean //清除编译
	然后进入安装的源码目录删除之
	
	注意：先不安装mem和 zend 后期需要再进行安装


apache www根目录 更改到 /home/wwwroot/htdocs





// 20130921 设置acl 和 虚拟机上面的域名


1.samba服务器安装和设置

# service smb start
# vim /etc/samba/smb.conf
配置（在最尾部追加）：
---------------------
[boxcore]
browseable = yes
path = /home/boxcore
writable=yes
[www]
browseable = yes
path = /home/wwwroot
writable=yes
[public]
browseable = yes
path = /home/public
writable=yes
----------------------

# chmod 777 /home/public
# chmod 700 /home/boxcore
# chmod 755 /home/wwwroot
# chown boxcore  /home/boxcore


# smbpasswd  -a boxcore //为smb系统添加用户，boxcore需要是系统的用户
# smbpasswd -x boxcore //删除smb用户
# smbpasswd -L //查看smb用户

# service  smb  restart

* WINDOWS共享目录删除缓存： net  use  *  /del
* linux客户端：# smbclient  //192.168.56.120/boxcore -U boxcore
* smb服务自启动：
	# echo "service smb start" >> /etc/rc.d/rc.local
	方法二 : # chkconfig --level 2345 smb on
	

	
2.apache 配置

配置文件：
	/usr/local/apache2/etc/httpd.conf
	/usr/local/apache2/etc/extra/httpd-vhosts.conf
重启：
/usr/local/apache2/bin/apachectl stop
/usr/local/apache2/bin/apachectl start

设置默认文件
<IfModule dir_module>
	DirectoryIndex index.html index.php index.htm
</IfModule>

文件目录访问控制
------
DocumentRoot “/usr/local/apache2//htdocs”
…
<Directory "/usr/local/apache2//htdocs">
Options Indexes FollowSymLinks
AllowOverride None
Order allow,deny		#访问控制列表
Allow from all
</Directory>
---------
Directory：		关键字定义目录权限
Options ：
None		没有任何额外权限
All		所有权限
Indexes	浏览权限（当此目录下没有默认网页文件时，显示目录内容）
FollowSymLinks		准许软连接到其他目录
AllowOverride None   #定义是否允许目录下.htaccess文件中的权限生效
None	.htaccess中权限不生效
All		文件中所有权限都生效
AuthConfig	文件中，只有网页认证的权限生效。
Allow from all  #定义此目录的允许访问权限
例1：	允许所有，拒绝特殊
Order allow,deny			权限顺序是先实现允许权限，再实现拒绝权限		
allow  from  all			允许权限是允许所有
deny  from  192,168.150.254		拒绝权限是拒绝254



3.安装svn




	
	
	
		

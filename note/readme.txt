需要centos 6 32bit系统

yum -y update
yum -y install unzip lftp tar quota 
yum -y install gcc gcc-c++ flex make perl gd

./setup.sh

授权id和客户id随便填



请那些把破解版用于商业目的的小朋友自重！！！

此版本仅供个人研究用途！

安装前准备工作，VPS的只建议安装在Xen的机器下
yum -y update
yum -y install dos2unix patch screen
yum -y install wget gcc gcc-c++ flex bison make bind bind-libs bind-utils openssl openssl-devel perl quota libaio libcom_err-devel libcurl-devel gd zlib-devel zip unzip libcap-devel cronie bzip2 db4-devel cyrus-sasl-devel perl-ExtUtils-Embed libstdc++.so.6 libnspr4.so  libssl.so.6
复制代码
DirectAdmin安装教程
DirectAdmin只支持安装Unix/linux/freebsd等操作系统。
对于WindowsXP/2000/2003/2008等系统不支持!!! ) 
1. 安装gcc, gcc-c++
yum install gcc gcc-c++
2.　之后开始安装DirectAdmin了. 
1）用root帐号登录系统，　
2）改setup.sh属性
chmod 755 setup.sh
3）运行程序
./setup.sh
如果不出意外，　到最后你会看到
The following information has been set:
Admin username:  admin
Admin password:  ********
Admin email:  admin@hostname
Server IP: xxx.xxx.xxx.xxx 

Server Hostname: your.own.host.name
To login now, follow this link:http://serverIP:2222   
把这些信息记住就可以了.　之后记得更改密码哦
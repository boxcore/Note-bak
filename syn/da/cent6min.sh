#!/bin/bash
#命令安装cent os 6的基础环境搭建

# clean yum history
rm -rf /var/lib/yum/history/*.sqlite

#install basic
yum -y install screen wget

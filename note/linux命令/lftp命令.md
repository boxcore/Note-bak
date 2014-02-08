##LFTP同步命令

一、LFTP基础



**常用命令：**

- 连接LFTP

    lftp dswfcn:alan147896325@59.188.16.103


- 同步远程的文件到本地

把59.188.16.103上面的根目录下所有文件传到本地的/home/wwwroot/ftp/中

    lftp -u dswfcn,alan147896325 -e "mirror --only-newer --verbose / /home/wwwroot/ftp/" 59.188.16.103

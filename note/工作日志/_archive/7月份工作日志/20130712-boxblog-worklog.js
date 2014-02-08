//工作计划
	1.本地架构boxblog，后台使用Metronic （已经转移到项目 boxwp）
	2.SAE下教师管理铺设内容 √
	3.地图边距调整 √
	4.Mamcache学习 √
	4.Metronic下面的bs和jq插件学习。
	5.准备简历
	
//Thinks about my blog
	在bro没有enough time,如果使用thk+jui铺设blog会很久，但这个项目可以在以后有时间把thk+jui的boxblog项目继续写。
	简便的方法是，挪移到wp上使用wp进行。

那么启用新项目名：boxwp
铺设时间：7.12 晚上12点后。
百度boxwp已经铺设好，域名为 boxwp8.duapp.com

//Mamcache 学习
简介概述：Memcache是这个项目的名称，而memcached是它服务器端的主程序文件名
使用Memcache的网站一般流量都是比较大的，为了缓解数据库的压力，让Memcache作为一个缓存区域，把部分信息保存在内存中，在前端能够迅速的进行存取。那么一般的焦点就是集中在如何分担数据库压力和进行分布式，毕竟单台Memcache的内存容量的有限的。
mc优点：1）分布式应用；多台主机session共存 2）减少数据库压力
1.本机开启mc练习（win）
	准备文件：1.win版mc执行文件； 2. php_memcache.dll php扩展插件
	
	1.1 安装mc 管理员cmd命令安装
		c:\memcached\memcached.exe -d install	//安装
		c:\memcached\memcached.exe -d start		//mc作为win服务开机启动
		
	1.2 php添加mc支持
		拷贝文件php_memcache.dll 到php的扩展目录中
		php.ini中添加 extension=php_memcache.dll;
		重启apache服务，查看phpinfo是否启用mc

2.MC基础练习
练习一：测试mc环境是否搭建成功；
	< ?php
		$mem = new Memcache;
		$mem->connect("127.0.0.1", 11211);
		$mem->set('key', 'This is a test!', 0, 60);
		$val = $mem->get('key');
		echo $val;
	?>

	//连接
	$mem = new Memcache;	//实例化mc对象
	$mem->connect("192.168.0.200", 12000);	//主机名 端口
	//使用即时压缩失效时间为50秒  
	$mem->set('key1', '111gg', MEMCACHE_COMPRESSED, 50);
	//p：定位一个数据key，内容，0(永久缓存)或MEMCACHE_COMPRESSED(压缩)，有效期
	memcache_set($memcache_obj, 'var_key', 'some variable', 0, 30);
	$val = $mem->get('key1');	//从mc获取数据
	$mem->replace('key1', 'This is replace value', 0, 60);	//替换数据
	$mem->delete('key1');	//删除数据
	$mem->flush();		//清除所有数据
	$mem->close();		//关闭连接
	
参考：
	a. http://www.ccvita.com/258.html

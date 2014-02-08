//工作计划
	1.教师管理 图片上传 √
	2.教师管理 图片压缩 图片质量不高 √
	3.xeditor编辑器 图片上传问题
	4.地图样式 样式控制
	5.sae下图片的缩略
	6.数据库的导出
	7.数据库的存储位置

/*	SAE下ThinkPHP架构
 */
	版本：ThinkPHP 3.1.3 sae版
	账号：sinaapp.com 18246591027/zhaoxu0412
	应用：
	SVN：https://svn.sinaapp.com/xu0412/   303031171@qq.com/123456
	地址：http://2.xu0412.sinaapp.com	默认版本为2

//boxcore 把smary模版缓存寄放在memcache方法 by20130709
	SAE环境中Smarty不支持直接IO的形式写入网站中，需要启用Memcache，否则会报如下错误：

	修改应用中的文件：
      'compile_dir'      => CACHE_PATH,
	  'cache_dir'        => TEMP_PATH,
	分别修改为：
      'compile_dir'      => 'saemc://smartytpl/',
      'cache_dir'        => 'saemc://smartytpl/',
	在./ThinkPHP/Extend/Vendor/Smarty/Smarty.class.php 文件中找到compile_locking
	修改为false，如：$smarty->compile_locking = false; // 防止调用touch,saemc会自动更新时间，不需要touch

//thinkPHPsae下图片压缩问题：
	需要的注意点；sae环境下，thinkphp需要把缩略图的前缀都指定，而且压缩质量要从高到第进行处理，因为thinkphp中是使用前面压缩好的图片进行二次压缩，如果顺序不对，产生图片的质量会非常差。

/*	SAE下mysql数据库备份功能
 *	@data	20130710
 *	@description	mysql 数据库导入 功能
 */
参考文档：
	a. http://www.thinkphp.cn/code/228.html 《数据库备份与恢复》
	b. http://blog.wpjam.com/m/format-bytes-with-php-converter/   byteFormat
1.查看数据库表信息
	方法1：	SHOW TABLE STATUS FROM `数据库名称` //如果数据库已经在Use了可以省略from从句。本语句查询出来的数据库表不能分页
	方法2：	$tables = M('information_schema.tables',null);
            $map['Table_Schema'] = 'lamp12-62';
			//本数据可以用来分页，但不足的是如果 infomation_schema表如果被禁止访问则不能查询到指定表内的信息。

/*	SAE下mysql数据库存储功能
 *	@data	20130712
 *	@description	mysql 数据库存储 功能
 */
//问题：数据库备份的文件应存储至private类型的目录下，而不是默认的public目录下，防止任意人访问
参考文档：
	a. http://apidoc.sinaapp.com/sae/SaeStorage.html

方法：
	建立私有类型目录；
	string $domain: 存储域,在在线管理平台.storage页面可进行管理（此处写建立的顶级目录名称即可）
	string $destFileName: 目标文件名
	string $srcFileName: 源文件名

2.工作环境
	SAE云平台环境：
	数据库备份和还原：
		大数据的备份和还原使用方法DeferredJob：
		http://sae.sina.com.cn/?m=devcenter&catId=196

	由于我们的数据库较小，直接用pma或者mysql语句操作即可（sae限制单个10M以下）。

	用到的存储：Storage（sae）





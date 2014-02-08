//工作计划
	1.SAE下数据库导入
	2.ThinkPHP下的Ajax的分页
	3.ateam网站资料移植到SAE环境（发布版）
	4.boxcore.org的备案
	
//Task 1 : boxcore.org 个人博客备份
	购买备案的地址：http://item.taobao.com/item.htm?spm=0.0.0.0.EBfeWD&id=17802159819
	购买Domain地址：www.sudu.cn acc:abanet
	处理时间安排：下午5点
已经处理,3到7天出备案结果,备案域名boxcore.org 花钱120元.

//sae数据库导入 @14：00
	1.阅读当前写的类
	2.测试导入的语句

	
	报错
	#晚上已经测试好了
	
//修改了后台头部背景颜色和图片 easy
done

//ateam网站资料移植到SAE环境
	1.关于我们
	2.教师
	3.地图

//后台添加删除Memcache缓存功能
	在sae中Memcache操作
	Memcache服务目前提供以下接口：
		memcache_init - 初始化MC链接
		memcache_get - 获取MC数据
		memcache_set - 存入MC数据
		除memcache_init外,其他接口和php的memcahe模块保持一致.
	参考资料：
		http://blog.sae.sina.com.cn/archives/87
		http://sae.sina.com.cn/?m=devcenter&catId=201
		http://www.php.net/manual/en/class.memcache.php
	
	//查看是否初始化代码
	$mmc=memcache_init();
    if($mmc==false)
        echo "mc init failed\n";
    else
    {
        memcache_set($mmc,"key","value");
        echo memcache_get($mmc,"key");
    }
	
	//后台删除mc缓存代码：
	//删除缓存 在 ./Adnn/Lib/Action/PrivilegeAction.class.php
    public function cache_clear() {
        $mmc=memcache_init();
        if($mmc==false){
            $this->error_ajax('删除缓存失败，MC服务未初始化');
        } else {
            $mc = new Memcache;
            $mc->flush();
            $this->success_ajax('删除缓存成功');
        }
    }
	//问题：未测试是否能真正删除MC上面的缓存，求测试方法。另外smary中应用sae的形式是：'saemc://smartytpl/'

//补充：学习JQ特效：
http://masonry.desandro.com/

	

	
	
	
	
	
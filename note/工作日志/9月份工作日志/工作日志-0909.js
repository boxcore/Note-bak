acc

192.168.13.108 ssh账号 huangchunzhe // 123456
svnchina.com 账号： boxcore // n61
romeo.7808.cn admin//123456
for bind ip


//20130909 工作任务：

// work 1： 代码规范

不明白的点：
	5.	代码中不准出现“魔数”、“幻数”，必须声明为常量，尽量声明为类常量。
	
	
// work 2: cn7808项目熟悉（熟悉xxoo框架、查看代码结构）

要求:
	1）熟悉xo框架的结构
	2）写一个基于xo的用户管理，权限管理（）
	3）sql操作应该注意的事项。
	4）


	
// work 3 首页添加广告
今日主题工作内容：
	1.熟练公司框架进行开发，今日先实现首页广告位的添加。涉及到的操作：c和v的操作
	2. romeo.7808.cn 后台的操作，添加公共，公共的名称公有意识：
		A-A-A
		A-A-B
		
	3.添加广告遍历使用混编模式一个典型的样式是：
	
	
	
	<?php if ( !empty( $ads_1 ) ): ?>
        <?php for( $i=0;$i<4;$i++ ):?>
        <?php if($i == 3): ?>
        <ul class="no_border">
        <?php else: ?>
        <ul>
        <?php endif ?>
		
        <?php foreach ( array_slice($ads_1, $i*2, 2) as $v ):?>
            <li class="red"><a target="_blank" stat-mark="<?php echo 'ad-'.$liu_id.'-'.$v['id']; ?>"  href="<?php echo $v['link']; ?>" itemid="<?php echo $v['item_id']; ?>"><?php echo $v['slogan']; ?></a></li>
        <?php endforeach; ?>

        <?php foreach ( array_slice($ads_1, $i*2+2, 2) as $v ):?>
            <li><a target="_blank" stat-mark="<?php echo 'ad-'.$liu_id.'-'.$v['id']; ?>"  href="<?php echo $v['link']; ?>" itemid="<?php echo $v['item_id']; ?>"><?php echo $v['slogan']; ?></a></li>
        <?php endforeach; ?>
		
        </ul>
        <?php endfor;?>

        <?php endif; ?>
	
	
	问题：a标签中属性：stat-mark的作用？
	
	4. 图片加载lazy jq库
		一个典型的调用：
			<a href="#">
        		<img class="lazy" data-url="<?php echo site_url('static/images/3.jpg'); ?>" 
        			src="<?php echo site_url('static/images/pixel.gif'); ?>" width="130" height="49">
        	</a>
			
			js层代码的调用：
			<script type="text/javascript" src="<?php echo site_url('static/scripts/jquery1.7.1.min.js').'?v='.conf('app', 'ran_beat'); ?>"></script>
			<script type="text/javascript" src="<?php echo site_url('static/scripts/lazyload.js').'?v='.conf('app', 'ran_beat'); ?>"></script>
			<script type="text/javascript">
				$(function(){
					$(".lazy").scrollLoading();
				})
			</script>
			
			
		处理方法：
		正则替换：<img\s+src="(<\?php\s+.+\s+\?>)"
		替换为： <img class="lazy" data-url="$1" src="<\?php echo site_url\('static\/images\/pixel.gif'\); \?>"
	
	5. 完成后熟悉下php层面的逻辑
	6. 所有广告链接都需要添加 target="_blank" 在新窗口打开。

		<a(.+)[?!target]>(.+)</a>
		替换为：
		<a target="_blank" $1>$2</a>
		
		查有target的a：<a.+(\b^(target="_blank")).+>(.*)</a>
		
		批量修改标签 不带target的标签方法：
		修正后的匹配方式 ：
			<a\s+(?!target="_blank")(.+)>(.*)</a>
		替换为：
			<a target="_blank" $1>$2</a>
		
	
	1)

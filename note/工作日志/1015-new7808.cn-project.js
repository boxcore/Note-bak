/**
 * 20131015. new6788.cn项目开发
 */

提任务：
new7808.cn内容调用：
	1.首页调用
	2.频道（分类页）调用
	3.搜索页面调用 
	4.文本项目页调用
	5.留言页调用
预计3天调完，不超5天。

0.公用模块：
	头部 （√）
	底部 （√）

1.首页调用：
	
	
2.导航 项目库调用
	链接形式：目前导航如餐饮美食的链接是  http://www1.7808.cn/canyin 
	调用的项目库是使用盘古api，还是需要自己写查询
	
3.搜索页面
	搜索页面的结构集取 项目库 还是 标准项目？
	


4.


5.


6.


7.


8.

------------------------------------------
注意使用函数

//1.图片地址的调用

imgTplReplace($content)
图片地址默认有{IMG_URL} 需要用函数imgTplReplace替换

/**
 * 替换模版变量为站点专用图片地址
 * @param  string $content 传入的字符串
 * @return string $striung 替换之后的字符串
 */
function imgTplReplace($content) {
	$tplName = conf('img', 'tplname');
	$picURL  = conf('img', 'mypic');
	$string = str_replace($tplName, $picURL, $content);
	return $string;
}

巢配置：
/*==Image Template Config==========================*/
$GLOBALS['img']['tplname'] = '{IMG_URL}';

项目配置：
/*===Image Source Config==============*/
$GLOBALS['img']['mypic'] = 'http://pic.7808.cn/';


// 2.会员密码的限定范围
会员密码允许范围为ASCII编码的可打印范围的字符6-32位
[\x{21}-\x{7e}]{6,32}
走国际化，不支持除英文和英文字符外的密码。


// 3.批量修改广告
UPDATE `item_ad` SET `ad_name`='首屏右边文字栏一1排1' WHERE (`id`='1353')
UPDATE `item_ad` SET `group_mark`='A-A-G' WHERE (`id`>='1403');

// 4.广告遍历格式
<?php if( !empty($ad['ads_i']) ): ?>
<?php foreach ( $ad['ads_i'] as $v ): ?>
				
<?php endforeach; ?>
<?php endif; ?>

格式二：
<?php if( !empty($ad['ads_2']) ): ?>
<?php $i=1; ?>
<?php foreach ( $ad['ads_2'] as $v ): ?>
....  <?php if($i>10 && $i<16): ?>{ <?php elseif():?> <?php else:?> }<?php endif;?>
<?php $i++; ?>
<?php endforeach; ?>
<?php endif; ?>

更复杂：
使用截取
array_slice( $ads_1, $i*4, 2)

数据调用：
超链接格式属性： 	target="_blank" stat="<?php echo 'ad-'.$v['id']; ?>" href="<?php echo $v['link']; ?>"
链接：			<?php echo $v['link']; ?>
图片地址：		<?php echo imgTplReplace( $v['src'] ) ?>
标题：			<?php secho( $v['slogan'] ) ?>
描述：			<?php secho( $v['ad_name'] ) ?>
定宽度名字：	<?php secho( mb_width( $v['slogan'], 18, '' ) ) ?>
评语：			<?php secho( $v['review'] ) ?>

广告标语用slogan
广告描述引用项目的评语：item.review 广告改用review字段里面的内容。
//



/**
 * 9:56 2013/10/25 项目库添加 
 */

//文字招商页面查询内容
函数处理相关参数：
romeo.fun.item
get_dic_select();
get_area_select();

NEST.func.app
getDicOne() 


//开会说明主要问题
1. 暂时延后站群模式，能力太分散。重点落在7808.cn和6788.cn，6788是试验田。
2. 代码测试流程：压力测试，注入测试。服务器可能被攻击，主从的应急机制等。
3. 慢日志的查询，用来评测程序效能。
4. 运维专员--小强
5. 人员：B-》产品； C-》功能； A：-》修改美工等功能
6. 大系统需要写功能文档。
7. 推荐机制
8. 准备下个月的系统：CRM系统。




/**
 * 20131028
 */

// fix bug
1. romeo后台添加标准项目成功后没有 保存管理员用户名 和 管理员密码 ： http://romeo.7808.cn/content/item_detail/625
2. 标准项目的删除问题：直接删除的是数据库，但标准项目下的图片没有删除。  建议进行删除，另外允许的话删除数据只进入回收站。

//功能添加修改
1. 库项目 读取 浏览次 数据问题：目前没有记录库项目浏览次数的字段， 建议 库项目的浏览次数 和 标准项目的浏览次数分开记录（2个页面展示产品，但页面不是相同的）。
2. 确认属性区域展现问题
3. 

//check test
1. 测试删除项目后相关的数据是否会被清除干净。
	SELECT * FROM `item` WHERE `id`=624；
	SELECT * FROM `item_ad` WHERE `item_id`=624;
	SELECT * FROM `item_albums` WHERE `item_id`=624;
	
	需要删除的关联表：
	item_detail item_duty item_extra item_history item_img item_journey item_member_company item_meta item_mobile item_prevent item_service tel_400

	没有必要删除的关联表：
	item_push item_push_mobile
	
	未知：
	stat_article_comment stat_auction_chat stat_auction_comment stat_external_chat stat_external_comment stat_inner_chat stat_inner_comment stat_item

2. 
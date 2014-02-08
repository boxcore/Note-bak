1.
	团购倒计时功能；
	RBAC如何设置地更simple
	瀑布流
	头像的无刷新上传
	
2.trumblr
	关注、互粉、发布控制、字过滤、搜索多选、多搜索无刷新、发布心情、发布时间判断
	
3.
	Action关联控制、所有的CURD的控制都放在一个common中.
	投稿功能、商品纠错功能、模式图片处理
	
4.
	思考数据库中关于0和1的处理，为什么默认不为0
	多商品rbac权限管理设置，
	json筛选查询排行
	账号申诉
	
5.
	属性分类控制、中文验证码、
	会员等级、积分系统
	广告扣分系统：广告置顶
	二手闲置系统、
	
思考：二维码在网站中的应用
	
思考：	1）做项目的状态，不是玩，而是精准的商业网站开发。
		2）做站流程：需求分析，原型图——>代码库规范
		
		
补充：	1）多属性筛选结果；
		2）Ajax评论分页；
		
		
--------------------------------------

/**
* @filename baseTags.php
* @touch date Tue 21 Apr 2009 11:49:12 AM CST
* @package phpDocumentor demo
* @author Laruence
* @license http://www.zend.com/license/3_0.txt   PHP License 3.0
* @version 1.0.0
* @copyright (c) 2009, Laruence
*/

/**
* this function is a demo to illustrate how phpdocument tags work
* <code>
* $bool = element(true, "laruence");
* </code>
* @deprecated
* @param bool $bool  a flag to decide whether the string should be output
* @param string|int  $string  sometimes it's a string, sometimes it's a int
* @return bool
*/
function element($bool, $string){
	if ($bool){
	die("flag off");
}
echo "I love $string";
	return true;
}


------------------
1.
每个php文件开头：
/**
 * Common base class of all phpdoc classes （简述，用在索引列表中，应尽量只占一行）
 *
 * As a kind of common base class PhpdocObject holds
 * configuration values (e.g. error handling) and debugging
 * methods (e.g. introspection()). It does not have a constructor,
 * so you can always inheritig Phpdoc classes from this
 * class without any trouble. （详细的功能描述，可以多行）
 *
 * @author   Ulf Wendel 
 * @version  $Id: PhpdocObject.php,v 1.3 2001/02/18 15:29:29 uw Exp $
 * @package  PHPDoc （文档标记）（你可以将不同的模块放在不同的package里，生成文档的时候会自 * 动生成一个包列表，可以在文档的左上角选择不同的包查看不同的模块文档）
 */
 
 
 	/**
    * 文件描述
	*
    * @author  作者
	* @version 版本
    * @access  private、public或proteced  | 使用范围：class,function,var,define,module
	* @const   使用范围：define  来指明php中define的常量
	* @global	指明在此函数中引用的全局变量
	* @package	使用范围：页面级别的-> define，function，include
				类级别的->class，var，methods
				用于逻辑上将一个或几个关键字分到一组。
	* @static	指明关建字是静态的。
	* @var		指明变量类型
	* @name		为关键字指定一个别名。
    * @param	int|string|float|array|object	$变量	变量描述
    * @return	void|integer|string|float|array|object
    */
	
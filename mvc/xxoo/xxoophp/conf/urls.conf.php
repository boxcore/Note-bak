<?php if ( !defined('XXOO') ) exit('No direct script access allowed');

/*
  ---------------------------------------------------------------------- 
	URL请求资源配置
	eg:
	'url' => array(
		'c'	=> 'front/Article', 		// 控制器文件名、类名
		'f'	=> 'show', 					// 方法名
		'p'	=> 'sp',					// 额外参数
	);
  ----------------------------------------------------------------------
*/

return array(
	'.*'				=> array('i'=>'Test'),
	'default' 			=> array('c'=>'Default'),
	'article/.*'		=> array('i'=>'Login'),
	'article/(\d+)' 	=> array('c'=>'Article','f'=>'show'),
	'stat' 				=> array('c'=>'Article'),
	'user/init' 		=> array('c'=>'User','f'=>'init'),
	'user/add' 			=> array('c'=>'User','f'=>'add'),
	'testSmarty' 		=> array('c'=>'Test','f'=>'testSmarty')
);


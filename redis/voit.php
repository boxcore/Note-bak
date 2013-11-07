<?php
/**
 * 
 * 缓存利用测试，这里我们获取传过来的投票数据，每次加1，如果增加到了设定值，才将投票
 * 次数写回mysql，这大大减轻了与mysql链接的开销，redis的使用由此可见一斑
 * @var unknown_type
 * @来自：www.crazyant.net和www.51projob.com
 */

//获取投票的信息的ID
$aid = isset($_GET['aid']) ? ereg_replace("[^0-9]", "", $_GET['aid']) : 0;

//当前投票的数字，指的是在redis中的数据
$this_click_num = 0;

if($aid>2){
	//设定写回的投票数的最大值，到了此值就写回mysql
	$update_till_num = 50;
	
	//创建redis对象
	$r = new Redis();
	$r->connect('127.0.0.1',6379); 
	//得到现在是第几个数据了
	$this_click_num = $r->get('count_xin_newgame:'.$aid);
	//点击数加1
	$r->set('count_xin_newgame:'.$aid,$this_click_num+1);
	if($this_click_num>=$update_till_num)
	{
		//如果点击数超过了设定数，那么就把数据写到mysql
		if($this_click_num>$update_till_num)
		require_once(dirname(__FILE__)."/db.php");
		//更新数据库
		$db->ExecuteNoneQuery(
			"UPDATE `addonnewgame` 
				SET `game_num` = game_num + '{$update_till_num}' 
				WHERE `dede_addonnewgame`.`aid` ={$aid};"
		);
		//重置投票数目为0
		$r->set('count_xin_newgame:'.$aid,0);
	}
	$r->setTimeout('count_xin_newgame:'.$aid,7*24*60*60);
	exit($this_click_num);
}
?>
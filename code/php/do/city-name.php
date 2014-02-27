<?php
require '../common.php';


/**
 * 批量转汉字为拼音
 */
include(BASE_DIR . 'funcs/pinyin.fn.php');
while($row=mysql_fetch_array($result)){
   $mark = Pinyin($row['name'],'utf8');
   // mysql_query("update `xwd_city` set mark = '{$mark}' where id = {$row['id']} ");
}

//
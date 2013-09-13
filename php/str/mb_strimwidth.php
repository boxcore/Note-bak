<?php
header('content-type:text/html; charset=utf-8');
$a = microtime();
// $one = '60';
$text = 'fadfa为发呆发呆首发得分手段打发的首发二等分啊饿啊第三发电adsfadsfas打发的首发德法俄发俄方，俄法俄方dfadfdfadsf<hr>';
// $count= mb_strlen($text, 'utf-8');
// $row = ($count - $count%$one)/$one;
// if($count%$one != 0) {
// $row = $row+1;	
// }
// for($i=0;$i< $row;$i++) {
// echo mb_strimwidth($text, $i*$one, $one, '...', 'utf8');
// echo '<br />';
// }

echo mb_strimwidth($text, 0, 144, '...', 'utf8');
$b = microtime();
echo $b-$a;
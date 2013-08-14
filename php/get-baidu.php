<?php
	header("content-type:text/html; charset=utf8");
	$str = file_get_contents('http://www.baidu.com');
	// echo $str;
	$txt = '/<title>(.*?)<\/title>/ixums';
	preg_match_all($txt, $str, $res);
	// echo "<pre>";
	// print_r($res);
	// echo "</pre>";
	echo $res[1][0];
	// var_dump($res);

	/**/
// 	preg_match_all("|<[^>]+>(.*)</[^>]+>|U", "<b>example: </b><div align=left>this is a test</div>", $out, PREG_PATTERN_ORDER);
// // echo $out[0][0] . ", " . $out[0][1] . "\n";
// // echo $out[1][0] . ", " . $out[1][1] . "\n";
// echo "<pre>";
// print_r($out);
// echo "</pre>";
?>
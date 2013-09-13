<?php
	header('content-type:text/html; charset=utf8');
	// $str = '中a国1人b民,,';
	$str = '，，，， ,,,, ';
	echo $str;
	echo '<hr>';
	echo countstr($str);
	/**
	$a 		php里utf8字符集下，中文3个，英文1个
	$b 		以utf8算，中文1个，英文1个
	$zw		$a-$b差的字符全是中文了，但是是2个表示1个中文了；除以2就是中文的个数
	$en 	$b-$zw就是英文的个数了
	PHP内置的字符串长度函数strlen无法正确处理中文字符串，它得 到的只是字符串所占的字节数。对于GB2312的中文编码，strlen得到的值是汉字个数的2倍，而对于UTF-8编码的中文，就是3倍的差异了（在 UTF-8编码下，一个汉字占3个字节）。

	采用mb_strlen函数可以较好地解决这个问题。mb_strlen的用法和 strlen类似，只不过它有第二个可选参数用于指定字符编码。例如得到UTF-8的字符串$str长度，可以用 mb_strlen($str,'UTF-8')。如果省略第二个参数，则会使用PHP的内部编码。内部编码可以通过 mb_internal_encoding()函数得到。需要注意的是，mb_strlen并不是PHP核心函数，使用前需要确保在php.ini中加载 了php_mbstring.dll，即确保“extension=php_mbstring.dll”这一行存在并且没有被注释掉，否则会出现未定义函 数的问题。
	*/
	function countstr($str){
		$a = strlen($str);
		$b = mb_strlen($str,'utf8');
		$zw = ($a - $b) /2;
		$en = $b - $zw;
		return "文字统计信息：总共{$b}个字符，{$zw} 个中文，{$en}个英文。";
	}
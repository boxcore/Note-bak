<?php
/**
 *	substr — 返回字符串的子串
 *	string substr ( string $string , int $start [, int $length ] )
 *		string 输入的字符串
 *		start 0为第一个，-1为最后一个开始
 *		length 正数为 从 start 处开始最多包括 length 个字符，负数 那么 string 末尾处的许多字符将会被漏掉，length为负数的位置和后面的均会被忽略掉。
 *		返回值	返回字符串 string 由 start 和 length 参数指定的子字符串。 错误时返回 FALSE。
 *	说明：
 */
$rest = substr("abcdef", -3, 1); // 返回 "d"
$rest = substr("abcdef", 0, -1);  // 返回 "abcde"
$rest = substr("abcdef", 2, -1);  // 返回 "cde"
$rest = substr("abcdef", 4, -4);  // 返回 ""
$rest = substr("abcdef", -3, -1); // 返回 "de"

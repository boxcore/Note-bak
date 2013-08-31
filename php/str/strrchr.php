<?php
/**
 *	strrchr — 查找指定字符在字符串中的最后一次出现
 *	string strrchr ( string $haystack , mixed $needle )
 *		haystack 在该字符串中查找。 
 *		needle 如果 needle 不是一个字符串，那么它将被转化为整型并且作为字符的序号来使用。 
 *		before_needle 若为 TRUE，strstr() 将返回 needle 在 haystack 中的位置之前的部分。
 *		返回值	该函数返回 haystack 字符串中的一部分，这部分以 needle 的最后出现位置开始，直到 haystack 末尾。如果 needle 未被找到，返回 FALSE。  
 *	说明：
 */
$PATH = "c://ff/dd/dd";
$dir = substr(strrchr($PATH, ":"), 1);
// strrchr后的值是://ff/dd/dd； 再用substr截取掉：，返回//ff/dd/dd
echo $dir;


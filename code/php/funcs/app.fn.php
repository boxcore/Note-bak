<?php
// 默认函数库文件

/**
+----------------------------------------------------------
 * 字符串截取，支持中文和其他编码
+----------------------------------------------------------
+----------------------------------------------------------
 * @param string $str 需要转换的字符串
 * @param string $length 截取长度
 * @param string $start 开始位置
 * @param string $charset 编码格式
 * @param string $suffix 截断显示字符
+----------------------------------------------------------
 * @return string
+----------------------------------------------------------
 */
function cutStr($str, $length, $suffix=true, $start=0, $charset="utf-8") {
    $returnstr = '';
    $i = 0;
    $l = 0;
    while ($l<$length) {
        $sub = mb_substr($str, $i, 1, $charset);
        $i++;
        $returnstr .= $sub;
        if (strlen($sub)==1) {
            $l += (($sub == "\r") || ($sub == "\n"))?0:0.5;
        }
        else {
            $l++;
        }
    }
    if (mb_strlen($str, $charset) > mb_strlen($returnstr, $charset) && $suffix) {
        $returnstr .= ($suffix === true)?'...':$suffix;
    }
    return $returnstr;
}
<?php
header('Content-Type: text/html; charset=utf8');
// 过滤指定汉字
/**
 * 训练要点： 对字符编码应用，对正则应用
 *
 */

// 需求一：需要转成 "北京 广州 天安 黄河街"
$str = '北京市 广州区 天安县 黄河街道';

// 需求二： 转成 array('广州', '北京市', '黄河',  '县省区', '西二旗',)
$city = array('广州区', '北京市区', '黄河街道',  '县省区街', '西二旗',);

// php中utf-8编码下用正则表达式如何匹配汉字][1]
    // 使用正则
    // /^[\x{4e00}-\x{9fa5}]+$/u
$a = '北京 市';
$b = '北京市';
$c = '北京市we';
$d = '北京市发饿饭';

$regex = '/^[\x{4e00}-\x{9fa5}]{3,}$/u';
$matches = array();
preg_match($regex, $d, $matches);

print_r($matches);
?>
<hr>
<?php
//处理汉字
require_once 'common.php';
echo cutStr($a,3, false );
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
<?php
//正则函数
$a = 'addabde_-32123';
$b = '35113';
$c = '11...33';
$f = 45333+'fe';
$d = 45333;
$t1 = microtime(true);
echo preg_match('/^\d{1,}$/i', $f).'<hr>';
$t2 = microtime(true);
$ta = $t2-$t1;

$str_total = var_export($ta, TRUE);
if(substr_count($str_total,"E")){
    $float_total = floatval(substr($str_total,5));
    $total = $float_total/100000;
    echo "$total".'秒';
}
?>
</body>
</html>

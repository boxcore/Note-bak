<?php
//preg_replace函数
$str = "
private long contract_id;
private string contract_number;
private string customer_name;
";
echo preg_replace('/_n([a-z])/e', 'ucfirst("${1}")',$str);
echo "<hr>";
echo preg_replace('/_([a-z])/e', 'strtoupper("${1}")',$str);
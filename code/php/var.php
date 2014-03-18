<?php

$a = 123;
$b = &$a;
echo $b;
echo "<hr>";
unset($a);
echo $b;
echo '<hr>';
echo $a;


<?php
$x=0;
$y=0;
// if($x==0 || ++$y==$x++){
// 	++$x;  //x:1 y:0
// }

if($x==0 && ++$y==$x++){
	++$x;  //x:1 y:1
}
echo "x:$x";
echo "y:$y";
?>
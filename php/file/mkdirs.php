<?php
/**
 * 递归生成目录(方法一)
 *
 *	@parma  $dir 	递归生成的目录，可以是多目录级别
 */
function mkdirs($dir){
    return is_dir($dir) or (mkdirs(dirname($dir)) and mkdir($dir,0777));
}

//dev
$dir="./222/77/pp";
// echo mkdirs($dir);
var_dump(is_dir($dir));
echo "<hr>";
var_dump(dirname($dir));
echo "<hr>";
mkdir($dir,0777);
echo "<hr>";

/**
说明：这逻辑关系比较复杂，现在还没有熟悉好他，加油吧


**/

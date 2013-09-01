<?php
///创建文件 未测试
function creat_file($PATH){
   $sFile = "test.html";
   if (file_exists($PATH.$sFile)) {
    creat_file();
   } else {
    $fp= fopen($PATH.$sFile,"w");
    fclose($fp);
   } 
   return $sFile;
}
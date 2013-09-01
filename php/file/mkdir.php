<?php
//创建文件夹 
function createdir($dir)
{
   if(file_exists($dir) && is_dir($dir)){
   }
   else{
    mkdir ($dir,0777);
   }
}
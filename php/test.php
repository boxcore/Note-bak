<?php
/**
 * 快速排序法
 */
// function my_scandir($dir){
//     $files = array();
//     if(is_dir($dir)){
//         if($handle = opendir($dir)){
//             while(($file = readdir($handle)) !== false){
//                 if($file != "." && $file != ".."){
//                     if(is_dir($dir."/".$file)){
//                         $files[$file] = my_scandir($dir.'/'.$file);
//                     } else {
//                         $files[] = $dur."/".$file;
//                     }
//                 }
//             }
//             closedir($handle);
//             return $files;

//         }
//     }
// }


// function my_scandir($dir) {
//         if(empty($files)) $files = array();
//         if(is_dir($dir)) {
//                 if($handle = opendir($dir)) {
//                         while(($file = readdir($handle)) !== false) {
//                                 if($file != "." && $file != "..") {
//                                         if(is_dir($dir. "/" . $file)) {
//                                                 $files[$file] = my_scandir($dir . "/" . $file);
//                                         } else $files[] = $dir . "/" . $file;
//                                 }
//                         }
//                         closedir($handle);
//                         return $files;
//                 }
//         }
// }
// echo "<pre>";

// print_r(my_scandir("../"));
// echo "</pre>";

 
$arr = array("dd"=>"zero", 3=>"one", "a"=>"two");           //定义一个数组  
asort($arr);                                     //使用sort对数组进行排序  
print_r($arr);

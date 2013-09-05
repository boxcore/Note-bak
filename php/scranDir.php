<?php
/**
 * 遍历当前目录
 *
 */
// $uri = dirname(__FILE__);
// echo getcwd();  //获取当前目录
// echo "<hr>";
// echo $_SERVER['PHP_SELF'];

// processAllFiles($uri);
function processAllFiles($basePath)
{  
    $dirs = array( realpath( $basePath ) );  
    // print_r($dirs);
    while( $dir = each( $dirs ) )  
    {  
        
        $path = $dir[ 'value' ] . DIRECTORY_SEPARATOR;  
        $files = scandir( $path );  
        echo "<pre>";
        print_r($dir);
        print_r($files);
        echo "</pre>";
        // foreach( $files as $file )  
        // {  
        //     $fullPath = $path . $file;  
        //     if( is_dir( $fullPath ) && $file != '.' && $file != '..' )  
        //     {  
        //         $dirs[] = $fullPath;  
        //     } elseif( is_file( $fullPath ) )  
        //     {  
        //         //对文件进行处理  
        //         echo $fullPath, "<br>";  
        //     }  
        // }  
    }  
}

function scranDirs($basePath){
    $dirs = realpath($basePath);



    echo "<pre>";
        print_r($dirs);
        // print_r($files);
    echo "</pre>";
}
scranDirs();
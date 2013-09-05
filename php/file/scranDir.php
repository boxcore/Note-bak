<?php
/**
 * 遍历当前目录
 *
 */
// echo "<pre>";
// print_r($_SERVER);
// echo "</pre>";
// $uri = dirname(__FILE__);
// echo getcwd();  //获取当前目录
// echo "<hr>";
// echo $_SERVER['PHP_SELF'];
// echo "<pre>";
// print_r($_SERVER);
// echo "</pre>";
// echo "<a href='pathinfo.php'>test link</a>";
processAllFiles($uri);
function processAllFiles($basePath)
{  
    $dirs = array( realpath( $basePath ) );  

    while( $dir = each( $dirs ) )  
    {
        $path = $dir['value'] . DIRECTORY_SEPARATOR;
        $files = scandir( $path );
        // echo "<pre>";
        // print_r($files);
        // echo "</pre>";
        foreach( $files as $file )
        {
            $fullPath = $path . $file;  
            if( is_dir( $fullPath ) && $file != '.' && $file != '..' )
            {
                $dirs[] = $fullPath;
            } elseif( is_file( $fullPath ) )
            {
                //对文件进行处理
                echo $fullPath, "<br>";
            }
        }
    }
}
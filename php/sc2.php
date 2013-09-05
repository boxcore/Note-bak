<?php
function dirs($path){
	$file = array();
	if($handle = opendir($path)){
		while(($file = readdir($handle)) !== false){
			if($file != '.' && $file != '..'){
				if(is_dir($path.'/'.$file)){
					$files[$file] = dirs($path.'/'.$file);
				} else {
					$files[] = $file;
				}
			}
		}
		closedir($handle);
		return $files;
	}
}

echo "<pre>";
print_r(dirs('./'));
echo '</pre>';
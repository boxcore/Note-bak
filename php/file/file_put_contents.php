<?php
	// header("refresh:3");
	echo 111;
	
	while(1){
		sleep(2);
		file_put_contents("test.txt", 123456789, FILE_APPEND);
	}
<?php
	header("content-type:image/jpeg");
	header("content-length:".filesize("./subway/".$_GET['fn'].".jpg"));
	header("Content-Disposition:attachment;filename=".$_GET['fn'].".jpg");
	readfile("./subway/".$_GET['fn'].".jpg");
<?php
//md5

$pass = trim($_GET['md5']);
if($pass) {
	echo $pass."(md5): ".md5($pass)."<br>";
	echo $pass."(strtoupper(md5)): ".strtoupper(md5($pass))."<br>";
	echo $pass."(md5(md5)): ".md5(md5($pass))."<br>";
}
?>
<form action="" method="get">
	MD5: <input type="text" name="md5" id="md5">
</form>

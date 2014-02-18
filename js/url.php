<?php
// prepare
$url = isset($_POST['url']) ? $_POST['url'] : 'http://www.baidu.com/ssdf.php?a a=bb&cc_dd=24-2';
$jsurl = isset($_POST['jsurl']) ? $_POST['jsurl'] : 'http%3A%2F%2Fwww.baidu.com%2Fssdf.php%3Fa%20a%3Dbb%26cc_dd%3D24-2';
?>
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<link rel="stylesheet" href="style.css">
	<script src="jquery.js"></script>
</head>
<body>
	<h1>输入url地址</h1>
	<h6>PHP urldecode(): <?php echo urldecode($jsurl); ?></h6>
	<br>
	<h6>PHP iconv(): <?php echo iconv($jsurl); ?></h6>
	<form action="" method="post" id="form-url">
		URL: <input type="text" name="url" id="" value="<?php echo $url; ?>" size="50">&nbsp;&nbsp; <input type="submit" value="提交">
		
	</form>

	<div id='console'>
		
	</div>
	<script>
		var url = "<?php echo $url; ?>";
		$('#console').append("<p>1、escape(url): "+escape(url)+"</p>");
		$('#console').append("<p>2、encodeURI(url)："+encodeURI(url)+"</p>");
		$('#console').append("<p>3、encodeURIComponent(url)："+encodeURIComponent(url)+"</p>");

		$('#form-url').append('<input type="hidden" name="jsurl" value="'+encodeURIComponent(url)+'">');

		console.log("1、escape(url): "+escape(url));
		console.log("2、encodeURI(url)："+encodeURI(url));
		console.log("3、encodeURIComponent(url)："+encodeURIComponent(url));
	</script>
</body>
</html>
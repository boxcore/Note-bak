<!DOCTYPE HTML>
<html lang="en-US">
<head>
	<meta charset="UTF-8">
	<title>register</title>
</head>
<body>
	<h3>register</h3>
	<form action="<?php echo site_url('user/add'); ?>" method="post">
		<p>
			<label for="username">用户名：</label>
			<input type="text" name="username" value="<?php echo set_value('username') ?>" />
			<?php echo from_error( 'username' ); ?>
		</p>
		<p>
			<label for="password">密码：</label>
			<input type="text" name="userpwd" value="" />
		</p>
		<p>
			<label for="sex">女</label>
			<input type="radio" name="sex" value="0" />
			<label for="sex">男</label>
			<input type="radio" name="sex" value="1" />
		</p>
		<p>
			<label for="education">学历</label>
			<select name="education">
				<option value="">请选择学历</option>
				<option value="1">小学</option>
				<option value="2">中学</option>
				<option value="3">大学</option>
			</select>
		</p>
		<p>
			<input type="submit" value="提交" />
		</p>
	</form>
</body>
</html>
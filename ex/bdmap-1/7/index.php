<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 
	<title>路程计算器</title>
	<link rel="stylesheet" type="text/css" href="./css/style.css" />
	<!--[if IE 6]>
		<script type="text/javascript" src="./js/DD_belatedPNG.js"></script>
		<script>
			DD_belatedPNG.fix('.logo, .btn, .down, img');
		</script>
	<![endif]-->
</head>
<body>
	<div id="main">
		<!-- 头部 start -->
		<div id="head">
			<!-- 选择交通工具 start -->
			<div class="mode">
				<ul>
					<li><img src="./images/mode_0.jpg" /></li>
					<li><img src="./images/mode_1_a.jpg" /></li>
					<li><img src="./images/mode_2.jpg" /></li>
				</ul>
			</div>
			<!-- 选择交通工具 end -->

			<!-- 应用logo start -->
			<div class="logo"><img src="./images/logo.png" /></div>
			<!-- 应用logo end -->
		</div>
		<!-- 头部 end -->

		<div class="clear"></div>

		<!-- 正文 start -->
		<div id="content">
			<!-- 搜索条 start -->
			<div class="search">
				<!-- 搜索框 start -->
				<ul>
					<li><input type="text" name="start" value="" /></li>
					<li class="exc"></li>
					<li><input type="text" name="end" value="目标地点" /></li>
				</ul>
				<!-- 搜索框 end -->
				<div class="clear"></div>
				<!-- 城市选择器 start -->
				<div class="city">
					<span>查询其他城市:</span>
				</div>
				<!-- 城市选择器 end -->
			</div>
			<div class="clear"></div>
			<div class="btn">神龙</div>
			<!-- 搜索条 end -->

			<div class="clear"></div>

			<!-- 查询结果 start -->
			<div class="result">
				<div class="tit">
					<ul>
						<li class="mt">最少时间</li>
						<li class="md">最短距离</li>
						<li class="ml">避开高速</li>
					</ul>
				</div>

				<div class="clear"></div>
				<!-- 结果正文 start -->
				<div class="con">
					<ul>
						<li></li>
						<li></li>
						<li></li>
					</ul>
				</div>
				<!-- 结果正文 end -->
			</div>
			<!-- 查询结果 end -->
		</div>
		<!-- 正文 end -->

		<div class="clear"></div>

		<!-- 页尾 start -->
		<div id="footer">
			<!-- 地铁线路图下载 start -->
			<div class="down">
				<ul>
					<li class='btn'>地铁线路图下载</li>
					<li>
						<select>
							<option value="bj">北京</option>
							<option value="sh">上海</option>
							<option value="gz">广州</option>
							<option value="sz">深圳</option>
							<option value="xg">香港</option>
						</select>
						<select>
							<option value="l">清晰</option>
							<option value="h">高清</option>
						</select>
					</li>
					<li><a href="./down.php?fn=bj_h" target="_blank"><img src="./images/download.png"></a></li>
				</ul>
			</div>
			<!-- 地铁线路图下载 end -->

			<!-- 百度帐号登录 start -->
			<div class="login">
				<ul>
					<li><img src="./images/avator.jpg" title="晨曦牧鸣" /></li>
					<li><img src="./images/avator.jpg" title="注销" /></li>
					<li><img src="./images/avator.jpg" title="查询历史" /></li>
				</ul>
			</div>
			<!-- 百度帐号登录 end -->
		</div>
		<!-- 页尾 end -->
	</div>
</body>
</html>
<script type="text/javascript" src="http://api.map.baidu.com/api?v=1.5&ak=2f18a21f61a57e50df7511a057da7002"></script>
<script type="text/javascript" src="./js/smi.js"></script>
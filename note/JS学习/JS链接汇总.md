#js处理url学习汇总#
*2014/2/21 14:52:38*

**摘要：**

1. js获取链接（windows.location）
2. 监听链接点击事件并追加参数到链接
3. 编码url格式和解码url格式
4. 网页跳转


##一、js获取链接##
javascript获取当前页面的事件处理有 windows.location.href


##二、监听链接点击事件并追加参数到链接##


##三、编码url格式和解码url格式##

###3.1 js处理url链接###

用javascript对URL进行编码时有3个函数可选：escape、encodeURI和encodeURIComponent函数，其中**encodeURIComponent(url)** 是最常用的，下面介绍他们的用法和区别。



**传递参数时需要使用encodeURIComponent，这样组合的url才不会被#等特殊字符截断**

	<script language="javascript">
	document.write(''<a href="http://www.aa.cn/?logout&aid=7&u=''+encodeURIComponent("http://www.aa.cn/")+''">退出</a>'');
	</script> 

**进行url跳转时可以整体使用encodeURI**

	Location.href=encodeURI(http://cang.baidu.com/do/s?word=中国rr&ct=21); 

**escape对0-255以外的unicode值进行编码时输出%u****格式，其它情况下escape，encodeURI，encodeURIComponent编码结果相同**

说明：

- escape不编码字符有69个：*，+，-，.，/，@，_，0-9，a-z，A-Z 
- encodeURI不编码字符有82个：!，#，$，&，''，(，)，*，+，,，-，.，/，:，;，=，?，@，_，~，0-9，a-z，A-Z 
- encodeURIComponent不编码字符有71个：!， ''，(，)，*，-，.，_，~，0-9，a-z，A-Z 

	

	

	


###2. php处理url链接###
urlencode();

urldecode();



##四、网页跳转##
1.php重定向

    <?php
    header("Location: http://www.baidu.com");
	exit;
    ?>

2.Meta跳转

	<html>
	<meta http-equiv="refresh" content="1;url=http://baidu.com">
	</html>
>content=1 是1秒的意思

3.JavaScript跳转

	<script language="javascript" type="text/javascript">
	window.location.href = 'http://www.baidu.com/';
	</script>






###参考：md常用标记
图片   
![http://www.baidu.com/](http://avatar.csdn.net/3/4/F/1_mchdba.jpg)

超链接  
[download address](dev.mysql.com "title_hlink")

表格   
<table>
<tr><td>1</td> <td>ALERT</td><td> 可以立即被纠正的状况，比如损坏的数据库系统</td></tr>
<tr><td>2   </td>    <td>CRITICAL</td><td> CRITICAL状况，如设备错误或资源不足</td></tr>
<tr><td>3  </td>    <td>ERROR</td><td> 应该纠正的状况，如配置错误</td></tr>
<tr><td>4  </td>    <td>WARNING</td><td> 不能称其为错误的状况，但仍需要特别处理。</td></tr>
<tr><td>5  </td>    <td>INFO</td><td> 通报性消息。</td></tr>
<tr><td>6  </td>    <td>DEBUG</td><td> 调试消息，用于NDB集群开发。</td></tr>
</table>

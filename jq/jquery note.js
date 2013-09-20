/**
 * My jQuery Note: 20130919 中秋
 */

// 一、认识 jQuery
1.1 JavaScript和JavaScript库
1.2 加入jQuery
1.3 jQuery代码的编写
1.3.1 配置jQuery环境
1.3.2 编写简单的jQurey代码

	$(document).ready(function(){	//等待dom元素加载完毕
		alert("Hello World!");
	});
	
a. $(document).ready()方法 和 window.onload方法 的区别
window.onload：
	1）执行时机：必须等待网页中所有的内容加载完毕后（包括图片）才能执行；
	2）不能同时编写多个，而jq能同时编写多个；
	3）没有简写方法，jq可以简写成 $(function(){ [代码块] });
	
1.3.3 jQuery代码风格
	1. 链式操作风格
	$(".has_children").click(function(){
		$(this).addClass("highlight").children("a").show().end().siblings().removeClass("hightlight").children("a").hide();
	});
	可以写成：
	$(".has_children").click(function(){
		$(this).addClass("highlight")
			.children("a").show().end()
		.siblings().removeClass("highlight")
			.children("a").hide();
	})
	
1.4 jQuery对象和DOM对象
1.4.1 DOM对象和jQuery对象简介
1. DO对象
DOM（Document Object Model, 文档对象模型）
	jq对象转dom对象：
		var $a = $("#a");
		var a = $a[0];  	//方法一
		var b = $a.get(0)	//方法二
		alert(a.innerHTML);

1.5 解决jQuery和其他库的冲突
	1. jq库在其他库之后导入
		在其他库和jq库都被加载完毕后，可以在任何时候调用jQuery.noConflict()函数来将变量$的控制权移交给其他js库：
		jQuery.noConflict();

二. jQuery选择器

2.1 jQuery选择器是什么
1. CSS选择器
	标签选择器：
	ID选择器
	类选择器
	群组选择器：   E1, E2, E3{ CSS规则 }
	后代选择器：	E F { CSS规则 }
	通配选择符: 	* { css规则 }

2. jq选择器
a. 基本选择器
	#id 		$("#test")
	.class 		$(".test")
	element 	$("p")
	*			$("*")	选取所有的元素
	sec1,sec2,...,secN 	$("div,span,p.myclass")

b.层次选择器
	$("ancestor descendant")
	$("parent>child") 	选取parent元素下的child子元素
	$("prev + next")	选取紧接在prev元素后的next元素
	$("prev~sibling") 	选取prev元素之后的所有siblings元素

	$(".one + div")  ==  $(".one").next("div");
	$("#prev~div") == $("#prev").nextAll("div");

3.过滤选择器
a.基本过滤选择器
	:first 
	:last
	:not(selector)
	:even
	:odd
	:eq(index)
	:gt(index)
	:lt(index)
	:header
	:animated 	选取当前正在执行动画的所有元素

b.内容过滤选择器
	:contains(text)		选取含有文本内容为“text”的元素
	:empty				选取不包含子元素或者文本的空元素
	:has(selector)		选取含有选择器所匹配的元素的元素
	:parent 			选取含有子元素或者文本的元素

c.可见性过滤选择器
	:hidden
	:visible			选取所有可见的元素

d.属性过滤选择器
	[attribute]
	[attribute=value]
	[attribute!=value]
	[attribute^=value]
	[attribute$=value]
	[attribute*=value]
	[selector1][selector2][selectorN]

e.子元素过滤选择器
	:nth-child(index/even/odd/equation)
		:nth-child() 功能：
			1） :nth-child(even)
			2） :nth-child(odd)
			3） :nth-child(2) 选取每个夫元素下的索引值等于2的元素
			4） :nth-child(3n) 索引值是3的倍数的元素（n从0开始）
			5） :nth-child(3n+1) （n从0开始）
	:first-child
	:last-child
	:only-child






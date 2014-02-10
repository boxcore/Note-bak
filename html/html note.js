html 复习笔记
@20130609 by boxcore

一、html标签
1.文字
2.图片
3.表格
4.表单
5.超链接
6.按钮
7.框架


1.路径
/a/a.gif 是一个绝对路径

2.head头的元标签和导入的外部文件
//指明是html标签
<meta http-equiv="content-type" content="text/html;charset=utf-8" />
HTML5支持简短形式：<meta charset="urt-8"/>
//外部样式表
<link rel="stylesheet" type="text/css" href="theme.css" />
<script type="text/javascript" src="myscripts.js" charset="UTF-8"></script>

3.nobr  //不换行的使用？

4.行（级）标签 和 块（级）标签

5.需要记住的实体
空格：&nbsp;
 < :&lt;
 > :&gt;

6.img标签中的属性和热点：
img标签中有的属性：src，title，width，height，border，usemap

图片热点map：
map 属性： 1）name 属性可能会被丢弃；2）id 有可能用id替代name。？？？

热点区域->
area：shape，coords，href
	shape属性：rect（矩形），circle（圆），poly（多边形）
	coords属性：矩形有2点四个数字，左上角到右下角。
				圆有1点三个数字，前2个是坐标，最后一个是半径。
				多边形每2个数有一个坐标点。
eg:
	<img src="img.jpg" title="aaaaaaaa" border="2px"usemap="#abc"/>
	<map id="abc">
	    <area shape="circle" coords="108,69,60" href="http://www.baidu.com" target="_blank"/> 
	</map>

img标签总结：



7.锚点 a
a的属性：name（锚点的name有可能会用id来替代？） id title

【URL】 统一资源定位符
【HTTP协议】超文本传输协议

电子邮件：<a href="mailto:admin@localhost">站长邮箱</a>

8.对齐方式 的属性
水平:left center right
垂直:top middle bottom
align水平对齐可以用在块级标签中如：p/h1/table
行级标签不支持align：如span/b/i/u/img 	特殊：form也不支持align属性

9.表格
table的属性：width、height、border、bordercolor、cellspacing、cellpadding、align 表居中
表名->caption 问 caption置于table之后,默认居中,w3c 不建议使用align属性
表头->th 默认加粗、居中；可视为第一个td
行->tr
列->td
	列td的属性：width、height、 colspan、rowspan、align（left|center|right）、valign（top|middle|bottom）

10.表单
form表单属性：action、method、enctype
enctype属性：
值 									描述 
application/x-www-form-urlencoded	在发送前编码所有字符（默认）
multipart/form-data					不对字符编码。在使用包含文件上传控件的表单时，必须使用该值。
 text/plain							空格转换为 "+" 加号，但不对特殊字符编码。
 ？如果提交文件，但method设置为get，能否把值传去 


文本框->input type=text
文本框属性：name、value、size(输入框长度，px)、maxlength（最多输入多少个字，字个数）、checked、readonly、disabled（不让数据提交）、alt、title
	?输入框中的checked作用？
密码框->input type=password

单选框->input type=radio
    name要相同

复选框->input type=checkbox
    name数组格式 如 name="user[]"

下拉菜单->select
    下拉菜单的属性：name、size、disabled（把下拉菜单禁掉）

下拉菜单选项->option
	菜单选项属性：label、value、selected、disabled

多选下拉菜单->select
    属性：size、multiple（可多选，按下ctrl键）

区域框->textarea
    属性：cols、rows、name、disabled、readonly  
    style="resize:none"//设置textarea不随便调整大小
    文本区中可容纳无限数量的文本，其中的文本的默认字体是等宽字体（通常是 Courier）。
	cols 规定文本区内的可见宽度		如10 代表一行中显示10个字母或5个汉字	
	rows 规定文本区内的可见行数		如3	代表出现3行
	不过更好的办法是使用 CSS 的 height 和 width 属性来控制textarea的区域



图片按钮->input type=image

提交按钮->input type=submit

重置按钮->input type=reset

隐藏框->input type=hidden


11.框架->frameset
    属性：cols、rows、 border、frameborder、bordercolor
frame
    属性：name、noresize、scrolling （yes|no|auto）、src

内嵌框架->iframe
    属性：src、name

补充：target属性
值			描述 
_blank		在新窗口中打开被链接文档。 
_self		默认。在相同的框架中打开被链接文档。 
_parent		在父框架集中打开被链接文档。 
_top		在整个窗口中打开被链接文档。 
framename	在指定的框架中打开被链接文档。 


*********************************************

html归纳总结：
1.doctype
doctype作用：doctype让浏览器看到你的页面时，尽量按照doctype版本标准来解析页面样式

2.所有标签共有的属性:
1)id
//某一个人
<a href="http://www.baidu.com#end">往www.baidu.com页面中的name为end的锚点上锚</a>
<a href="#end"></a>
<a name="end" id="end">end</a>

<img src="" usemap="#map1">
<map name="map1" id="map1"></map>
//id或者name不能同名

2)title		鼠标放上去显示出来
3)class		同一类人
4)style		设置样式的


3.有name属性的标签
a、form->input等、map

4.有align属性的标签: p|h1|table|div等块级标签
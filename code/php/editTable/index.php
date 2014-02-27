<?php
include_once("connect.php");
$query=mysql_query("select * from customer where id=1");
$rs=mysql_fetch_array($query);
// print_r($rs);
$username=$rs['username'];
$userid=$rs['id'];
$solutation=$rs['solutation'];
$phone=$rs['phone'];
$company=$rs['company'];
$mobile=$rs['mobile'];
$source=$rs['source'];
$sdate=$rs['sdate'];
$job=$rs['job'];
$web=$rs['web'];
$email=$rs['email'];
$createtime=$rs['createtime'];
$modifiedtime=$rs['modifiedtime'];
$note=$rs['note'];
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="keywords" content="jquery,php" />
<meta name="description" content="Helloweba演示平台，演示XHTML、CSS、jquery、PHP案例和示例" />
<title>可编辑的表格：jQuery+PHP实现实时编辑表格字段内容-Helloweba演示平台</title>
<link rel="stylesheet" type="text/css" href="css/main.css" />
<link rel="stylesheet" type="text/css" href="css/jquery-ui.css" />
<style type="text/css">
table{width:96%; margin:20px auto; border-collapse:collapse;}
table td{line-height:26px; padding:2px; padding-left:8px; border:1px solid #b6d6e6;}
.table_title{height:26px; line-height:26px; background:url(css/btn_bg.gif) repeat-x bottom; font-weight:bold; text-indent:.3em; outline:0;}
.table_label{background:#e8f5fe; text-align:right; }
.btn{height:24px; background:url(css/btn_bg.gif) repeat-x; padding:0 4px; font-size:12px; border:1px solid #ccc; cursor:pointer; margin-left:3px}
.input{border:1px solid #369; background:#ffc; padding:2px}
.msg{padding-left:30px; margin-top:20px}
textarea{font-size:12px}
</style>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
<script type="text/javascript" src="js/jquery.jeditable.min.js"></script>
<script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/jquery-ui.min.js'></script>
<script type="text/javascript">
$(function(){
	 $('.edit').editable('save.php', { 
		 width     :120,
		 height    :18,
		 //onblur    : "ignore",
         cancel    : '取消',
         submit    : '确定',
         indicator : '<img src="css/loader.gif">',
         tooltip   : '单击可以编辑...',
		 callback  : function(value, settings) {
			 $("#modifiedtime").html("刚刚");
         }

     });
	 $('.edit_select').editable('save.php', { 
		 loadurl   : 'json.php',
		 type      : "select",
		 cancel    : '取消',
         submit    : '确定',
         indicator : '<img src="css/loader.gif">',
         tooltip   : '单击可以编辑...',
		 style     : 'display: inline'
	 });
	 $(".datepicker").editable('save.php', { 
		 width     : 120,
		 type      : 'datepicker',
		 onblur    : "ignore",
		 cancel    : '取消',
         submit    : '确定',
         indicator : '<img src="css/loader.gif">',
         tooltip   : '单击可以编辑...',
		 style     : 'display: inline'
	 });
	 $(".textarea").editable('save.php', { 
		 type      : 'textarea',
		 rows      : 6,
		 cols      : 50,
		 onblur    : "ignore",
		 cancel    : '取消',
         submit    : '确定',
         indicator : '<img src="css/loader.gif">'
	 });	 
});
//调用jquery ui的datepicker日历插件
$.editable.addInputType('datepicker', {
    element : function(settings, original) {
        var input = $('<input class="input" />');
		input.attr("readonly","readonly");
        $(this).append(input);
        return(input);
    },
    plugin : function(settings, original) {
		var form = this;
		$("input",this).datepicker();
    }
});
</script>
</head>

<body>
<div id="header">
   <div id="logo"><h1><a href="http://www.helloweba.com" title="返回helloweba首页">helloweba</a></h1></div>
</div>

<div id="main">
  <h2 class="top_title"><a href="http://www.helloweba.com/view-blog-74.html">可编辑的表格：jQuery+PHP实现实时编辑表格字段内容</a></h2>
  <div class="msg"><strong>提示</strong>：点击表格中字段对应的内容即可进行在线编辑。</div>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <thead>
    <tr class="table_title">
      <td colspan="4"><span class="open"></span>客户信息</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="20%" class="table_label">姓名</td>
      <td width="30%" class="edit" id="username"><?php echo $username; ?></td>
      <td width="20%" class="table_label">办公电话</td>
      <td width="30%" class="edit" id="phone"><?php echo $phone; ?></td>
    </tr>
    <tr>
      <td class="table_label">称谓</td>
      <td class="edit" id="solutation"><?php echo $solutation; ?></td>
      <td class="table_label">手机</td>
      <td class="edit" id="mobile"><?php echo $mobile; ?></td>
    </tr>
    <tr>
      <td class="table_label">公司名称</td>
      <td class="edit" id="company"><?php echo $company; ?></td>
      <td class="table_label">电子邮箱</td>
      <td class="edit" id="email"><?php echo $email; ?></td>
    </tr>
    <tr>
      <td class="table_label">潜在客户来源</td>
      <td class="edit_select" id="source"><?php echo $source; ?></td>
      <td class="table_label">有限期</td>
      <td class="datepicker" id="sdate"><?php echo $sdate; ?></td>
    </tr>
    <tr>
      <td class="table_label">职位</td>
      <td class="edit" id="job"><?php echo $job; ?></td>
      <td class="table_label">网站</td>
      <td class="edit" id="web"><?php echo $web; ?></td>
    </tr>
    <tr>
      <td class="table_label">创建时间</td>
      <td><?php echo $createtime; ?></td>
      <td class="table_label">修改时间</td>
      <td id="modifiedtime"><?php echo $modifiedtime; ?></td>
    </tr>
    <tr>
      <td class="table_label">备注</td>
      <td class="textarea" id="note" colspan="3"><?php echo $note; ?></td>
      </tr>
  </tbody>
</table>
<br />
<br />
<br />
<br />
<br />

</div>

</body>
</body>
</html>
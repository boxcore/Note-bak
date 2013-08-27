<?php
//字符串过滤函数 strip_tags() ,后面可带需要排除的html 标签
header("content-type:text/html; charset=utf8;");
$str="   ##   LAMP兄弟连<h2>高级讲师</h2>，LAMP比较高级的讲师之一，有五年互联网打闹经验，打通过三关互联网游戏，第一:网络技术，第二:linux服务器技术，第三:php开发技术，打通三关<b>后荣获</b>一玻璃杯，<h1>玻璃杯</h1>上赫然刻着几个英文字\"Red Hat Certified Architect\"，目前正在处于把自己打造成LNMP神级人物的道路上...  **   ";
$str .= "   ##   LAMP兄弟连技术总监，70后北漂老男孩，做过程序员，干过运维，跑过市场，当过讲师，LAMP兄弟连副校长，Linux 狂热分子，PHP技术推动者，致力于开源技术推广，坚信授之以鱼不如授之以渔，<br />曲径通幽天道酬勤。  ** ";

echo $str."<hr>";
$str3= strip_tags(trim($str),"<h1><br>");
echo $str3;

?>
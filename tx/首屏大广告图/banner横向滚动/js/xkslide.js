/*
 * 作者小凯，新手入门级
 * 小特效一枚，仅供玩笑
 * 特效介绍：
 * 	1.自动适应图片大小进行滚动
 * 	2.按钮随图片数量添加且居中对齐
 * 	3.鼠标划过暂停特效运行
 * 支持原创 关注JquerySchool
 * http://www.jq-school.com
 * QQ：77741887
 * 
 */
$(document).ready(function(){
	var speed=3000;//延时设定，默认设置3秒
	var imgsrc='images/dian.jpg';// 小按钮图片地址
	var imgsrc2='images/dian1.jpg';// 小按钮点击状态图片地址	
	var imgm = $(".bannerul li").length;//获取li数量
	var imgw = $(".bannerul img ").width();//获取图片宽度
	$(".bannerul").css({width:imgw*imgm});//设定ul容器宽度
	n=-1//全局参数n  自动循环时应用的参数
	for(i=0;i<imgm;i++){//循环li数量的按钮（需要修改图片地址请在这里修改）
		$(".bannerd").append('<img src="'+imgsrc+'" id='+i+' />');//在容器bannerd中循环出居中的按钮图片。（需要将按钮放到图片上的，请修改容器的css相对定位）
	}
	$(".bannerd img:eq(0)").attr({src: imgsrc2});//设定第一按钮为点击状态的按钮图片
	$(".bannerd img").click( function () {//点击按钮时跳转到相对应图片 且切换按钮图片
		 $(".bannerd img").attr({src: imgsrc});
		 $(this).attr({src: imgsrc2});
		 n=$(this).attr("id")
		 $(".bannerul").animate({left:-imgw*$(this).attr("id")});
		 
	});
	function bsi(){//设定自动播放函数
		if(n<imgm-1){//判定是否移动到最后一个图片
			n++;
			$(".bannerd img").attr({src: imgsrc});
			$(".bannerd img:eq("+n+")").attr({src: imgsrc2});
			$(".bannerul").animate({left:-imgw*n});						
		}
		else {//移动到最后一个时重置函数n再次循环			
			n=-1
			$(".bannerd img").attr({src: imgsrc});
			$(".bannerd img:eq(0)").attr({src: imgsrc2});
			$(".bannerul").animate({left:0});
		}
	}
	var Mysl =setInterval(bsi,speed)//自动播放
	$(".bannerul,.bannerd img").mouseover( function(){clearInterval(Mysl)})//鼠标划过时  停止自动播放
	$(".bannerul,.bannerd img").mouseout( function(){ Mysl =setInterval(bsi,speed)})//鼠标离开时  重置自动播放	
});
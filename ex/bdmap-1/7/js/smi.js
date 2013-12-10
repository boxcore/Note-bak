/* 通过className获取对象------------ */
function getClass(classname,obj){
	var aAll=obj.getElementsByTagName('*');
	var aClass=new Array();

	for(var i=0,l=aAll.length;i<l;i++){
		if(aAll[i].className.match(new RegExp("(^|\\s)"+classname+"(\\s|$)","i"))){
			aClass[aClass.length]=aAll[i];
		}
	}
	return aClass;
}

/* js去除html标签---------------- */
function removeTags(str) {
	str = str.replace(/<\/?[^>]*>/g,'');
	return str;
}

/* ajax------------------------- */
var aj=new Object();

aj.request=function(){

	if(window.XMLHttpRequest){
		var ajax=null;
			
		ajax=new XMLHttpRequest;

		return ajax;
	}else{
		var arr=['Microsoft.XMLHTTP', 'MSXML.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.7.0', 'Msxml2.XMLHTTP.6.0', 'Msxml2.XMLHTTP.5.0', 'Msxml2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP'];

		var ajax=null;

		for(i=0;i<arr.length;i++){
			try{
				ajax=new ActiveXObject(arr[i]);
				return ajax; 
			}catch(e){
				ajax=false;
			}
		}
	}
}

aj.re=aj.request();

aj.get=function(url,method){
	aj.re.open('get',url);
	if(method) aj.handler(method);
	aj.re.send(null);
}

aj.post=function(url,data,method){
	aj.re.open('post',url);
	if(method) aj.handler(method);
	aj.re.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	aj.re.send(data);
}

aj.handler=function(method){
	aj.re.onreadystatechange=function(){
		if(aj.re.readyState==4){
			if(aj.re.status==200){
				method(aj.re.responseText);
			}
		}
	}
}

/* move--------------------------- */
function startMove(obj, json, fnEnd){
	if(obj.timer){
		clearInterval(obj.timer);
	}
	obj.timer=setInterval(function (){
		doMove(obj, json, fnEnd);
	}, 30);
	
	var oDate=new Date();
	
	if(oDate.getTime()-obj.lastMove>30){
		doMove(obj, json, fnEnd);
	}
}

function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}
	else{
		return getComputedStyle(obj, false)[attr];
	}
}

function doMove(obj, json, fnEnd){
	var iCur=0;
	var attr='';
	var bStop=true;
	
	for(attr in json){
		if(attr=='opacity'){
			iCur=parseInt(100*parseFloat(getStyle(obj, 'opacity')));
		}
		else{
			iCur=parseInt(getStyle(obj, attr));
		}
		
		if(isNaN(iCur)){
			iCur=0;
		}
		
		var iSpeed=(json[attr]-iCur)/5;
		iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
		
		if(parseInt(json[attr])!=iCur){
			bStop=false;
		}
		
		if(attr=='opacity'){
			obj.style.filter="alpha(opacity:"+(iCur+iSpeed)+")";
			obj.style.opacity=(iCur+iSpeed)/100;
		}
		else{
			obj.style[attr]=iCur+iSpeed+'px';
		}
	}
	
	if(bStop){
		clearInterval(obj.timer);
		obj.timer=null;
		
		if(fnEnd){
			fnEnd();
		}
	}
	
	obj.lastMove=(new Date()).getTime();
}

/* 数据处理----------------------------------------------------------------------------------------- */

var oHead=document.getElementById("head");
var oContent=document.getElementById("content");
var oFooter=document.getElementById("footer");
var aSearchInput=oContent.getElementsByTagName("input");
var oBtn=getClass("btn",oContent)[0];
var oResult=getClass("result",oContent)[0];
var aTitLi=getClass("tit",oResult)[0].getElementsByTagName("li");
var oCon=getClass("con",oResult)[0];
var aConLi=oCon.getElementsByTagName("li");

//选择交通工具
var oMode=getClass("mode",oHead)[0];
var oModeImg=oMode.getElementsByTagName("img");
var aMode=["transit","driving","walking"];
var sCurMode="driving";
var oCity=getClass("city",oContent)[0];

for(var i=0; i<oModeImg.length; i++){
	oModeImg[i].index=i;
	oModeImg[i].onclick=function(){
		for(var j=0; j<oModeImg.length; j++){
			oModeImg[j].src="./images/mode_"+j+".jpg";
		}
		oModeImg[this.index].src="./images/mode_"+this.index+"_a.jpg";

		sCurMode=aMode[this.index];

		if(this.index==0){
			aTitLi[0].innerHTML="最少时间";
			aTitLi[1].innerHTML="最少换乘";
			aTitLi[2].innerHTML="不乘地铁";
			oCity.style.display="block";
		}else if(this.index==1){
			aTitLi[0].innerHTML="最少时间";
			aTitLi[1].innerHTML="最短距离";
			aTitLi[2].innerHTML="避开高速";
			oCity.style.display="none";
		}else if(this.index==2){
			aTitLi[0].innerHTML="方案一";
			aTitLi[1].innerHTML="方案二";
			aTitLi[2].innerHTML="方案三";
			oCity.style.display="none";
		}
	}
}

var oSpan=oCity.getElementsByTagName("span")[0];
oSpan.onmouseover=function(){
	oCity.style.color="#0bf";
	var oScript=document.createElement("script");
	oScript.type="text/javascript";
	oScript.src="./js/area.js";
	document.getElementsByTagName("head")[0].appendChild(oScript);
}
oSpan.onmouseout=function(){
	oCity.style.color="#444";
}

oSpan.onclick=function(){
	var aSpan=oCity.getElementsByTagName("span");
	if(aSpan.length==1){
		var oSel=document.createElement("span");
		oSel.style.display="inline-block";
		oSel.innerHTML="<select name=\"s_province\" id=\"s_province\"></select><select name=\"s_city\" id=\"s_city\"></select>";
		oCity.appendChild(oSel);
		_init_area();
	}else{
		if(aSpan[1].style.display=="none"){
			aSpan[1].style.display="inline-block";
		}else{
			aSpan[1].style.display="none";
		}
	}
}

//输入框第一次获取焦点时value值消失
var firstFocus_s=true;
var firstFocus_e=true;
aSearchInput[0].onfocus=function(){
	startMove(oResult,{"bottom":-204});
	if(aSearchInput[0].value=="出发地点"){
		aSearchInput[0].value="";
		firstFocus_s=false;
	}
}
aSearchInput[1].onfocus=function(){
	startMove(oResult,{"bottom":-204});
	if(aSearchInput[1].value=="目标地点"){
		aSearchInput[1].value="";
		firstFocus_e=false;
	}
}
//失去焦点时若为空则给默认值
aSearchInput[0].onblur=function(){
	if(!aSearchInput[0].value) aSearchInput[0].value=cityName || "出发地点";
}
aSearchInput[1].onblur=function(){
	if(!aSearchInput[1].value) aSearchInput[1].value="目标地点";
}

//出发地点,目标地点互换
var oExc=getClass("exc",oContent)[0];
var startPlace=aSearchInput[0].value;
var endPlace=aSearchInput[1].value;
oExc.onmouseover=function(){
	oExc.style.backgroundColor="#EEE";
}
oExc.onmouseout=function(){
	oExc.style.backgroundColor="#FFF";
}
oExc.onclick=function(){
	if(aSearchInput[0].value=="出发地点" || aSearchInput[1].value=="目标地点") return false;
	var stmp=aSearchInput[0].value;
	startMove(oResult,{"bottom":-204});
	startPlace=aSearchInput[1].value;
	aSearchInput[0].value=startPlace;
	endPlace=stmp;
	aSearchInput[1].value=endPlace;
}

//查询按钮
oBtn.onmouseover=function(){
	oBtn.style.backgroundImage="url('./images/search_a.png')";
	oBtn.innerHTML="出来吧";
}
oBtn.onmouseout=function(){
	oBtn.style.backgroundImage="url('./images/search.png')";
	oBtn.innerHTML="神龙";
}

//结果集选项卡
for(var i=0; i<aTitLi.length; i++){
	aTitLi[i].index=i;
	aConLi[i].index=i;
	aTitLi[i].onclick=function(){
		for(var j=0; j<aTitLi.length; j++){
			aTitLi[j].style.backgroundImage="url('./images/tit_"+(j+1)+".jpg')";
			aConLi[j].style.display="none";
		}
		aTitLi[this.index].style.backgroundImage="url('./images/tit_a.jpg')";
		aConLi[this.index].style.display="block";
	}
}

//下载城市选择弹出框
var aDown_li=oFooter.getElementsByTagName('li');
var oDown_c=oFooter.getElementsByTagName('select')[0];
var oDown_q=oFooter.getElementsByTagName('select')[1];
var oDown_a=aDown_li[2].getElementsByTagName('a')[0];
var bDown=true;
aDown_li[0].onmouseover=function(){
	this.style.color="#0bf";
}
aDown_li[0].onmouseout=function(){
	this.style.color="#444";
}
aDown_li[0].onclick=function(){
	if(bDown){
		bDown=false;
		aDown_li[1].style.display='block';
		aDown_li[2].style.display='block';
	}else{
		bDown=true;
		aDown_li[1].style.display='none';
		aDown_li[2].style.display='none';
	}
}

oDown_c.onchange=oDown_q.onchange=function(){
	oDown_a.href="./down.php?fn="+oDown_c.value+"_"+oDown_q.value;
}

/* 创建一个用于new地图的容器 */
var oSmi=document.createElement("div");
oSmi.id="smi";
document.body.appendChild(oSmi);

//创建一个地图实例
var map = new BMap.Map("smi");
map.centerAndZoom(new BMap.Point(116.404, 39.915), 12);

//获取当前城市
var cityName=null;
function myFun(result){
    cityName = result.name;
    map.setCenter(cityName);
    aSearchInput[0].value=cityName;
}
var myCity = new BMap.LocalCity();
myCity.get(myFun);

//点击查询
var transitPolicy=[BMAP_TRANSIT_POLICY_LEAST_TIME,BMAP_TRANSIT_POLICY_LEAST_TRANSFER,BMAP_TRANSIT_POLICY_AVOID_SUBWAYS];
var drivingPolicy=[BMAP_DRIVING_POLICY_LEAST_TIME,BMAP_DRIVING_POLICY_LEAST_DISTANCE,BMAP_DRIVING_POLICY_AVOID_HIGHWAYS];
oBtn.onclick=function(){
	//错误输入判断
	if(aSearchInput[0].value=="出发地点") return false;
	if(aSearchInput[1].value=="目标地点") return false;
	if(aSearchInput[0].value==aSearchInput[1].value) return false;

	startPlace=aSearchInput[0].value;
	endPlace=aSearchInput[1].value;

	//清空上次查询结果
	for(var i=0; i<aConLi.length; i++){
		aConLi[i].innerHTML="暂无";
	}

	//按策略执行查询函数
	for(var i=0; i<aTitLi.length; i++){
		switch(sCurMode){
			case "transit": TransitResult(i); break;
			case "driving": DrivingResult(i); break;
			case "walking": WalkingResult(); break;
		}	
	}

	//样式控制
	
	for(var j=0; j<aTitLi.length; j++){
		aTitLi[j].style.backgroundImage="url('./images/tit_"+(j+1)+".jpg')";
		aConLi[j].style.display="none";
	}
	aTitLi[0].style.backgroundImage="url('./images/tit_a.jpg')";
	aConLi[0].style.display="block";
	startMove(oResult,{"bottom":40});
}

//公交查询函数
function TransitResult(num){
	var sCity=null;
	try{
		var sOption=oCity.getElementsByTagName("select")[1].options[oCity.getElementsByTagName("select")[1].selectedIndex].innerHTML
		if(sOption!="地级市"){
			sCity=sOption;
		}else{
			sCity=cityName;
		}
	}catch(e){
		sCity=cityName;
	}
	var transit=new BMap.TransitRoute(sCity);
	transit.setPolicy(transitPolicy[num]);
	transit.setSearchCompleteCallback(function(results){
		if (transit.getStatus()==BMAP_STATUS_SUCCESS){
			var firstPlan=results.getPlan(0);
			var s=[];
			for (i =0; i<results.getNumPlans(); i++){
				s.push((i+1)+". "+"<em>["+results.getPlan(i).getDistance(true)+" / "+results.getPlan(i).getDuration(true)+"]</em> "+results.getPlan(i).getDescription());
			}
			aConLi[num].innerHTML=s.join('<br /><br />');
			// aj.post("http://lockey.duapp.com/do.php","data="+removeTags(s.join('@')));
		}
	});
	transit.search(startPlace, endPlace);
}

//自驾查询函数
function DrivingResult(num){
	var options={
		onSearchComplete:function(results){
			if (driving.getStatus()==BMAP_STATUS_SUCCESS){
				var plan=results.getPlan(0);
				var route=plan.getRoute(0);
				var s=[];
				for (var i=0; i<route.getNumSteps(); i++){
					var step=route.getStep(i);
					s.push((i+1)+". "+removeTags(step.getDescription()));
				}
				aConLi[num].innerHTML="<em>[全程: "+plan.getDistance(true)+" / "+plan.getDuration(true)+"]</em><br /><br />"+s.join('<br />');
				// aj.post("http://lockey.duapp.com/do.php","data="+removeTags(s.join('@')));
			}
		}
	}
	var driving=new BMap.DrivingRoute(map, options);
	driving.setPolicy(drivingPolicy[num]);
	driving.search(startPlace, endPlace);
}

//步行查询函数
function WalkingResult(){
	var options={
		onSearchComplete:function(results){
			if (walking.getStatus()==BMAP_STATUS_SUCCESS){
				var plan=results.getPlan(0);
				var route=plan.getRoute(0);
				var s=[];
				for (var i=0; i<route.getNumSteps(); i++){
					var step=route.getStep(i);
					s.push((i+1)+". "+removeTags(step.getDescription()));
				}
				aConLi[0].innerHTML="<em>[全程: "+plan.getDistance(true)+" / "+plan.getDuration(true)+"]</em><br /><br />"+s.join('<br />');
				// aj.post("http://lockey.duapp.com/do.php","data="+removeTags(s.join('@')));
			}
		}
	}
	var walking=new BMap.WalkingRoute(map, options);
	walking.search(startPlace, endPlace);
}
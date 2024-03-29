<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <style type="text/css">
        body, html,#allmap {width: 100%;height: 100%;overflow: hidden;margin:0;}
        #l-map{height:100%;width:78%;float:left;border-right:2px solid #bcbcbc;}
        #r-result{height:100%;width:20%;float:left;}
    </style>
    <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=2f18a21f61a57e50df7511a057da7002"></script>
    <title>自定义样式的数据接口</title>
</head>
<body>
<div id="l-map"></div>
<div id="r-result"></div>
</body>
</html>
<script type="text/javascript">

    // 百度地图API功能
    var map = new BMap.Map("l-map");            // 创建Map实例

    /* 初始化地图,设置中心点坐标和地图级别 */
    //map.centerAndZoom(new BMap.Point(116.404, 39.915), 13); //北京坐标，使用经纬度， 13为缩放级别，值越大，地区越小
    map.centerAndZoom(new BMap.Point(106.540,29.582),13); //搜索结果暂只能用经纬度来，文字不识别 重庆：106.540265,29.58243
    //map.centerAndZoom("重庆",13);                     //城市名称坐标， 使用城市名

    /* 获取经纬度 */
    map.addEventListener("click",function(e){
        console.log(e.point.lng + "," + e.point.lat);
    });

    //测试地址1 ： 106.502199,29.569435
//    var myopts = new Array();
//    myopts[0] = {
//        width : 200,     // 信息窗口宽度
//        height: 60,     // 信息窗口高度
//        title : "海底捞王府井店" , // 信息窗口标题
//        enableMessage:true,//设置允许信息窗发送短息
//        message:"亲耐滴，晚上一起吃个饭吧？戳下面的链接看下地址喔~"
//    };
//    map.openInfoWindow( (new BMap.InfoWindow("地址：北京市东城区王府井大街88号乐天银泰百货八层", myopts[0]) , new BMap.Point(116.417854,39.921988) ); //开启信息窗口


    map.addControl(new BMap.NavigationControl());  //添加默认缩放平移控件
    map.enableScrollWheelZoom(true); //滑轮放大缩小

    window.openInfoWinFuns = null;
    var options = {
        onSearchComplete: function(results){
            // 判断状态是否正确
            if (local.getStatus() == BMAP_STATUS_SUCCESS){
                var s = [];
                s.push('<div style="font-family: arial,sans-serif; border: 1px solid rgb(153, 153, 153); font-size: 12px;">');
                s.push('<div style="background: none repeat scroll 0% 0% rgb(255, 255, 255);">');
                s.push('<ol style="list-style: none outside none; padding: 0pt; margin: 0pt;">');
                openInfoWinFuns = [];
                for (var i = 0; i < results.getCurrentNumPois(); i ++){
                    var marker = addMarker(results.getPoi(i).point,i);
                    console.log(results.getPoi(i));
                    var openInfoWinFun = addInfoWindow(marker,results.getPoi(i),i);
                    openInfoWinFuns.push(openInfoWinFun);
                    // 默认打开第一标注的信息窗口
                    var selected = "";
                    if(i == 0){
                        selected = "background-color:#f0f0f0;";
                        openInfoWinFun();
                    }
                    s.push('<li id="list' + i + '" style="margin: 2px 0pt; padding: 0pt 5px 0pt 3px; cursor: pointer; overflow: hidden; line-height: 17px;' + selected + '" onclick="openInfoWinFuns[' + i + ']()">');
                    s.push('<span style="width:1px;background:url(red_labels.gif) 0 ' + ( 2 - i*20 ) + 'px no-repeat;padding-left:10px;margin-right:3px"> </span>');
                    s.push('<span style="color:#00c;text-decoration:underline">' + results.getPoi(i).title.replace(new RegExp(results.keyword,"g"),'<b>' + results.keyword + '</b>') + '</span>');
                    s.push('<span style="color:#666;"> - ' + results.getPoi(i).address + '</span>');
                    s.push('</li>');
                    s.push('');
                }
                s.push('</ol></div></div>');
                document.getElementById("r-result").innerHTML = s.join("");
            }
        }
    };

    // 添加标注
    function addMarker(point, index){
        var myIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25), {
            offset: new BMap.Size(10, 25),
            imageOffset: new BMap.Size(0, 0 - index * 25)
        });
        var marker = new BMap.Marker(point, {icon: myIcon});
        map.addOverlay(marker);
        return marker;
    }
    // 添加信息窗口
    function addInfoWindow(marker,poi,index){
        var maxLen = 10;
        var name = null;
        if(poi.type == BMAP_POI_TYPE_NORMAL){
            name = "地址：  "
        }else if(poi.type == BMAP_POI_TYPE_BUSSTOP){
            name = "公交：  "
        }else if(poi.type == BMAP_POI_TYPE_SUBSTOP){
            name = "地铁：  "
        }
        // infowindow的标题
        var infoWindowTitle = '<div style="font-weight:bold;color:#CE5521;font-size:14px">'+poi.title+'</div>';
        // infowindow的显示信息
        var infoWindowHtml = [];
        infoWindowHtml.push('<table cellspacing="0" style="table-layout:fixed;width:100%;font:12px arial,simsun,sans-serif"><tbody>');
        infoWindowHtml.push('<tr>');
        infoWindowHtml.push('<td style="vertical-align:top;line-height:16px;width:38px;white-space:nowrap;word-break:keep-all">' + name + '</td>');
        infoWindowHtml.push('<td style="vertical-align:top;line-height:16px">' + poi.address + ' </td>');
        infoWindowHtml.push('</tr>');
        infoWindowHtml.push('</tbody></table>');
        var infoWindow = new BMap.InfoWindow(infoWindowHtml.join(""),{title:infoWindowTitle,width:200});
        var openInfoWinFun = function(){
            marker.openInfoWindow(infoWindow);
            for(var cnt = 0; cnt < maxLen; cnt++){
                if(!document.getElementById("list" + cnt)){continue;}
                if(cnt == index){
                    document.getElementById("list" + cnt).style.backgroundColor = "#f0f0f0";
                }else{
                    document.getElementById("list" + cnt).style.backgroundColor = "#fff";
                }
            }
        }
        marker.addEventListener("click", openInfoWinFun);
        return openInfoWinFun;
    }

    var local = new BMap.LocalSearch(map, options);
    local.search("超市");

</script>

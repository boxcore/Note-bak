<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <title>批量反地址解析+商圈</title>
    <style type="text/css">
        body, html,#allmap {width: 100%;height: 100%;overflow: hidden;margin:0;font-size:13px;}
        #l-map{height:100%;width:78%;float:left;border-right:2px solid #bcbcbc;}
        #r-result{height:100%;width:20%;float:left;}
    </style>
    <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=2f18a21f61a57e50df7511a057da7002"></script>
</head>
<body>
<div id="l-map"></div>
<div id="r-result">
    <input type="button" value="批量反地址解析+商圈" onclick="bdGEO()" />
    <div id="result"></div>
</div>
</body>
</html>
<script type="text/javascript">

    // 百度地图API功能
    var map = new BMap.Map("l-map");
    map.centerAndZoom(new BMap.Point(116.328749,40.026922), 13);
    var index = 0;
    var myGeo = new BMap.Geocoder();
    var adds = [
        new BMap.Point(116.307852,40.057031),
        new BMap.Point(116.313082,40.047674),
        new BMap.Point(116.328749,40.026922),
        new BMap.Point(116.347571,39.988698),
        new BMap.Point(116.316163,39.997753),
        new BMap.Point(116.345867,39.998333),
        new BMap.Point(116.403472,39.999411),
        new BMap.Point(116.307901,40.05901)
    ];

    for(var i = 0; i<adds.length; i++){
        var marker = new BMap.Marker(adds[i]);
        map.addOverlay(marker);
    }


    function bdGEO(){
        var pt = adds[index];
        geocodeSearch(pt);
        index++;
    }
    function geocodeSearch(pt){
        if(index < adds.length){
            setTimeout(window.bdGEO,300);
        }
        myGeo.getLocation(pt, function(rs){
            var addComp = rs.addressComponents;
            document.getElementById("result").innerHTML += index + ". " +adds[index-1].lng + "," + adds[index-1].lat + "："  + "商圈(" + rs.business + ")  结构化数据(" + addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber + ")<br/><br/>";
        });
    }
</script>

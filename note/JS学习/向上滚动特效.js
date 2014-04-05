向上滚动特效：

html：
<div class="top5">
    <ul id="jump">
        <li style="height:50px; display: list-item;"><a id="top5" href="#top5"></a></li>
        <li style="height:50px"><a id="sina" rel="nofollow" href="" target="_blank"></a></li>
        <li style="height:50px"> <a id="ceping" rel="nofollow" href="" target="_blank"></a></li>
        <li style="height:50px"><a id="weixin" href="javascript:void(0)" onmouseover="showEWM()" onmouseout="hideEWM()">
                <div id="EWM" style="display: none;"><img src="http://www.jq-school.com/images/vsin.jpg?v=2.0.9.1" width="150" height="150" alt=""></div>
            </a></li>
        <li style="height:50px"><a id="reply" href="" target="_blank"></a></li>
        <script>
            function showEWM()
            {
                document.getElementById("EWM").style.display = 'block';
            }
            function hideEWM()
            {
                document.getElementById("EWM").style.display = 'none';
            }
        </script>
    </ul>
</div>


css：
/*左边浮动*/
#jump{position:fixed;top:200px;right:50px;width:40px;z-index:400;_position:absolute;_top:expression(documentElement.scrollTop + "px");}
#top5,#share,#reply,#sina,#ceping,#weixin{display:block;width:40px;height:42px;cursor:pointer;}
#top5{background:url(http://www.jq-school.com/images/top.png) repeat scroll 0% 0% transparent;}
#share{background:url(http://www.jq-school.com/images/share.png) repeat scroll 0% 0% transparent;}
#reply{background:url(http://www.jq-school.com/images/reply.png) repeat scroll 0% 0% transparent;}
#sina{background:url(http://www.jq-school.com/images/sina.png) repeat scroll 0% 0% transparent;}
#weixin{background:url(http://www.jq-school.com/images/weixin.png) repeat scroll 0% 0% transparent;}
#top5:hover{background:url(http://www.jq-school.com/images/toped.png) repeat scroll 0% 0% transparent;}
#share:hover{background:url(http://www.jq-school.com/images/shared.png) repeat scroll 0% 0% transparent;}
#reply:hover{background:url(http://www.jq-school.com/images/replyed.png) repeat scroll 0% 0% transparent;}
#sina:hover{background:url(http://www.jq-school.com/images/sinad.png) repeat scroll 0% 0% transparent;}
#weixin:hover{background:url(http://www.jq-school.com/images/weixind.png) repeat scroll 0% 0% transparent;}
#ceping{background:url(http://www.jq-school.com/images/ceping.png) repeat scroll 0% 0% transparent;}
#ceping:hover{background:url(http://www.jq-school.com/images/cepinged.png) repeat scroll 0% 0% transparent;}
.yjbys_sj { position:absolute; z-index:9999; top:150px; display:none;}
.yjbys_sj img{ border:1px solid #DDDDDD;}
#EWM{ position:absolute; right:42px; display:none;}
#EWM img{ width:150px; height:150px; border:2px solid #DDDDDD;}


js
$(function(){
    $("#top5").click(function() {
        $('body,html').animate({
                scrollTop: 0
            },
            500);
        return false;
    });
});


$(window).scroll(function(){
    if($(this).scrollTop() > 100){
        //$container.stop().animate({"top":afterheadHeight},speed*1.5);
        $('#jump li:eq(0)').fadeIn(500);
        $("#head").css({"background":"url(images/bg2.gif) repeat-x 0 0"});
        $("#logowraper").hide();

    } else if($(this).scrollTop() < 100) {
        //$container.stop().animate({"top":headHeight},speed*1.5);
        $('#jump li:eq(0)').fadeOut(500);
        $("#head").css({"background":"url(images/bg.gif) repeat-x 0 0"});
        $("#logowraper").show();
    };
});

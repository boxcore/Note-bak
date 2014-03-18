
// 回到顶部代码
function a(x,y){
    l = $('#main').offset().left;
    w = $('#main').width();
    $('#tbox').css('left',(l + w + x) + 'px');
    $('#tbox').css('bottom',y + 'px');
}//获取#tbox的div距浏览器底部和页面内容区域右侧的距离函数#main为页面的可视宽度
$(function() {  
    $(window).scroll(function(){
    t = $(document).scrollTop();
    if(t > 50){
        $('#gotop').fadeIn('slow');
    }else{
        $('#gotop').fadeOut('slow');
    }       
})   
    a(10,100);//#tbox的div距浏览器底部和页面内容区域右侧的距离
    $('#gotop').click(function(){ 
        $('body,html').animate({
            scrollTop: 0
        },
        800);//点击回到顶部按钮，缓懂回到顶部,数字越小越快
        return false;  
    })
});



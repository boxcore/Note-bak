//通过javascript来解决内容部分的奇偶行背景不同
/*
 $(document).ready(function(){

 });*/
//简化写法
$(function() {
    //找到表格的内容区域的奇数行,设定其样式
    $("tbody tr:even").css("background-color", "#ECE9D8");
    //找到所有学号的单元格
    var numTd = $("tbody td:even");
    //给这些单元格注册鼠标点击的事件。
    numTd.click(function() {
        //找到当前的td,this对应的就是相应可cilck的那个td
        var tdObj = $(this);
        if(tdObj.children("input").length()>0){
            //表示里面是有input的文本框，不执行click处理
            return false;
        }
        //取出当前td中的文本值
        var text = tdObj.html();
        //清空td中的内容
        tdObj.html("");
        //创建一个文本框
        //去掉文本框的边框
        //设置文本框的文字字体大小是16px
        //使文本框的宽度，和td宽度相同
        //设置文本框的背景色
        //需要将当前td中的内容，放到文本框中
        //将文本框插入到td中，
        var inputObj = $("<input type = 'text'>")
            .css("border-width", "0")
            .css("font-size", "16px")
            .width(tdObj.width())
            .css("background-color", tdObj.css("background-color"))
            .val(text)
            .appendTo(tdObj);
        //是文本框插入之后被选中
        inputObj.get(0).select();
        inputObj.click(function(){
            return false;
        });
        //处理文本框上回车和ESC按键的操作
        inputObj.keyup(function(event){
            //获取当前按键下的键值
            var keycode = event.which;
            //处理回车的情况
            if(keycode == 13){
                //获取当前文本框中的内容
                var inputtest = $(this).val();
                tdObj.html(inputtest);
            }
            //处理esc的情况
            if(keycode == 27){
                tdObj.html(text);
            }
        });
    });
});
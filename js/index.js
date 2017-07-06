/**
 * Created by PX on 2017/6/6.
 */


$(function () {
    $("#logImg").css("left",$(window).width()/2 - 75);
    $("form").css({
            "left":$(window).width()/2 - 135,
            "top":$(window).height()/2 + 40
    });
    $("#logImg").css({
        top:$(window).height()/2-75,
        transition:'all 1s linear 0.2s'
    });
    $("#logImg img").addClass("addRotate");
    $("#bigBox p").css({
        "top":$(window).height()/2-20,
        "left":$(window).width()/2-140
    });
    document.onkeydown = function(e){
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode == 13) {
            enterDesk();
        }
    }
});
//背景移动事件----repeat-x
// var offsetbg = 0;
// setInterval(function() {
//     offsetbg += 0.6;
//     $("#bgImg").css("background-position", -offsetbg + "px 0")
// }, 90 );

//登录界面头像logo点击事件
$("#logImg").click(function(){
    $(this).css("top",$(window).height()/2-180);
    $("#bigBox p").css({
        "opacity":"1",
        "transition":"all 0.5s linear"
    })
    $("form").css({
        "opacity":"1",
        "transition":"all 0.5s linear"
    })
})
//密码输入框聚焦时样式设置
$("form input:first").focus(function () {
    $(this).css("box-shadow","0 0 10px #f0cc1a");
})
//输入框验证,测试用的账号
$("form input:last").click(function () {
    enterDesk();
})

//登录验证函数
function enterDesk() {
    if(!$("form input:first").val()){
        $("#innerFonts").html("请输入登录密码！");
    }else if($("form input:first").val()!='123456'){
        $("#innerFonts").html("密码输入错误！");
    }else if($("form input:first").val()=='123456'){
        window.location.href = 'html/head.html'
    }
}

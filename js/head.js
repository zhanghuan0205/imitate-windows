/**
 * Created by PX on 2017/6/21.
 */
$(function () {
    $("#logPage").css({
        "width":$(window).outerWidth(),
        "height":$(window).outerHeight()
    });
    //禁止原有右键点击事件
    document.oncontextmenu = function(e){
        e.preventDefault();
    };
    var curUrl = window.location.href;
    localStorage.setItem("url",curUrl);
    time();
})
//动态请求桌面图标数据
$.getJSON("../data/data.json",function (str) {
    var deskImg ;
    for(let i in str){
        deskImg +=`<a href="#" target="_self">
                        <img src="${str[i].imgSrc}"> 
                        <p>${str[i].p}</p>
                    </a>`
        $("#litImg").html(deskImg);
    }
})
//给桌面图标设置点击事件，并请求数据获取相应的ifream的src属性
$.getJSON("../data/data.json",function (str) {
        $("#litImg a").click(function () {
            var idx = $("#litImg a").index($(this))
            $("iframe").attr("src",`${str[idx].ifreamSrc}`).css({
                "width":"100%",
                "height":"100%"
            });
            $("#litImg").hide();
        })
})
//桌面鼠标右键位置判断处理
$(document).mousedown(function(event){
    var curleft = event.offsetX;
    var curTop = event.offsetY;
    console.log(curTop);
    if(3 == event.which){
        if(curTop > 50){
            if(curTop < $("body").height()/2){
                if(curleft >= $("body").width() - 175){
                    $("#upInfo").css({
                        "display":"block",
                        "left":curleft - 175,
                        "top":curTop
                    });
                }else {
                    $("#upInfo").css({
                        "display":"block",
                        "left":curleft,
                        "top":curTop
                    });
                }
            }else if(curTop >= $("body").height()/2){
                if(curleft >= $("body").width() - 175){
                    $("#upInfo").css({
                        "display":"block",
                        "left":curleft - 175,
                        "top":curTop
                    });
                }else {
                    $("#upInfo").css({
                        "display":"block",
                        "left":curleft,
                        "top":curTop - 265
                    });
                }
            }
        }
        else {
            event.stopPropagation();
        }
        //鼠标左键点击关闭事件
    }else if(1 == event.which){
        $("#upInfo").css({
            "display":"none"
        });
    }
});

//右键菜单栏“更换壁纸”点击事件
$("#changeImg").off("mousedown").mousedown(function(e){
    e.stopPropagation();
    $("#changeImgs").show();
    fileUpload(e);
    $("#upInfo").fadeOut(500);
});
//更换壁纸事件
$("#chageBtn").click(function () {
    var getSrc = localStorage.getItem("src");
    $("#logPage").css("background","url("+getSrc+")").fadeIn(1000);
})
//图标变大
$("#fileMax").off("mousedown").mousedown(function(e){
    e.stopPropagation();
    $("#litImg a").css({
        "width":"100px",
        "height":"100px"
    });
    $("#litImg a p").css("font-size","18px");
    $("#upInfo").fadeOut(500);
});
//图标变中图标
$("#fileMid").off("mousedown").mousedown(function(e){
    e.stopPropagation();
    $("#litImg a").css({
        "width":"60px",
        "height":"60px"
    });
    $("#upInfo").fadeOut(500);
});
//图标变小图标
$("#fileMin").off("mousedown").mousedown(function(e){
    e.stopPropagation();
    $("#litImg a").css({
        "width":"40px",
        "height":"40px"
    })
    $("#litImg a p").css("font-size","12px");
    $("#upInfo").fadeOut(500);
});
//关闭系统
$("#closeSys").off("mousedown").mousedown(function(e){
    e.stopPropagation();
    window.location.href = '../index.html';
});

//点击关闭更换壁纸弹出框
$("#changeImgs span").click(function () {
    $(this).parent().fadeOut(500);
})

//右下角回到桌面事件
$("#rightImg").click(function () {
    var getUrl = localStorage.getItem("url");
    if(window.location.href != getUrl ){
        window.location.href = getUrl;
        window.location.reload();
    }
})
//动态获取当前时间
setInterval(time,1000);
// 定义时间函数
function time(){
    var time = new Date(),
        year = time.getFullYear(),
        mouth = time.getMonth() + 1,
        date = time.getDate(),
        hours = time.getHours(),
        minutes = time.getMinutes();
        if(minutes < 10){
            minutes = "0"+minutes;
        }
    $("#topTime").text(hours+":"+minutes);
    $("#bottTime").text(year + "/" +mouth+"/"+ date);
}
//文件上传
function fileUpload(e) {
    // IE兼容性处理
    e = e || window.event;
    // 获取目标文件
    var files = e.target.files;
    var output = [];
    // console.log(files[0]); // 查看文件对象
    for(var i = 0, f; f = files[i]; i++) {
        // 获取上传的图片名及图片大小列表
        output.push('<li><strong>' + f.name + '</strong>(' + f.type + ') - ' + f.size +' bytes</li>');
    }
    // 将获取到的图片信息显示出来
    // document.getElementById('lists').innerHTML = '<ul>' + output.join('') + '</ul>';
    // 如果上传的文件类型不为图片则给出提示，并中止操作
    if(!/image\/\w+/.test(files[0].type)){
        alert("请确保文件为图像类型");
        return false;
    }
    // 实例化文件读取对象
    var reader = new FileReader();
    // 将文件编码成Data URL（即用Base64来渲染图片的很长的那串代码）
    reader.readAsDataURL(files[0]);
    reader.onload = function(){
        // 这个结果就是base64图片码
        var res = this.result
        base64Img.innerHTML = '<img src="' + res + '">';
        // 将图片写入该标签
        // base64Img.innerHTML += res;
        localStorage.setItem("src",res);
        // console.log(res);
    }
}
if(window.File && window.FileList && window.FileReader && window.Blob) {
    // 监听文件上传表单元素从而触发“fileUpload”函数
    document.getElementById('files').addEventListener('change', fileUpload, false);
} else {
    alert('您的浏览器太古典，请鼠标右键切换浏览器模式或使用Chrome、Edge、FireFox等浏览器');
}
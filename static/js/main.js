/**
 * Created by youxiachai on 14-3-18.
 */
window.onload = function() {
    init();  //初始化
}

//初始化
function init() {

    //初始化图片上传
    var btnImg = document.getElementById("btnUploadImg");
    var img = document.getElementById("imgShow");
    var hidImgName = document.getElementById("hidImgName");

    g_AjxUploadImg(btnImg, img, hidImgName);
}


var g_AjxTempDir = "/";

//图片上传
function g_AjxUploadImg(btn, img, hidPut) {
    var button = btn, interval;
    new AjaxUpload(button, {
        action: '/',
        data: {},
        name: 'image',
        onSubmit: function(file, ext) {
            if (!(ext && /^(jpg|JPG|png|PNG|gif|GIF)$/.test(ext))) {
                alert("您上传的图片格式不对，请重新选择！");
                return false;
            }
        },
        onComplete: function(file, response) {
            flagValue = response;
            if (flagValue == "1") {
                alert("您上传的图片格式不对，请重新选择！");
            }
            else if (flagValue == "2") {
                alert("您上传的图片大于200K，请重新选择！");
            }
            else if (flagValue == "3") {
                alert("图片上传失败！");
            }
            else {
                hidPut.value = response;
                img.src = g_AjxTempDir + response;
            }
        }
    });
}

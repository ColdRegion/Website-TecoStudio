var showAlert = function(msg,modelType=0){
    jAlert(msg, ( typeof js_comm_alert_msgTip != "undefined" ? js_comm_alert_msgTip : "温馨提示"),null,modelType);
}
window.alert=showAlert;
window.counterTimer={};
$.alerts={
    verticalOffset:-75,
    horizontalOffset:0,
    repositionOnResize:true,
    overlayOpacity:0.5,
    overlayColor:'#fff',
    draggable:true,
    okButton: ( typeof js_comm_alert_okButton != "undefined" ? js_comm_alert_okButton : ' 确定 '),
    cancelButton: ( typeof js_comm_alert_cancelButton != "undefined" ? js_comm_alert_cancelButton : ' 取消 '),
    dialogClass:null
    ,alert:function(message,title,callback){
        if(title==null)title='Alert';
        if(callback){
            $.alerts._show(title,message,null,'confirm',function(result){
                if(callback)callback(result);
            });
        }else{
            $.alerts._show(title,message,null,'alert',function(result){
                if(callback)callback(result);
            });
        }
    }
    ,_show:function(title,msg,value,type,callback){
        $.alerts._hide();
        $.alerts._overlay('show');
        $("BODY").append('<div id="popup_container">'+'<h1 id="popup_title"></h1>'+'<div id="popup_content" >'+'<div id="popup_message"></div>'+'</div>'+'</div>');
        if($.alerts.dialogClass)$("#popup_container").addClass($.alerts.dialogClass);
        var pos=('undefined' == typeof(document.body.style.maxHeight))?'absolute':'fixed';
        $("#popup_container").css({
            //position:pos,zIndex:99999,padding:0,margin:0
        });
        $("#popup_title").text(title);
        $("#popup_content").addClass(type);
        $("#popup_message").text(msg);
        $("#popup_message").html($("#popup_message").text().replace(/\n/g,'<br />'));
        $("#popup_container").css({
            //minWidth:$("#popup_container").outerWidth(),maxWidth:$("#popup_container").outerWidth(),
            //minWidth:'290px',maxWidth:'290px',
        });
        $.alerts._reposition();
        $.alerts._maintainPosition(true);
        switch(type){
            case'alert':

                if(msg.indexOf('已经')>-1 || msg.indexOf('成功')>-1 || msg.indexOf('发送')>-1 || msg.indexOf('支持')>-1){
                    $("#popup_content").css('background','url(/exusers/images/170317/check.png) no-repeat 50% 20px');
                }else{
                    $("#popup_content").css('background','url(/exusers/images/170317/warning.png) no-repeat 50% 20px');
                }
                if(msg.indexOf('频繁发送')>-1){
                    $("#popup_content").css('background','url(/exusers/images/170317/warning.png) no-repeat 50% 20px');
                }
                $("#popup_content").css('background-size','60px');
                $("#popup_message").append('<div id="popup_panel"><input type="button" value="'+$.alerts.okButton+'" id="popup_ok" /></div>');
                $("#popup_ok").click(function(){
                    $.alerts._hide();
                    callback(true)
                });
                $("#popup_ok").focus().keypress(function(e){
                    if(e.keyCode==13||e.keyCode==27)$("#popup_ok").trigger('click')
                });
                break
            case'confirm':
                if(msg.indexOf('成功')>-1 || msg.indexOf('发送到')>-1){
                    $("#popup_content").css('background','url(/exusers/images/170317/check.png) no-repeat 50% 20px');
                    $("#popup_content").css('background-size','60px');
                }else{
                    $("#popup_content").css('background','url(/exusers/images/170317/warning.png) no-repeat 50% 20px');
                    $("#popup_content").css('background-size','60px');
                }
                $("#popup_message").append('<div id="popup_panel"><input type="button" value="'+$.alerts.okButton+'" id="popup_ok" /><input type="button" value="'+$.alerts.cancelButton+'" id="popup_cancel" /></div>');
                $("#popup_ok").click(function(){
                    $.alerts._hide();
                    callback(true)
                });
                $("#popup_cancel").click(function(){
                    $.alerts._hide();
                    callback(false)
                });
                $("#popup_ok").focus().keypress(function(e){
                    if(e.keyCode==13||e.keyCode==27)$("#popup_ok").trigger('click')
                });
                break
        };
        if($.alerts.draggable){
            try{
                $("#popup_container").draggable({
                    handle:$("#popup_title")
                });
                $("#popup_title").css({
                    cursor:'move'
                })
            }
            catch(e){}
        }
    }
    ,_canLogin:function(msg,title,type,isLogin){
        $.alerts._hide();
        $.alerts._overlay('show',1);
        $("BODY").append('<div id="popup_container">'+'<h1 id="popup_title"></h1>'+'<div id="popup_content" >'+'<div id="popup_message"></div>'+'</div>'+'</div>');
        if($.alerts.dialogClass)$("#popup_container").addClass($.alerts.dialogClass);
        var pos=('undefined' == typeof(document.body.style.maxHeight))?'absolute':'fixed';
        $("#popup_title").text(title);
        $("#popup_content").addClass(type);
        $("#popup_message").text(msg);
        $("#popup_message").html($("#popup_message").text().replace(/\n/g,'<br />'));
        $.alerts._reposition();
        $.alerts._maintainPosition(true);
        if(msg.indexOf('成功')>-1 || msg.indexOf('发送到')>-1){
            $("#popup_content").css('background','url(/exusers/images/170317/check.png) no-repeat 50% 20px');
            $("#popup_content").css('background-size','60px');
        }else{
            $("#popup_content").css('background','url(/exusers/images/170317/warning.png) no-repeat 50% 20px');
            $("#popup_content").css('background-size','60px');
        }
        var login_txt = typeof js_comm_alert_login != "undefined" ? js_comm_alert_login : '登录';
        var goreturn_txt = typeof js_comm_alert_goreturn != "undefined" ? js_comm_alert_goreturn : '返回';
        if(isLogin == 2) {
            $("#popup_message").append('<div id="popup_panel"><input type="button" value="'+goreturn_txt+'" id="popup_cancel" /></div>');
        }else{
            $("#popup_message").append('<div id="popup_panel"><input type="button" value="'+goreturn_txt+'" id="popup_cancel" /><a href="javascript:OnLogin();" id="popup_ok" style="line-height: 18px; margin-left: 10px; vertical-align: top;">'+login_txt+'</a></div>');
        }
        $("#popup_cancel").click(function(){
            history.back();
        });
        $("#popup_ok").focus().keypress(function(e){
            if(e.keyCode==13||e.keyCode==27)$("#popup_ok").trigger('click')
        });
        if($.alerts.draggable){
            try{
                $("#popup_container").draggable({
                    handle:$("#popup_title")
                });
                $("#popup_title").css({
                    cursor:'move'
                })
            }
            catch(e){}
        }
    }
    ,_hide:function(){
        $("#popup_container").remove();
        $.alerts._overlay('hide');
        $.alerts._maintainPosition(false)
    }
    ,_overlay:function(status,type){
        switch(status){
            case'show':$.alerts._overlay('hide');
                $("BODY").append('<div id="popup_overlay"></div>');
                if(type == 1) {
                    $("#popup_overlay").css({
                        position:'fixed',zIndex:99999,top:'0px',left:'0px',width:'100%',height:$(document).height(),background:'#fff',opacity:1
                    });
				}else{
                    $("#popup_overlay").css({
                        position:'absolute',zIndex:99998,top:'0px',left:'0px',width:'100%',height:$(document).height(),background:$.alerts.overlayColor,opacity:$.alerts.overlayOpacity
                    });
				}

                break;
            case'hide':$("#popup_overlay").remove();
                break
        }
    }
    ,_reposition:function(){
        var top=(($(window).height()/ 2) - ($("#popup_container").outerHeight() /2))+$.alerts.verticalOffset;
        var left=(($(window).width()/ 2) - ($("#popup_container").outerWidth() /2))+$.alerts.horizontalOffset;
        if(top<0)top=0;
        if(left<0)left=0;
        if('undefined' == typeof(document.body.style.maxHeight))top=top+$(window).scrollTop();
        $("#popup_container").css({
            //top:top+'px',left:left+'px'
            //top:'50px',left:left+'px'
        });
        $("#popup_overlay").height($(document).height())
    }
    ,_maintainPosition:function(status){
        if($.alerts.repositionOnResize){
            switch(status){
                case true:$(window).bind('resize',function(){
                    $.alerts._reposition()
                });
                    break;
                case false:$(window).unbind('resize');
                    break
            }
        }
    }
};
jAlert=function(message,title,callback,modelType){
    if(modelType) {
        $.alerts._canLogin(message,title,null,modelType)
    }else{
        $.alerts.alert(message,title,callback)
    }
}
$(function(){
	imgLazyloadLib();
	//代码创建一个遮罩层，用于做加载动画
	//setScroll();
	setEventListen();
})
$(window).on('load',function(){
	diyAutoHeight();
	imgLazyloadLib();
});
$(window).resize(function(){
	if(window.resizeTimeout)window.clearTimeout(window.resizeTimeout);
	window.resizeTimeout=setTimeout(function(){
		diyAutoHeight();
	},350);
});
function imgLazyloadLib(obj){
	if(obj){
		obj.lazyload({event:'scroll mouseover',effect: "fadeIn",threshold:0,failure_limit:80,skip_invisible:false,load:function(){
			var father=$(this).parents('.view').first();
			if(father.length>0){
				setTimeout(function(){diyAutoHeight(father);},500);
			}else{
				father=$(this).parents('.layout').first();
				if(father.length>0){
					setTimeout(function(){diyAutoHeight(father);},500);
				}
			}
		}});
	}else{
		$("img").lazyload({event:'scroll mouseover',effect: "fadeIn",threshold:0,failure_limit:80,skip_invisible:false,load:function(){
			var father=$(this).parents('.view').first();
			if(father.length>0){
				setTimeout(function(){diyAutoHeight(father);},500);
			}else{
				father=$(this).parents('.layout').first();
				if(father.length>0){
					setTimeout(function(){diyAutoHeight(father);},500);
				}
			}
		}});
	}
}
var scrollTime=300;
function setEventListen(){
	$(".ev_c_scrollTop").click(function(){
		//滚动到顶部
		//$("html").getNiceScroll().resize();
		//$("html").getNiceScroll(0).doScrollTop(0);
		$("html,body").stop().animate({scrollTop:"0px"},window.scrollTime);
	});
	$(".ev_c_scrollView").click(function(){
		//鼠标点击：滚动到模块位置
		var settings=settingsLib($(this));
		var viewid=settings.getSetting('eventSet.scrollView');
		if($("#"+viewid).length>0){
			//$("html").getNiceScroll().resize();
			//$("html").getNiceScroll(0).doScrollTop($("#"+viewid).offset().top);
			$("html,body").stop().animate({scrollTop:$("#"+viewid).offset().top+"px"},window.scrollTime);
		}
	});
	$(".ev_c_showView").click(function(){
		//鼠标点击：显示模块
		showEventView($(this));
	});
	$(".ev_c_hidView").click(function(){
		//鼠标点击：隐藏模块
		hidEventView($(this));
	});
	$(".ev_c_tabView").click(function(){
		//鼠标点击：显示与隐藏模块
		showHidEventView($(this));
	});
	$(".ev_m_tabView").hover(function(){
		//鼠标点击：显示与隐藏模块
		showHidEventView($(this));
	});
	$(".view").click(function(){
		$(this).children(".view_contents").addClass("diyCurTab");
		var settings=settingsLib($(this));
		var unitViewSet=settings.getSetting('unitViewSet');
		if(unitViewSet&&unitViewSet.length>0){
			for(key in unitViewSet){
				$("#"+unitViewSet[key]).children(".view_contents").removeClass("diyCurTab");
			}
		}
	});
}
function showHidEventView(obj){
	var settings=settingsLib(obj);
	var showViews=settings.getSetting('eventSet.showViews');
	var hidViews=settings.getSetting('eventSet.hidViews');
	if(!showViews)showViews=new Array();
	if(!hidViews)hidViews=new Array();
	var doubleKey=new Array();
	//获取重复值
	if(showViews.length>0){
		for(s_key in showViews){
			if(hidViews.length>0){
				for(h_key in hidViews){
					if(showViews[s_key]==hidViews[h_key]){
						doubleKey.push(showViews[s_key]);
					}
				}
			}
		}
	}
	//隐藏
	if(hidViews.length>0){
		for(key in hidViews){
			if($.inArray(hidViews[key],doubleKey)<0){
				$("#"+hidViews[key]).css({"display":"none"});
				diyAutoHeight($("#"+hidViews[key]));
			}
		}
	}
	//显示
	if(showViews.length>0){
		for(key in showViews){
			if($.inArray(showViews[key],doubleKey)<0){
				$("#"+showViews[key]).css({"display":"block"});
				diyAutoHeight($("#"+showViews[key]));
			}
		}
	}
	//双向显示
	if(doubleKey.length>0){
		for(key in doubleKey){
			if($("#"+doubleKey[key]).length>0){
				if($("#"+doubleKey[key]).is(":hidden")){
					$("#"+doubleKey[key]).css({"display":"block"});
					diyAutoHeight($("#"+doubleKey[key]));
				}else{
					$("#"+doubleKey[key]).css({"display":"none"});
					diyAutoHeight($("#"+doubleKey[key]));
				}
			}
		}
	}
}
function showEventView(obj){
	var settings=settingsLib(obj);
	var showViews=settings.getSetting('eventSet.showViews');
	if(!showViews)showViews=new Array();
	if(showViews.length>0){
		for(key in showViews){
			$("#"+showViews[key]).css({"display":"block"});
			diyAutoHeight($("#"+showViews[key]));
		}
	}
}
function hidEventView(obj){
	var settings=settingsLib(obj);
	var hidViews=settings.getSetting('eventSet.hidViews');
	if(!hidViews)hidViews=new Array();
	if(hidViews.length>0){
		for(key in hidViews){
			$("#"+hidViews[key]).css({"display":"none"});
			diyAutoHeight($("#"+hidViews[key]));
		}
	}
}
function getPageScrollTop(){
	var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
	return scrollTop;
}
function getNowPage(){
	var width=$(window).width();
	var max_width=window.DIY_PAGE_SIZE;
	max_width=parseFloat(max_width);
	if(isNaN(max_width))max_width=1200;
	if(width>=max_width){
		return 'pc';
	}else if(width>=640){
		return 'pad';
	}else{
		return 'mobile';
	}
}
$(window).scroll(function(){
    var scrollTop=getPageScrollTop();
    var nowPage=getNowPage();
    if($(".scrollToTop_"+nowPage).length>0){
    	$(".scrollToTop_"+nowPage).each(function(){
    		var old_top=$(this).attr("old_top_"+nowPage);
    		var old_left=$(this).attr("old_left_"+nowPage);
    		var old_width=$(this).attr("old_width_"+nowPage);
    		if(!old_top||old_top==""){
    			old_top=$(this).offset().top;
    			$(this).attr("old_top_"+nowPage,old_top);
    		}
    		if(!old_left||old_left==""){
    			old_left=$(this).offset().left;
    			$(this).attr("old_left_"+nowPage,old_left);
    		}
    		if(!old_width||old_width==""){
    			old_width=$(this).width();
    			$(this).attr("old_width_"+nowPage,old_width);
    		}
    		old_top=parseFloat(old_top);
    		old_left=parseFloat(old_left);
    		old_width=parseFloat(old_width);
    		if(scrollTop>=old_top){
    			$(this).css({"position":"fixed","z-index":9999999,"top":"0px","width":old_width+"px","left":old_left+"px"});
    			$(this).parents(".view").css({"z-index":9999999});
    			//$(this).parents(".view").children(".view_contents").css({"overflow":"visible"});
    			$(this).parents(".layout").css({"z-index":9999999});
    			//$(this).parents(".layout").children(".view_contents").css({"overflow":"visible"});
    			// 通过设置边距，清除悬浮对下一个元素的影响
                        if ($(this).hasClass('layout')) {
                            $(this).next().css('margin-top', (Number($(this).css('margin-top').replace('px', '')) + $(this).height()) + 'px');
                        }
    		}else{
    			$(this).css({"position":"","z-index":"","top":"","width":"","left":""});
    			$(this).parents(".view").css({"z-index":""});
    			//$(this).parents(".view").children(".view_contents").css({"overflow":""});
    			$(this).parents(".layout").css({"z-index":""});
    			//$(this).parents(".layout").children(".view_contents").css({"overflow":""});
    			$(this).attr("old_top_"+nowPage,null);
    			$(this).attr("old_left_"+nowPage,null);
    			$(this).attr("old_width_"+nowPage,null);
    			// 通过设置边距，清除悬浮对下一个元素的影响
                        if ($(this).hasClass('layout')) {
                            $(this).next().css('margin-top', '');
                        }
    		}
    	});
    }
});
function diyAutoHeight(obj){
	if(obj&&obj.length>0){
		//针对选项卡做特殊处理
		if(obj.children(".view_contents").children("form").length>0){
			if(obj.children(".view_contents").children("form").children(".view").length>0){
				obj.children(".view_contents").children("form").children(".view").each(function(){
					if($(this).is(":visible")){
						diyAutoHeightDo($(this));
						return false;
					}
				});
			}else{
				diyAutoHeightDo(obj);
			}
		}else if(obj.children(".view_contents").children(".niceTab").find(".niceTabShow").length>0){
			if(obj.children(".view_contents").children(".niceTab").find(".niceTabShow").children(".view").length>0){
				obj.children(".view_contents").children(".niceTab").find(".niceTabShow").children(".view").each(function(){
					if($(this).is(":visible")){
						diyAutoHeightDo($(this));
						return false;
					}
				});
			}else{
				diyAutoHeightDo(obj);
			}
		}else{
			diyAutoHeightDo(obj);
		}
	}else{
		setTimeout(function(){
			$(".view").each(function(){
				if(!$(this).hasClass("includeBlock")){
					diyAutoHeightDo($(this));
				}
			});
		},500);
	}
}
function diyAutoHeightFatherDo(father,obj){
	var settings=settingsLib(father);
	var autoHeight=settings.getSetting('autoHeight');
	if(autoHeight&&autoHeight=="true"){
		//开启了允许自动高度
		var minHeight=obj.offset().top+obj.height()-father.offset().top;
		if(obj.siblings(".view").length>0){
			obj.siblings(".view").each(function(){
				if($(this).is(":visible")){
					var tempHeight=$(this).offset().top+$(this).height()-father.offset().top;
					if(tempHeight>minHeight){
						minHeight=tempHeight;
					}
				}
			});
		}
		//2019-5-20  选项卡添加选项高度计算
		var kind=settings.getSetting('kind');
		var name=settings.getSetting('name');
		var data=settings.getSetting('data');
		if (kind=="选项卡" && name=="tab") {
			var tab_nav_obj = father.children().children().children().eq(0);
			var tab_nav_height = tab_nav_obj.css('height');
			if ( tab_nav_height != undefined && tab_nav_height != undefined && data.showtype == "bottom") {
				minHeight = parseFloat(tab_nav_height) + Number(minHeight);
			}
		}
		father.css({"height":minHeight+"px"});
		diyAutoHeightDo(father);
	}
}
function diyAutoHeightDo(obj){
	if(obj.is(":visible")){
		var father=obj.parents(".view").first();
		if(father.length<=0)father=obj.parents(".layout").first();
		if(father.length>0){
			var settings=settingsLib(father);
			var autoHeight=settings.getSetting('autoHeight');
			if(autoHeight&&autoHeight=="true"){
				if(father.offset().top+father.height()<obj.offset().top+obj.height()){
					father.css({"height":(obj.offset().top+obj.height()-father.offset().top)+"px"});
					diyAutoHeightDo(father);
				}else{
					diyAutoHeightFatherDo(father,obj);
				}
			}
		}
	}
}
function setScroll(){
	if(typeof($("html").niceScroll)=="function"){
		$("html").niceScroll({zindex:99999,cursoropacitymax:0.8,cursoropacitymin:0.3,horizrailenabled:false,mousescrollstep:60,smoothscroll:true});	
	}else{
		setTimeout(setScroll,500);
	}
}
var settingsLib=function(view){
	var main={
		view:null,
		setup:function(obj){
			if(window.viewsSettings&&window.viewsSettings[obj.attr("id")]){
				this.init(window.viewsSettings[obj.attr("id")]);
				this.view=obj;
			}else{
				this.init({});
			}
		},
		init:function(obj){
			if(typeof(obj)=='object'){
				this.settings=obj;
			}else if(obj!="" && typeof obj == 'string'){
				eval('if(typeof('+obj+')=="object"){this.settings='+obj+';}else{this.settings={};}');
			}else{
				this.settings={};
			}
		},
		setSetting:function(k,v){
			if(!this.settings){
				this.settings={};	
			}
			var keyArray=k.split(".");
      		var val='this.settings';
			for (key in keyArray){
				if(keyArray[key]&&keyArray[key]!=''){
					if(eval(val+'["'+keyArray[key]+'"]')){
						val=val+'["'+keyArray[key]+'"]';
					}else{
						eval(val+'["'+keyArray[key]+'"]={}');
						val=val+'["'+keyArray[key]+'"]';
					}
				}
			}
			if(v==null){
				eval("delete "+val);		
			}else{
				eval(val+"=v");
			}
		},
		getSetting:function(key){
			if(!this.settings){
				this.settings={};	
			}
			if(key){
				var keyArray=key.split(".");
				var val='this.settings';
				for (key in keyArray){
					if(keyArray[key]&&keyArray[key]!=''){
						if(eval(val+'["'+keyArray[key]+'"]')){
							val=val+'["'+keyArray[key]+'"]';
							continue;
						}else{
							val=null;
							break;
						}
					}
				}
				return eval(val);
			}else{
				return this.settings;	
			}
		},
		saveSettings:function(obj){
			if(typeof(obj)=="object"&&this.settings&&obj.hasClass("view")){
				window.viewsSettings[obj.attr("id")]=this.settings;
			}else if(this.view&&typeof(this.view)=="object"&&this.settings&&this.view.hasClass("view")){
				window.viewsSettings[this.view.attr("id")]=this.settings;
			}
		}
	};
	if(view){
		main.view=view;
		main.setup(view);	
	}
	return main;
}

function GetUrlPara(){
	var url = document.location.toString();
	var arrUrl = url.split("?");
	var paras='';
	if(arrUrl.length>1){
		var para = arrUrl[1];
		var arrUrl2=para.split("&");
		arrUrl2.forEach(function(e){
			if(e.indexOf("mod=")>=0||e.indexOf("act=")>=0||e.indexOf("#")>=0){
				 return;  
			}else{
				paras+=e+"&";
			}
		})
	}
	return paras;
}
//RequestURL for signle
function RequestURL_old(viewid, sys_url, moreParams){
	var serverUrl = '//'+DIY_JS_SERVER+'/sysTools.php?mod=viewsConn&rtype=json&idweb='+DIY_WEBSITE_ID+'&'+sys_url;
	var settings = settingsLib($("#"+viewid));
	var params = "";
	if(settings && settings.getSetting("data") && viewid.indexOf('download') == -1 ){
		$.each(settings.getSetting("data"), function(key, val){
			if($.isArray(val)){
				$.each(val, function(key2, val2){
					params += "&"+key+"[]="+val2;
				});
			}else{
				params += "&"+key+"="+val;
			}
		});
		if(params) serverUrl += params;
	}
	var params2 = GetUrlPara();
	if(params2) serverUrl += "&" + params2;
	if(moreParams) serverUrl += "&" + moreParams;
	var scriptString = "<scr"+"ipt type='text/javascript' src="+serverUrl+"></scr"+"ipt>";
	//$.ajaxSettings.async = false; 
	$.ajax({
	  dataType: 'jsonp',
	  crossDomain: true, 
	  url: serverUrl,
	  xhrFields:{withCredentials:true},
	  success: function(result){
		if(result.error) alert(result.error);
		else{
			if(typeof(history.replaceState) != 'undefined'){
				var obj={};
				var hstate=JSON.stringify(history.state);
				if(hstate!='null'&& hstate!=null){
					eval('var hjson = ' + hstate);
					obj=hjson;
				}
				var key="moreParams"+viewid;
				obj[key]=moreParams;
				//var strparam=viewid+":"+moreParams;
				//history.replaceState({("moreParams"+viewid):moreParams},"","");
				history.replaceState(obj,"","");
			}
			$("#"+viewid).children(".view_contents").html(result.html);
			$("#"+viewid).children(".view_contents").show();
			setTimeout(function(){
				diyAutoHeight($("#"+viewid));
			},500);
		}
	}});
	setTimeout(function(){commDefault_isFT();},500);
	function commDefault_isFT(){
		var based_Obj= document.getElementById("based");
		var currentlang_Obj= document.getElementById("currentlang");//当前语言
		$(function(){
			if (based_Obj){
				var JF_cn="ft"+self.location.hostname.toString().replace(/\./g,"");
				switch( Request('chlang') ){
					case "cn-tw":
						BodyIsFt= getCookie(JF_cn)=="1"? 0 : 1;
						delCookie(JF_cn);
						SetCookie(JF_cn, BodyIsFt, 7);
						break; 
					case "cn":
					case "en": 
						BodyIsFt= 0; 
						delCookie(JF_cn);
						SetCookie(JF_cn, 0, 7);
						currentlang_Obj.innerHTML = "简体中文";
						break;
					case "tw": 
						BodyIsFt= 1; 
						delCookie(JF_cn);
						SetCookie(JF_cn, 1, 7);
						currentlang_Obj.innerHTML = "繁體中文"; //因为是繁体 你写简体也会被转化成繁体  所以这儿只能写繁体 2015-1-16
						break;
					default: 
						if (typeof Default_isFT!='undefined' && Default_isFT){ //如果默认繁体
							if(getCookie(JF_cn)==null){
								BodyIsFt= 1;
								SetCookie(JF_cn, 1, 7);
								break;
							}
						}
						BodyIsFt= parseInt(getCookie(JF_cn));
				}	
				if(BodyIsFt===1){
					StranBody();
					document.title = StranText(document.title);
				}else{
					StranBodyce();
					document.title = StranTextce(document.title);
				}
			}else{
				var JF_cn="ft"+self.location.hostname.toString().replace(/\./g,"");
				if(Default_isFT){
					BodyIsFt= 1; 
					delCookie(JF_cn);
					SetCookie(JF_cn, 1, 7);
					StranBody();
					document.title = StranText(document.title);
				}else{
					BodyIsFt= 0; 
					delCookie(JF_cn);
					SetCookie(JF_cn, 0, 7);
					/*StranBodyce();
					document.title = StranTextce(document.title);*/
				}
			}
			
		});
	}
	/*
	$.getJSON(serverUrl, function(result){
		if(result.error) alert(result.error);
		else{
			$("#"+viewid).children(".view_contents").html(result.html);
			$("#"+viewid).show();
			setTimeout(function(){
				diyAutoHeight($("#"+viewid));
			},500);
		}
	});*/
	//$("#"+viewid).append(scriptString);
}
function RequestURL(viewid, sys_url, moreParams){ 
	if(checkLoad==1){
		RequestURL_old(viewid, sys_url, moreParams);
		return;
	}
	//这是原本的URL
	var serverUrl = '/sysTools.php?&mod=viewsConn&rtype=json&idweb='+DIY_WEBSITE_ID+'&'+sys_url;
	var settings = settingsLib($("#"+viewid));
	var params = "";
	if(settings && settings.getSetting("data")){
		$.each(settings.getSetting("data"), function(key, val){
			if($.isArray(val)){
				$.each(val, function(key2, val2){
					params += "&"+key+"[]="+val2;
				});
			}else{
				params += "&"+key+"="+val;
			}
		});
		if(params) serverUrl += params;
	}
	var params2 = GetUrlPara();
	if(params2) serverUrl += "&" + params2;
	if(moreParams) serverUrl += "&" + moreParams;
	batchArr.push(serverUrl);

}
function sendBatch(sendurl){
	if(!sendurl) return;
	//10次分割
	var newArr = [];
	newArr = sliceArray(sendurl,10);
	//对url进行组装
	var serverUrl = 'https://'+DIY_JS_SERVER+'/sysTools.php?mod=viewsConn&act=batch&idweb='+DIY_WEBSITE_ID+'&';
	for(var i in newArr){
		var data = {};
		data.postUrl = newArr[i];
		//获取数据 xhrFields解决传输cookie问题
		$.ajax({
		  type: "post",
		  cache: false,
		  dataType: "json", 
		  async:true,
	      data:data ,
		  url: serverUrl,
		  xhrFields: {
            withCredentials: true
          },
          crossDomain: true,
		  success: function(result){
		  	//var result = eval("("+result+")");
			if(result.error) {
				alert(result.error);
				//详情的判断
				if (result.data.pageType == 1){
                    setTimeout(function (){window.history.back()},2000)
				}
			} else{
				for(var i in result){//i就是viewid
					$("#"+i).children(".view_contents").html(result[i]['html']);
					$("#"+i).children(".view_contents").show();
					setTimeout(function(){
						diyAutoHeight($("#"+i));
					},500);	
				}
			}
		}});
	}
	setTimeout(function(){commDefault_isFT();},500);
	checkLoad = 1;
}

/*
 * 将一个数组分成几个同等长度的数组
 * array[分割的原数组]
 * size[每个子数组的长度]
 */
 function sliceArray(array, size) {
    var result = [];
    for (var x = 0; x < Math.ceil(array.length / size); x++) {
        var start = x * size;
        var end = start + size;
        result.push(array.slice(start, end));
    }
    return result;
}
//导航公共监听函数
function setDhListen(style,obj,params){
	var father=$(obj).parents(".dh").first();
	if(father.length>0){
		switch(style){
			case 'style_01':
				father.find(".miniMenu").toggleClass("Mslide");
                father.find(".miniMenu").toggleClass("dhAreaSet");
	            if($("body").css("position")=="relative"){
	                $("body").css({"position":"fixed","width":"100%"});
	            }else{
	                $("body").css({"position":"relative","width":"100%"});
	            }
				break;
			case 'style_02':
				if(params=="open"){
					father.find(".Style_02_miniMenu .menuMain").css("display","block");
				}else{
					father.find(".Style_02_miniMenu .menuMain").css("display","none");
				}
				break;
			case 'style_03':
				if(params=="mobi_more"){
					$(obj).parent().siblings(".mobi_menuUl02").toggle();
				}else if(params=="m_icoFont"){
					$(obj).parents(".mobi_main").hide();
				}else if(params=="mobi_top"){
					$(obj).siblings(".mobi_main").show();
				}
				break;
			case 'style_04':
				var width = $(window).width();
                var newW = width+18;
                father.find(".newWidth").css("width",newW);
                father.find(".miniMenu").toggleClass("Mslide");
                if($("body").css("position")=="relative"){
                    $("body").css({"position":"fixed","width":"100%"});
                }else{
                    $("body").css({"position":"relative","width":"100%"});
                }
				break;
			case 'type05':
						father.find(".mobileCon").show();
						father.find(".mobileCon").animate({left:'0'},600,function(){
							father.find(".mobileIcon").hide();
						})
						if($("body").css("position")=="relative"){
								$("body").css({"position":"fixed","width":"100%"});
						}else{
								$("body").css({"position":"relative","width":"100%"});
						}
				break;
			case 'type06':
						father.find(".mobileCon").animate({left:'-100%'},600,function(){
							father.find(".mobileCon").hide();
							father.find(".mobileIcon").show();
						});
						if($("body").css("position")=="relative"){
								$("body").css({"position":"fixed","width":"100%"});
						}else{
								$("body").css({"position":"relative","width":"100%"});
						}
				break;
		}
	}
}
//-------------选项卡-----------------------------------------------
//鼠标左右拖拽事件
function setScroll_Choice(tabId){
	if(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) return;
	if(typeof($(".tab_nav .tab_scroll", $("#"+tabId)).niceScroll)=="function"){
		$(".tab_nav .tab_scroll", $("#"+tabId)).niceScroll({zIndex:99999,cursoropacitymax:0,cursoropacitymin:0,horizrailenabled:true,autohidemode:true,touchbehavior:true});
	}else{
		setTimeout(setScroll_Choice,500);
	}
}

/*鼠标悬浮效果*/
function setHover_Choice(tabId){
	$(".tab_nav .tab_li", $("#"+tabId)).unbind('hover');
	$(".tab_nav .tab_li", $("#"+tabId)).hover(function(){
		var index = $(this).index();
		$(this).addClass("tabCurItem").siblings().removeClass("tabCurItem");
		$(".tab_box .tab_div", $("#"+tabId)).eq(index).addClass("niceTabShow").siblings().removeClass("niceTabShow");
		diyAutoHeight($("#"+tabId.substr(4)));
	});
}
/*鼠标点击效果*/
function setClick_Choice(tabId){
	$(".tab_nav .tab_li", $("#"+tabId)).unbind('click');
	$(".tab_nav .tab_li", $("#"+tabId)).click(function(){
		var index = $(this).index();
		$(this).addClass("tabCurItem").siblings().removeClass("tabCurItem");
		$(".tab_box .tab_div", $("#"+tabId)).eq(index).addClass("niceTabShow").siblings().removeClass("niceTabShow");
		diyAutoHeight($("#"+tabId.substr(4)));
	});
}
/*自动播放*/
function setAnimat_int(tabId,time){
	if(!time)time=5;
	time=time*1000;
	var viewid=tabId.substr(4);

	if(!window.tabConfigAnimat)window.tabConfigAnimat={};
	//初始化
	window.tabConfigAnimat[viewid]=setTimeout(doAnimat,time);

	$("#"+viewid).mousemove(function(){
		if(window.tabConfigAnimat[viewid])window.clearTimeout(window.tabConfigAnimat[viewid]);
	});
	$("#"+viewid).mouseover(function(){
		if(window.tabConfigAnimat[viewid])window.clearTimeout(window.tabConfigAnimat[viewid]);
	});
	$("#"+viewid).mouseout(function(){
		window.tabConfigAnimat[viewid]=setTimeout(doAnimat,time);
	});

	function doAnimat(){
		if(window.tabConfigAnimat[viewid])window.clearTimeout(window.tabConfigAnimat[viewid]);
		var index=$(".tab_nav .tabCurItem", $("#"+tabId)).index();
		index=index+1;
		if(index>=$(".tab_nav .tab_li", $("#"+tabId)).length){
			index=0;
		}
		$(".tab_nav .tab_li", $("#"+tabId)).eq(index).addClass("tabCurItem").siblings().removeClass("tabCurItem");
		$(".tab_box .tab_div", $("#"+tabId)).eq(index).addClass("niceTabShow").siblings().removeClass("niceTabShow");
		diyAutoHeight($("#"+tabId.substr(4)));
		window.tabConfigAnimat[viewid]=setTimeout(doAnimat,time);
	}
}
//获取鼠标拖拽区域的总宽度
function tab_style03_init(tabId){
	var total=0;
	var obj=$(".tab_li", $("#"+tabId));
	$(".tab_li", $("#"+tabId)).each(function(){
		total+=$(this).width();
	});
	$(".tab_ul_top", $("#"+tabId)).css("width",total+"px");
	$(".tab_ul_bottom", $("#"+tabId)).css("width",total+"px");

	//向左滚动图标事件
	$(".tab_left_arrow", $("#"+tabId)).unbind('click');
	$(".tab_left_arrow", $("#"+tabId)).click(function(){
		var index = $(".tab_nav .tabCurItem", $("#"+tabId)).index();
		index = index-1;
		$(".tab_nav .tab_li", $("#"+tabId)).eq(index).addClass("tabCurItem").siblings().removeClass("tabCurItem");
		$(".tab_box .tab_div", $("#"+tabId)).eq(index).addClass("niceTabShow").siblings().removeClass("niceTabShow");
        diyAutoHeight($("#"+tabId.substr(4)));
	});

	//向右滚动图标事件
	$(".tab_right_arrow", $("#"+tabId)).unbind('click');
	$(".tab_right_arrow", $("#"+tabId)).click(function(){
		var index = $(".tab_nav .tabCurItem", $("#"+tabId)).index();
		var len = $(".tab_nav .tab_li").length;
		index = index+1;
		if(index >= len){
			index = 0;
		}
		$(".tab_nav .tab_li", $("#"+tabId)).eq(index).addClass("tabCurItem").siblings().removeClass("tabCurItem");
		$(".tab_box .tab_div", $("#"+tabId)).eq(index).addClass("niceTabShow").siblings().removeClass("niceTabShow");
        diyAutoHeight($("#"+tabId.substr(4)));
	});
	setScroll_Choice(tabId);
}
function StranBody(fobj){
	var obj= fobj ? fobj.childNodes : document.body.childNodes;
	for(var i=0;i<obj.length;i++){
		var OO=obj.item(i);
		if("||BR|HR|TEXTAREA|".indexOf("|"+OO.tagName+"|")>0||OO==based_Obj)continue;
		if(OO.title!=""&&OO.title!=null)OO.title=StranText(OO.title);
		if(OO.alt!=""&&OO.alt!=null)OO.alt=StranText(OO.alt);
		if(OO.tagName=="INPUT"&&OO.value!=""&&OO.type!="text"&&OO.type!="hidden")OO.value=StranText(OO.value);
		if(OO.nodeType==3){OO.data=StranText(OO.data)}
		else StranBody(OO)
	}
	
	try{
		var based_Obj2= document.getElementById("based2");
		if(!based_Obj2) { //简繁
			based_Obj.innerHTML = BodyIsFt==1? "简体中文":"繁体中文";
		}else{ //简繁英
			based_Obj.innerHTML = "繁体中文";
			based_Obj2.innerHTML = "简体中文";
		}
	}catch(e){}
}
function StranBodyce(fobj){
	var obj= fobj ? fobj.childNodes : document.body.childNodes;
	for(var i=0;i<obj.length;i++){
		var OO=obj.item(i);
		if("||BR|HR|TEXTAREA|".indexOf("|"+OO.tagName+"|")>0||OO==based_Obj)continue;
		if(OO.title!=""&&OO.title!=null)OO.title=StranTextce(OO.title);
		if(OO.alt!=""&&OO.alt!=null)OO.alt=StranTextce(OO.alt);
		if(OO.tagName=="INPUT"&&OO.value!=""&&OO.type!="text"&&OO.type!="hidden")OO.value=StranTextce(OO.value);
		if(OO.nodeType==3){OO.data=StranTextce(OO.data)}
		else StranBodyce(OO)
	}
	try{
		var based_Obj2= document.getElementById("based2");
		if(!based_Obj2) { //简繁
			based_Obj.innerHTML = BodyIsFt==1? "简体中文":"繁体中文";
		}else{ //简繁英
			based_Obj.innerHTML = "繁体中文";
			based_Obj2.innerHTML = "简体中文";
		}
	}catch(e){}
}
function StranText(txt){
	if(txt==""||txt==null)return "";
	return Traditionalized(txt);
}
function StranTextce(txt){
	if(txt==""||txt==null)return "";
	return Traditionalizedce(txt);
}
function JTPYStr(){
	return '皑蔼碍爱翱袄奥坝罢摆败颁办绊帮绑镑谤剥饱宝报鲍辈贝钡狈备惫绷笔毕毙闭边编贬变辩辫鳖瘪濒滨宾摈饼拨钵铂驳卜补参蚕残惭惨灿苍舱仓沧厕侧册测层诧搀掺蝉馋谗缠铲产阐颤场尝长偿肠厂畅钞车彻尘陈衬撑称惩诚骋痴迟驰耻齿炽冲虫宠畴踌筹绸丑橱厨锄雏础储触处传疮闯创锤纯绰辞词赐聪葱囱从丛凑窜错达带贷担单郸掸胆惮诞弹当挡党荡档捣岛祷导盗灯邓敌涤递缔点垫电淀钓调迭谍叠钉顶锭订东动栋冻斗犊独读赌镀锻断缎兑队对吨顿钝夺鹅额讹恶饿儿尔饵贰发罚阀珐矾钒烦范贩饭访纺飞废费纷坟奋愤粪丰枫锋风疯冯缝讽凤肤辐抚辅赋复负讣妇缚该钙盖干赶秆赣冈刚钢纲岗皋镐搁鸽阁铬个给龚宫巩贡钩沟构购够蛊顾剐关观馆惯贯广规硅归龟闺轨诡柜贵刽辊滚锅国过骇韩汉阂鹤贺横轰鸿红后壶护沪户哗华画划话怀坏欢环还缓换唤痪焕涣黄谎挥辉毁贿秽会烩汇讳诲绘荤浑伙获货祸击机积饥讥鸡绩缉极辑级挤几蓟剂济计记际继纪夹荚颊贾钾价驾歼监坚笺间艰缄茧检碱硷拣捡简俭减荐槛鉴践贱见键舰剑饯渐溅涧浆蒋桨奖讲酱胶浇骄娇搅铰矫侥脚饺缴绞轿较秸阶节茎惊经颈静镜径痉竞净纠厩旧驹举据锯惧剧鹃绢杰洁结诫届紧锦仅谨进晋烬尽劲荆觉决诀绝钧军骏开凯颗壳课垦恳抠库裤夸块侩宽矿旷况亏岿窥馈溃扩阔蜡腊莱来赖蓝栏拦篮阑兰澜谰揽览懒缆烂滥捞劳涝乐镭垒类泪篱离里鲤礼丽厉励砾历沥隶俩联莲连镰怜涟帘敛脸链恋炼练粮凉两辆谅疗辽镣猎临邻鳞凛赁龄铃凌灵岭领馏刘龙聋咙笼垄拢陇楼娄搂篓芦卢颅庐炉掳卤虏鲁赂禄录陆驴吕铝侣屡缕虑滤绿峦挛孪滦乱抡轮伦仑沦纶论萝罗逻锣箩骡骆络妈玛码蚂马骂吗买麦卖迈脉瞒馒蛮满谩猫锚铆贸么霉没镁门闷们锰梦谜弥觅绵缅庙灭悯闽鸣铭谬谋亩钠纳难挠脑恼闹馁腻撵捻酿鸟聂啮镊镍柠狞宁拧泞钮纽脓浓农疟诺欧鸥殴呕沤盘庞国爱赔喷鹏骗飘频贫苹凭评泼颇扑铺朴谱脐齐骑岂启气弃讫牵扦钎铅迁签谦钱钳潜浅谴堑枪呛墙蔷强抢锹桥乔侨翘窍窃钦亲轻氢倾顷请庆琼穷趋区躯驱龋颧权劝却鹊让饶扰绕热韧认纫荣绒软锐闰润洒萨鳃赛伞丧骚扫涩杀纱筛晒闪陕赡缮伤赏烧绍赊摄慑设绅审婶肾渗声绳胜圣师狮湿诗尸时蚀实识驶势释饰视试寿兽枢输书赎属术树竖数帅双谁税顺说硕烁丝饲耸怂颂讼诵擞苏诉肃虽绥岁孙损笋缩琐锁獭挞抬摊贪瘫滩坛谭谈叹汤烫涛绦腾誊锑题体屉条贴铁厅听烃铜统头图涂团颓蜕脱鸵驮驼椭洼袜弯湾顽万网韦违围为潍维苇伟伪纬谓卫温闻纹稳问瓮挝蜗涡窝呜钨乌诬无芜吴坞雾务误锡牺袭习铣戏细虾辖峡侠狭厦锨鲜纤咸贤衔闲显险现献县馅羡宪线厢镶乡详响项萧销晓啸蝎协挟携胁谐写泻谢锌衅兴汹锈绣虚嘘须许绪续轩悬选癣绚学勋询寻驯训讯逊压鸦鸭哑亚讶阉烟盐严颜阎艳厌砚彦谚验鸯杨扬疡阳痒养样瑶摇尧遥窑谣药爷页业叶医铱颐遗仪彝蚁艺亿忆义诣议谊译异绎荫阴银饮樱婴鹰应缨莹萤营荧蝇颖哟拥佣痈踊咏涌优忧邮铀犹游诱舆鱼渔娱与屿语吁御狱誉预驭鸳渊辕园员圆缘远愿约跃钥岳粤悦阅云郧匀陨运蕴酝晕韵杂灾载攒暂赞赃脏凿枣灶责择则泽贼赠扎札轧铡闸诈斋债毡盏斩辗崭栈战绽张涨帐账胀赵蛰辙锗这贞针侦诊镇阵挣睁狰帧郑证织职执纸挚掷帜质钟终种肿众诌轴皱昼骤猪诸诛烛瞩嘱贮铸筑驻专砖转赚桩庄装妆壮状锥赘坠缀谆浊兹资渍踪综总纵邹诅组钻致钟么为只凶准启板里雳余链泄标适态于';
}
function FTPYStr(){
	return '皚藹礙愛翺襖奧壩罷擺敗頒辦絆幫綁鎊謗剝飽寶報鮑輩貝鋇狽備憊繃筆畢斃閉邊編貶變辯辮鼈癟瀕濱賓擯餅撥缽鉑駁蔔補參蠶殘慚慘燦蒼艙倉滄廁側冊測層詫攙摻蟬饞讒纏鏟産闡顫場嘗長償腸廠暢鈔車徹塵陳襯撐稱懲誠騁癡遲馳恥齒熾沖蟲寵疇躊籌綢醜櫥廚鋤雛礎儲觸處傳瘡闖創錘純綽辭詞賜聰蔥囪從叢湊竄錯達帶貸擔單鄲撣膽憚誕彈當擋黨蕩檔搗島禱導盜燈鄧敵滌遞締點墊電澱釣調叠諜疊釘頂錠訂東動棟凍鬥犢獨讀賭鍍鍛斷緞兌隊對噸頓鈍奪鵝額訛惡餓兒爾餌貳發罰閥琺礬釩煩範販飯訪紡飛廢費紛墳奮憤糞豐楓鋒風瘋馮縫諷鳳膚輻撫輔賦複負訃婦縛該鈣蓋幹趕稈贛岡剛鋼綱崗臯鎬擱鴿閣鉻個給龔宮鞏貢鈎溝構購夠蠱顧剮關觀館慣貫廣規矽歸龜閨軌詭櫃貴劊輥滾鍋國過駭韓漢閡鶴賀橫轟鴻紅後壺護滬戶嘩華畫劃話懷壞歡環還緩換喚瘓煥渙黃謊揮輝毀賄穢會燴彙諱誨繪葷渾夥獲貨禍擊機積饑譏雞績緝極輯級擠幾薊劑濟計記際繼紀夾莢頰賈鉀價駕殲監堅箋間艱緘繭檢堿鹼揀撿簡儉減薦檻鑒踐賤見鍵艦劍餞漸濺澗漿蔣槳獎講醬膠澆驕嬌攪鉸矯僥腳餃繳絞轎較稭階節莖驚經頸靜鏡徑痙競淨糾廄舊駒舉據鋸懼劇鵑絹傑潔結誡屆緊錦僅謹進晉燼盡勁荊覺決訣絕鈞軍駿開凱顆殼課墾懇摳庫褲誇塊儈寬礦曠況虧巋窺饋潰擴闊蠟臘萊來賴藍欄攔籃闌蘭瀾讕攬覽懶纜爛濫撈勞澇樂鐳壘類淚籬離裏鯉禮麗厲勵礫曆瀝隸倆聯蓮連鐮憐漣簾斂臉鏈戀煉練糧涼兩輛諒療遼鐐獵臨鄰鱗凜賃齡鈴淩靈嶺領餾劉龍聾嚨籠壟攏隴樓婁摟簍蘆盧顱廬爐擄鹵虜魯賂祿錄陸驢呂鋁侶屢縷慮濾綠巒攣孿灤亂掄輪倫侖淪綸論蘿羅邏鑼籮騾駱絡媽瑪碼螞馬罵嗎買麥賣邁脈瞞饅蠻滿謾貓錨鉚貿麽黴沒鎂門悶們錳夢謎彌覓綿緬廟滅憫閩鳴銘謬謀畝鈉納難撓腦惱鬧餒膩攆撚釀鳥聶齧鑷鎳檸獰甯擰濘鈕紐膿濃農瘧諾歐鷗毆嘔漚盤龐國愛賠噴鵬騙飄頻貧蘋憑評潑頗撲鋪樸譜臍齊騎豈啓氣棄訖牽扡釺鉛遷簽謙錢鉗潛淺譴塹槍嗆牆薔強搶鍬橋喬僑翹竅竊欽親輕氫傾頃請慶瓊窮趨區軀驅齲顴權勸卻鵲讓饒擾繞熱韌認紉榮絨軟銳閏潤灑薩鰓賽傘喪騷掃澀殺紗篩曬閃陝贍繕傷賞燒紹賒攝懾設紳審嬸腎滲聲繩勝聖師獅濕詩屍時蝕實識駛勢釋飾視試壽獸樞輸書贖屬術樹豎數帥雙誰稅順說碩爍絲飼聳慫頌訟誦擻蘇訴肅雖綏歲孫損筍縮瑣鎖獺撻擡攤貪癱灘壇譚談歎湯燙濤縧騰謄銻題體屜條貼鐵廳聽烴銅統頭圖塗團頹蛻脫鴕馱駝橢窪襪彎灣頑萬網韋違圍爲濰維葦偉僞緯謂衛溫聞紋穩問甕撾蝸渦窩嗚鎢烏誣無蕪吳塢霧務誤錫犧襲習銑戲細蝦轄峽俠狹廈鍁鮮纖鹹賢銜閑顯險現獻縣餡羨憲線廂鑲鄉詳響項蕭銷曉嘯蠍協挾攜脅諧寫瀉謝鋅釁興洶鏽繡虛噓須許緒續軒懸選癬絢學勳詢尋馴訓訊遜壓鴉鴨啞亞訝閹煙鹽嚴顔閻豔厭硯彥諺驗鴦楊揚瘍陽癢養樣瑤搖堯遙窯謠藥爺頁業葉醫銥頤遺儀彜蟻藝億憶義詣議誼譯異繹蔭陰銀飲櫻嬰鷹應纓瑩螢營熒蠅穎喲擁傭癰踴詠湧優憂郵鈾猶遊誘輿魚漁娛與嶼語籲禦獄譽預馭鴛淵轅園員圓緣遠願約躍鑰嶽粵悅閱雲鄖勻隕運蘊醞暈韻雜災載攢暫贊贓髒鑿棗竈責擇則澤賊贈紮劄軋鍘閘詐齋債氈盞斬輾嶄棧戰綻張漲帳賬脹趙蟄轍鍺這貞針偵診鎮陣掙睜猙幀鄭證織職執紙摯擲幟質鍾終種腫衆謅軸皺晝驟豬諸誅燭矚囑貯鑄築駐專磚轉賺樁莊裝妝壯狀錐贅墜綴諄濁茲資漬蹤綜總縱鄒詛組鑽緻鐘麼為隻兇準啟闆裡靂餘鍊洩標適態於';
}
function Traditionalized(cc){
	var str='',ss=JTPYStr(),tt=FTPYStr();
	for(var i=0;i<cc.length;i++){
		if(cc.charCodeAt(i)>10000&&ss.indexOf(cc.charAt(i))!=-1)str+=tt.charAt(ss.indexOf(cc.charAt(i)));
  		else str+=cc.charAt(i);
	}
	return str;
}

function Traditionalizedce(cc){
	var str='',tt=JTPYStr(),ss=FTPYStr();
	for(var i=0;i<cc.length;i++){
		if(cc.charCodeAt(i)>10000&&ss.indexOf(cc.charAt(i))!=-1)str+=tt.charAt(ss.indexOf(cc.charAt(i)));
  		else str+=cc.charAt(i);
	}
	return str;
}

function _RequestParamsStr(){
	var strHref = window.document.location.href;
	var intPos = strHref.indexOf('?');
	var strRight = strHref.substr(intPos+1);
	return strRight;
}

function Request(strName){
	var arrTmp = _RequestParamsStr().split("&");
	for(var i=0,len=arrTmp.length; i<len; i++){ 
		var arrTemp = arrTmp[i].split("=");
		if(arrTemp[0].toUpperCase() == strName.toUpperCase()){
		if(arrTemp[1].indexOf("#")!=-1) arrTemp[1] = arrTemp[1].substr(0, arrTemp[1].indexOf("#"));
			return arrTemp[1]; 
		}
	}
	return "";
}

function SetCookie(name,value,hours){
	var hourstay = 30*24*60*60*1000; //此 cookie 将被默认保存 30 天
	if(checkNum(hours)){
		hourstay = hours;
	}
    var exp  = new Date();
    exp.setTime(exp.getTime() + hourstay*60*60*1000);
    document.cookie = name + "="+ escape(value) + ";expires=" + exp.toGMTString();
}
function getCookie(name){     
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    if(arr != null) return unescape(arr[2]); return null;
}
function delCookie(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
function checkNum(nubmer){
    var re = /^[0-9]+.?[0-9]*$/;   //判断字符串是否为数字     //判断正整数 /^[1-9]+[0-9]*]*$/  
    if (re.test(nubmer))return true;
	return false;
}
function goBackHistory(num){
	if(typeof(num) == 'undefined'){
		num = 0;
	}
	if(num == '0'){
		if(history.go(-1)){
			location.href = history.go(-1);
		}
	}else{
		arr = location.href.split('/')
		arr[arr.length-1] = "index.html"
		arr = arr.join('/') 
		location.href = arr
	}
}

//简体转繁体
function commDefault_isFT(){
		var based_Obj= document.getElementById("based");
		var currentlang_Obj= document.getElementById("currentlang");//当前语言
		$(function(){
			if (based_Obj){
				var JF_cn="ft"+self.location.hostname.toString().replace(/\./g,"");
				switch( Request('chlang') ){
					case "cn-tw":
						BodyIsFt= getCookie(JF_cn)=="1"? 0 : 1;
						delCookie(JF_cn);
						SetCookie(JF_cn, BodyIsFt, 7);
						break; 
					case "cn":
					case "en": 
						BodyIsFt= 0; 
						delCookie(JF_cn);
						SetCookie(JF_cn, 0, 7);
						currentlang_Obj.innerHTML = "简体中文";
						break;
					case "tw": 
						BodyIsFt= 1; 
						delCookie(JF_cn);
						SetCookie(JF_cn, 1, 7);
						currentlang_Obj.innerHTML = "繁體中文"; //因为是繁体 你写简体也会被转化成繁体  所以这儿只能写繁体 2015-1-16
						break;
					default: 
						if (typeof Default_isFT!='undefined' && Default_isFT){ //如果默认繁体
							if(getCookie(JF_cn)==null){
								BodyIsFt= 1;
								SetCookie(JF_cn, 1, 7);
								break;
							}
						}
						BodyIsFt= parseInt(getCookie(JF_cn));
				}	
				if(BodyIsFt===1){
					StranBody();
					document.title = StranText(document.title);
				}else{
					StranBodyce();
					document.title = StranTextce(document.title);
				}
			}else{
				var JF_cn="ft"+self.location.hostname.toString().replace(/\./g,"");
				if(Default_isFT){
					BodyIsFt= 1; 
					delCookie(JF_cn);
					SetCookie(JF_cn, 1, 7);
					StranBody();
					document.title = StranText(document.title);
				}else{
					BodyIsFt= 0; 
					delCookie(JF_cn);
					SetCookie(JF_cn, 0, 7);
					/*StranBodyce();
					document.title = StranTextce(document.title);*/
				}
			}
			
		});
	}

DIY_PAGE_SIZE='1200';


$(document).ready(function(){
	/*
	**当前模块对象：$("#banner_style_01_1630461160262")
	**效果仅在发布预览下才生效
	*/
	
})



$(document).ready(function(){
	/*
	**当前模块对象：$("#button_style_08_1630464476530")
	**效果仅在发布预览下才生效
	*/
	
})



$(document).ready(function(){
	/*
	**当前模块对象：$("#footerCustom_footerDh_01_1630579660451")
	**效果仅在发布预览下才生效
	*/
	
})
var viewsSettings={"comm_layout_header":{"diyShowName":"\u5171\u4eab\u5934\u90e8","css":{"pc":{"height":"70.8125px","z-index":"99999"},"content":{"max-width":"1200px","overflow":"visible"},"mobile":{"height":"59px"}}},"dh_style_28_1630460162226":{"settingsBox":{"setList":{"\u5e38\u89c4":{"isDefault":"true","mod":"viewSettingsB","act":"dhConfig","setupFunc":"dhSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bfc\u822a\u83dc\u5355\u5c5e\u6027\u8bbe\u7f6e"},"styleHelpId":1257,"style":"style_28","diyShowName":"\u4e09\u7ea7\u5bfc\u822a-\u98ce\u683c28","styleShowName":"\u4e09\u7ea7\u5bfc\u822a-\u98ce\u683c28","styleKind":"\u5bfc\u822a\u83dc\u5355","styleSort":"9999","viewCtrl":"default","css":{"pc":{"width":"84.04255319148936%","z-index":"9999","position":"absolute","top":"20.3125px","left":"13.308094713656388%"},"pad":{"z-index":"999","height":"30px"},"mobile":{"z-index":"999","height":"30px"},"content":{"overflow":"visible"},"customCss":{"pc":{"@subMenuSet":{"line-height":"30px","padding-top":"20px","padding-bottom":"40px","margin-bottom":"0px","margin-top":"0px","font-size":"16px","background":"#ffffff","height":"30px","color":"#002a5c"},"@thrMenuSet":{"line-height":"18px","padding-left":"0px","padding-top":"5px","padding-bottom":"5px"},"@mainMenuSet:hover":{"color":"#1686f7","line-height":"30px","font-size":"18px"},"%hot>a":{"color":"#1686f7","line-height":"30px","font-size":"18px"},"@subMenuSet:hover":{"color":"#1686f7","margin-right":"0px","margin-bottom":"0px","padding-bottom":"40px","font-size":"16px","padding-top":"20px","line-height":"30px","height":"30px","margin-top":"0px","border-color":"#1686f7","border-style":"solid","border-width":"2px","border-bottom":"none !important","border-right":"none !important","border-top":"none !important"},"@subCurSet":{"color":"#1686f7"},"@thrMenuSet:hover":{"color":"#1686f7"},"@thrCurSet":{"color":"#1686f7"},"@mainMenuSet":{"text-hover-color":"#1686f7","color":"#002a5c","padding-top":"0px","padding-bottom":"0px","font-size":"18px","line-height":"30px","height":"30px","margin-bottom":"0px"},"%subCurSet":{"color":"#1686f7","margin-right":"0px","margin-bottom":"0px","padding-bottom":"40px","font-size":"16px","padding-top":"20px","line-height":"30px","height":"30px","margin-top":"0px","border-color":"#1686f7","border-style":"solid","border-width":"2px","border-bottom":"none !important","border-right":"none !important","border-top":"none !important"},"@dhAreaSet":{"line-height":"44px"},"%hot#@aview":{"line-height":"30px","font-size":"18px"}},"pad":{"@subMenuSet":{"padding-top":"5px","padding-bottom":"5px","line-height":"28px"},"@thrMenuSet":{"padding-top":"0px","padding-bottom":"0px"},"@subMenuSet:hover":{"line-height":"28px","padding-top":"5px","padding-bottom":"5px"},"%subCurSet":{"line-height":"28px","padding-top":"5px","padding-bottom":"5px"}},"mobile":{"@subMenuSet:hover":{"background":"transparent","color":"#0c5adb","font-size":"14px","padding-top":"0px","padding-bottom":"0px","font-family":"Microsoft YaHei","line-height":"25px","border-width":"2px","border-style":"solid","border-color":"#0976dd","height":"25px","border-bottom":"none !important","border-top":"none !important","border-right":"none !important","margin-top":"0px","margin-bottom":"0px","margin-left":"0px","margin-right":"0px","padding-left":"10px","padding-right":"0px"},"%subCurSet":{"background":"transparent","color":"#0c5adb","font-size":"14px","padding-top":"0px","padding-bottom":"0px","font-family":"Microsoft YaHei","line-height":"25px","border-width":"2px","border-style":"solid","border-color":"#0976dd","height":"25px","border-bottom":"none !important","border-top":"none !important","border-right":"none !important","margin-top":"0px","margin-bottom":"0px","margin-left":"0px","margin-right":"0px","padding-left":"10px","padding-right":"0px"},"@subMenuSet":{"color":"#ffffff","background":"transparent","padding-top":"0px","padding-bottom":"0px","font-size":"14px","padding-left":"10px","line-height":"25px","height":"25px"},"@mainMenuSet:hover":{"font-size":"16px","padding-top":"10px","padding-bottom":"10px","color":"#0c5adb","line-height":"40px","height":"40px","border-style":"none"},"%hot>a":{"font-size":"16px","padding-top":"10px","padding-bottom":"10px","color":"#0c5adb","line-height":"40px","height":"40px","border-style":"none"},"%hot#@aview":{"font-size":"16px","padding-top":"10px","padding-bottom":"10px","color":"#0c5adb","line-height":"40px","height":"40px","border-style":"none"},"@mainMenuSet":{"font-size":"16px","padding-top":"10px","padding-bottom":"10px","line-height":"40px","color":"#ffffff","height":"40px"}}}},"lock":{"height":"true"},"data":{"childMenuType":"1","dhOpen":"on","subtitlename":"","logoposition":"0","logoopen":"off","logoright":"","logoleft":"","hideLogoSetting":"1","contentWidth":"","showpc":["103486","103492","103487"],"showmobile":["103486","103492","103487"],"newWinShow":"","iconopen":"","subWidth":"on"},"name":"dh","kind":"\u5bfc\u822a\u83dc\u5355","showname":"\u5bfc\u822a\u83dc\u5355","eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"bounceInDown","duration":"1","delay":"0.25","iteration":"1","offset":"0"},"setFixed":"2"},"image_logo_1630459800557":{"settingsBox":{"setList":{"\u5e38\u89c4":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageLogoConfig","setupFunc":"logoSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"LOGO\u5c5e\u6027\u8bbe\u7f6e"},"style":"logo","styleKind":"LOGO","styleHelpId":1252,"viewCtrl":"logo","css":{"pc":{"width":"18.325991189427313%","height":"49px","position":"absolute","top":"10.8125px","left":"0.6236233480176211%","z-index":"9999"},"pad":{"height":"49px"},"mobile":{"height":"49px"},"content":{"overflow":"hidden"}},"data":{"logoType":"1","logoStyle":"3","logoBlank":"_self","imgurl":"https:\/\/wds-service-1258344699.file.myqcloud.com\/20\/29709\/png\/164717998920956fdbcb4e2a85145.png?version=0","idpage":"103486"},"name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","diyShowName":"LOGO","moveEdit":[],"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":"","propagelist":"","newspagelist":"","proidlist":"","groupVallist":"","newsidlist":"","groupNVallist":"","duration":"1","delay":"0.25","iteration":"1","offset":"0","animate":"bounceIn"},"setFixed":"2","setFixedScroll":{"pc":"2"}},"layout_diy_1630458903":{"diyShowName":"\u533a\u57df\u5e03\u5c40","css":{"pc":{"height":"772px"},"pad":{"height":"356px"},"mobile":{"height":"158px","display":"block"}},"settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"}},"image_style_12_1_1630980629199":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"photoConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_12_1","diyShowName":"\u56fe\u6587\u98ce\u683c01","styleShowName":"\u56fe\u6587\u98ce\u683c01","styleKind":"\u56fe\u6587\u7ec4","styleHelpId":"","viewCtrl":"photo","css":{"pc":{"width":"50%","position":"absolute","top":"263.5px","left":"25.015033072760072%","z-index":2},"pad":{"left":"calc(50% - 409.5px)","top":"36.5px","width":"819px"},"mobile":{"width":"92%","top":"21.993057250976562px","left":"4%"},"content":{"overflow":"hidden"},"customCss":{"pc":{"@titProSet":{"font-size":"65px","color":"#ffffff"},"@defProSet":{"background":"transparent","color":"#e5e5e5","font-size":"16px"}},"mobile":{"@titProSet":{"font-size":"18px"},"@defProSet":{"font-size":"12px"}},"pad":{"@titProSet":{"font-size":"50px"}}}},"lock":{"height":"true"},"doubleClickFunc":"photoGroupSelect6","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"photoGroupSelect6()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","params":{"filelist":",","titlelist":"TecoCraft\u670d\u52a1\u5668,","subtitlelist":",","textlist":"\u6280\u672f\u5b66\u56ed\u670d\u52a1\u5668,","btnNamelist":",","btnTimelist":",","urllist":",","selectlist":",","groupNVallist":",","newspagelist":",","newsidlist":",","groupVallist":",","propagelist":",","proidlist":",","bgimglist":"\/images\/logoback.gif,","animate":"bounceInUp","duration":"1","delay":"0.25","iteration":"1","offset":"0"},"data":{"prodhnum":"1","prodhnumpc":"1","prodhnumpad":"1","prodhnummobile":"1","imgWidthNum":"1","imgWidthNumpc":"1","imgWidthNumpad":"1","imgWidthNummobile":"1","prodznum":"2","prodznumpc":"1","prodznumpad":"1","prodznummobile":"1","prodnum":"1","hangnumpc":"1","farpc":"1","far":"1","hangnumpad":"1","farpad":"1","hangnummobile":"1","farmobile":"1"},"name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"button_style_08_1630981496120":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"buttonConfigNew","setupFunc":"btnSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6309\u94ae\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_08","diyShowName":"\u6309\u94ae\u98ce\u683c8","styleShowName":"\u98ce\u683c8","styleKind":"\u6587\u5b57\u6309\u94ae","viewCtrl":"button","css":{"pc":{"width":"9.079975947083584%","position":"absolute","top":"441px","left":"40.64942874323512%","z-index":2},"pad":{"left":"34.180543678599896%","top":"186.49307250976562px","width":"112px"},"mobile":{"width":"21.333333333333336%","top":"79.97917175292969px","left":"27.781472307570436%"},"content":{"overflow":"visible"},"customCss":{"pc":{"@btnaSet":{"background":"#0c5adb","font-size":"18px","color":"#ffffff","border-color":"#0c5adb","border-radius":"10px","padding-top":"10px","padding-bottom":"30px","margin-top":"0px","margin-bottom":"0px"},"@btnaSet:hover":{"background":"#ffffff","color":"#0c5adb","font-size":"18px"}},"mobile":{"@btnaSet":{"font-size":"12px","padding-top":"0px","padding-bottom":"0px"},"@btnaSet:hover":{"font-size":"12px"}}}},"lock":{"height":"true"},"data":{"linkType":1,"linkTypeForm":11,"buttonVal":"\u5173\u4e8e\u6211\u4eec","btnType":"defaultButton","selectVal":null},"name":"button","kind":"\u6309\u94ae\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"bounceIn","duration":"1","delay":"0.25","iteration":"1","offset":"0"}},"button_style_08_1630981751536":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"buttonConfigNew","setupFunc":"btnSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6309\u94ae\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_08","diyShowName":"\u6309\u94ae\u98ce\u683c8","styleShowName":"\u98ce\u683c8","styleKind":"\u6587\u5b57\u6309\u94ae","viewCtrl":"button","css":{"pc":{"width":"9.079975947083584%","position":"absolute","top":"441px","left":"50.45099218280217%","z-index":2},"pad":{"left":"52.79992130940323%","top":"186.49307250976562px","width":"112px"},"mobile":{"width":"21.3%","top":"79.97917175292969px","left":"53.61166609094498%"},"content":{"overflow":"visible"},"customCss":{"pc":{"@btnaSet":{"background":"#ffffff","font-size":"18px","color":"#0c5adb","border-color":"#0c5adb","border-radius":"10px","padding-top":"10px","padding-bottom":"30px","margin-top":"0px","margin-bottom":"0px"},"@btnaSet:hover":{"background":"#0c5adb","color":"#ffffff","font-size":"18px"}},"mobile":{"@btnaSet":{"font-size":"12px","padding-top":"0px","padding-bottom":"0px"},"@btnaSet:hover":{"font-size":"12px"}}}},"lock":{"height":"true"},"data":{"linkType":1,"linkTypeForm":11,"buttonVal":"\u8054\u7cfb\u6211\u4eec","btnType":"defaultButton","selectVal":null},"name":"button","kind":"\u6309\u94ae\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"bounceIn","duration":"1","delay":"0.25","iteration":"1","offset":"0"}},"banner_style_01_1630461160262":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"bannerConfig","setupFunc":"bannerSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u8f6e\u64ad\u5c5e\u6027\u8bbe\u7f6e"},"styleHelpId":1256,"style":"style_01","diyShowName":"\u8f6e\u64ad\u56fe-\u98ce\u683c1","styleShowName":"\u98ce\u683c1","styleShowImg":"\/sysTools\/Model\/viewsRes\/showImg\/banner_style_13.png","styleShowClass":"one","styleKind":"AAA","viewCtrl":"default","css":{"pc":{"width":"100%","height":"771px","left":"0%","top":"1px","position":"absolute","z-index":1},"pad":{"height":"300px"},"mobile":{"height":"300px"},"customCss":[],"content":{"overflow":"visible"}},"doubleClickFunc":"bannerViewSelect","mouseMenu":[{"name":"\u7f16\u8f91\u8f6e\u64ad\u56fe","func":"bannerViewSelect()","ico":"fa-file-image-o"}],"params":{"filelist":"https:\/\/www.coldregion.top\/photos\/4K\u4ed3\u5e93.jpg,https:\/\/www.coldregion.top\/photos\/4K\u5730\u72f1\u5927\u5385.jpg,https:\/\/www.coldregion.top\/photos\/4K%C2%B7500days.png,https:\/\/www.coldregion.top\/photos\/4K%C2%B7%E8%83%A1%E6%A1%83.png,","titlelist":",,,,","subtitlelist":",,,,","textlist":"\u4ed3\u5e93\u5168\u666f,\u5730\u72f1\u5927\u5385,500\u65e5\u7eaa\u5ff5LOGO\u5730\u56fe\u753b,\u4e03\u6fd1\u80e1\u6843\u77ff\u5751,","btnNamelist":",,,,","btnTimelist":",,,,","urllist":"https:\/\/www.coldregion.top\/photos\/4K\u4ed3\u5e93.jpg,https:\/\/www.coldregion.top\/photos\/4K\u5730\u72f1\u5927\u5385.jpg,https:\/\/www.coldregion.top\/photos\/4K%C2%B7500days.png,https:\/\/www.coldregion.top\/photos\/4K%C2%B7%E8%83%A1%E6%A1%83.png,","selectlist":",,,,","groupNVallist":",,,,","newspagelist":",,,,","newsidlist":",,,,","groupVallist":",,,,","propagelist":",,,,","proidlist":",,,,","bgimglist":",,,\/images\/logoback.gif,"},"mainColor":"#00D0FF","name":"banner","kind":"\u56fe\u7247\u8f6e\u64ad","showname":"\u56fe\u7247\u8f6e\u64ad","eventSet":{"scrollView":"none","type":"none"},"setFixedScroll":{"pc":"2"},"viewLock":{"pc":[]},"setFixed":"2","data":{"imgStyle":{"pc":"2","pad":null,"mobile":null},"groundGlass":"","timeAnimi":"0.3","animateStyle":"rotate-3d"}},"layout_1630460399880":{"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","css":{"content":{"overflow":"visible","max-width":"1200px"},"pc":{"height":"609.88889px"},"mobile":{"height":"674px","display":"block"},"pad":{"height":"629px"}},"settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"}},"div_a_includeBlock_1630462625441":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"initSettingElementEvent"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"a_includeBlock","styleShowName":"\u81ea\u7531\u5bb9\u5668","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"50%","height":"539px","box-sizing":"border-box","position":"absolute","top":"70px","left":"0%"},"pad":{"box-sizing":"border-box","height":"507px","top":"70px"},"mobile":{"width":"100%","height":"383px","box-sizing":"border-box","top":"271px","left":"0%","display":"block"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668-\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"bounceInLeft","duration":"1","delay":"0.25","iteration":"1","offset":"0"}},"div_blank_new06_1630463689896":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5782\u76f4\u7ebf\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e","\u5c5e\u6027":{"mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"blankDivSetup"}},"style":"blank_new06","styleKind":"\u5782\u76f4\u7ebf\u6a21\u5757","styleHelpId":1248,"viewCtrl":"blank03","css":{"pc":{"height":"85px","width":"46.666666666666664%","position":"absolute","left":"54.083333333333336%","top":"321.5px"},"pad":{"left":"61.3181938559322%","width":"15.4015401540154%","top":"322.5px","height":"70px"},"mobile":{"left":"57.81666666666667%","top":"218px","height":"63px"},"customCss":{"pc":{"modelArea":{"box-sizing":"border-box"},"@roundcs":{"border-style":"solid"},"@modSet":{"border-style":"solid","border-width":"2px","border-color":"#075cb2"}},"pad":{"modelArea":{"box-sizing":"border-box"}},"mobile":{"modelArea":{"box-sizing":"border-box"}}}},"lock":{"width":"true"},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u5782\u76f4\u7ebf\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"}},"image_style_01_1630464052144":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"101px","height":"91px","position":"absolute","left":"65.25%","top":"321.5px"},"pad":{"left":"70.47470868644068%","width":"18%","height":"72px","top":"322.5px"},"mobile":{"left":"70.31666666666668%","top":"218px","width":"71px","height":"60px"},"content":{"overflow":"visible"},"customCss":{"pc":{"@picSet":{"border-radius":"45.5px"}},"pad":{"@picSet":{"border-radius":"50px"}}}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","imgUrl":"\/images\/matLibrary\/webImg\/image01_default.jpg","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"data":{"imgUrl":"https:\/\/cdn.yun.sooce.cn\/6\/34355\/png\/1630464185160d4fd9d40cd5dae7a.png?version=0"},"params":{"filelist":"","urllist":"","propagelist":"","newspagelist":"","proidlist":"","groupVallist":"","newsidlist":"","groupNVallist":""}},"button_style_08_1630464476530":{"settingsBox":{"setList":{"\u5e38\u89c4":{"isDefault":"true","mod":"viewSettingsHcl","act":"buttonConfigNew","setupFunc":"btnSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6309\u94ae\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_08","diyShowName":"\u6309\u94ae\u98ce\u683c8","styleShowName":"\u98ce\u683c8","styleKind":"\u6587\u5b57\u6309\u94ae","viewCtrl":"button","css":{"pc":{"width":"30%","position":"absolute","left":"0%","top":"442.5px"},"pad":{"left":"2.0094014830508473%","width":"41.254125412541256%","top":"437.5px"},"mobile":{"left":"2%","top":"334px","width":"116px"},"content":{"overflow":"visible"},"customCss":{"pc":{"@btnaSet":{"background":"#0051bc","border-width":"0px","border-style":"none","border-color":"#edf1f4","color":"#edf1f4","font-size":"16px","line-height":"0em","height":"60px"}},"mobile":{"@btnaSet":{"height":"30px","font-size":"12px"}},"pad":{"@btnaSet":{"height":"50px"}}}},"lock":{"height":"true"},"data":{"linkType":1,"linkTypeForm":11,"buttonVal":"\u67e5\u770b\u66f4\u591a","btnType":"defaultButton","selectVal":null},"name":"button","kind":"\u6309\u94ae\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"image_style_13_1_1630465801927":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"photoConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_13_1","diyShowName":"\u56fe\u6587\u98ce\u683c02","styleShowName":"\u56fe\u6587\u98ce\u683c02","styleKind":"\u56fe\u6587\u7ec4","styleHelpId":"","viewCtrl":"photo","css":{"pc":{"width":"50%","position":"absolute","top":"310px","left":"0%"},"pad":{"left":"0%","top":"313.5px","width":"278px"},"mobile":{"left":"2%","top":"215px"},"content":{"overflow":"visible"},"customCss":{"mobile":{"@titleSet":{"font-size":"14px","line-height":"20px","height":"20px"}},"pc":{"@detailSet":{"font-size":"16px","font-family":"Microsoft YaHei","text-align":"left"},"@titleSet":{"line-height":"30px","height":"30px","color":"#575a7b"}}}},"lock":{"height":"true"},"doubleClickFunc":"photoGroupSelect6","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"photoGroupSelect4()","ico":"fa-file-image-o"}],"newPicScale":"2:3","sizeCallbackFunc":"setImgCen","data":{"prodhnum":"1","prodhnumpc":"1","prodhnumpad":"1","prodhnummobile":"1","imgWidthNum":"20","imgWidthNumpc":"30","imgWidthNumpad":"24","imgWidthNummobile":"20","newPicScale":"1:1","prodnum":"3","hangnumpc":"1","chk":"on","hangnumpad":"1"},"params":{"filelist":"https:\/\/cdn.yun.sooce.cn\/6\/34355\/png\/16304667781516e60853dedfcfdf0.png?version=1630466467,https:\/\/cdn.yun.sooce.cn\/6\/34355\/png\/16304667781516e60853dedfcfdf0.png?version=1630466467,https:\/\/cdn.yun.sooce.cn\/6\/34355\/png\/16304667781516e60853dedfcfdf0.png?version=1630466467,","titlelist":"\u4e30\u5bcc\u7684\u884c\u4e1a\u6210\u529f\u7ecf\u9a8c,\u5353\u8d8a\u7684\u884c\u4e1a\u7814\u7a76\u80fd\u529b,\u5148\u8fdb\u7684\u6280\u672f\u9769\u65b0\u4e0e\u5b9e\u8df5\u521b\u65b0\u80fd\u529b,","subtitlelist":",,,","textlist":",,,","btnNamelist":",,,","btnTimelist":",,,","urllist":",,,","selectlist":",,,","groupNVallist":",,,","newspagelist":",,,","newsidlist":",,,","groupVallist":",,,","propagelist":",,,","proidlist":",,,","bgimglist":",\/images\/logoback.gif,,"},"name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"text_style_01_1630467324512":{"settingsBox":{"setList":{"\u5e38\u89c4":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"90.5%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","left":"0%","top":"89px"},"pad":{"left":"0%","width":"94.91525423728814%"},"mobile":{"width":"96%","font-size":"12px","color":"#333","line-height":"1.6","top":"69px","left":"2%"},"customCss":{"pc":{"@view_contents":{"color":"#575a7b"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u6587\u672c\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"}},"text_style_01_1630464220219":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"12.5%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","left":"68.16666666666666%","top":"339px"},"pad":{"left":"74.34454449152543%","width":"11.652542372881355%","top":"329.5px"},"mobile":{"width":"13.333333333333334%","font-size":"12px","color":"#333","line-height":"1.6","top":"230.5px","left":"74.31666666666666%"},"customCss":{"pc":{"@view_contents":{"text-align":"center","color":"#e3e7ea"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u6587\u672c\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"text_style_01_1630475189606":{"settingsBox":{"setList":{"\u5e38\u89c4":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"61.66666666666667%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","left":"0%","top":"0px"},"pad":{"left":"0.1853813559322034%","width":"98.72881355932203%"},"mobile":{"width":"96%","font-size":"12px","color":"#333","line-height":"1.6","top":"11px","left":"2%"},"customCss":{"pc":{"@view_contents":{"font-size":"24px","font-weight":"bold","color":"#575a7b"}},"mobile":{"@view_contents":{"font-size":"16px","text-align":"left"}},"pad":{"@view_contents":{"font-size":"24px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u6587\u672c\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"}},"image_style_01_1630466295893":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"230px","height":"360px","position":"absolute","top":"150px","left":"80.83333333333333%"},"pad":{"width":"170px","height":"260px","top":"159px","left":"81.97242841993638%"},"mobile":{"width":"133px","height":"206px","top":"37.5px","left":"52.18333333333334%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","imgUrl":"\/images\/matLibrary\/webImg\/image01_default.jpg","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"https:\/\/cdn.yun.sooce.cn\/6\/34355\/png\/1630464193391fbeb81c2d173e8bc.png?version=1630463881","imgStyle":{"pc":"3","pad":"3","mobile":"3"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"bounceInRight","duration":"1","delay":"0.25","iteration":"1","offset":"0","filelist":"","urllist":"","propagelist":"","newspagelist":"","proidlist":"","groupVallist":"","newsidlist":"","groupNVallist":""}},"image_style_01_1630466255286":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"28.333333333333332%","height":"510px","position":"absolute","top":"70px","left":"50%"},"pad":{"width":"28%","height":"403px","top":"70px"},"mobile":{"width":"170px","height":"251px","top":"10px","left":"2%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","imgUrl":"\/images\/matLibrary\/webImg\/image01_default.jpg","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"data":{"imgUrl":"https:\/\/cdn.yun.sooce.cn\/6\/34355\/png\/163046418945830dcde8f1a92b87c.png?version=1630463878","imgStyle":{"pc":"3","pad":"3","mobile":"3"}},"moveEdit":[],"params":{"animate":"bounceInRight","duration":"1","delay":"0.25","iteration":"1","offset":"0","filelist":"","urllist":"","propagelist":"","newspagelist":"","proidlist":"","groupVallist":"","newsidlist":"","groupNVallist":""}},"layout_1630483547743":{"css":{"pc":{"height":"144px"},"content":{"overflow":"visible","max-width":"1200px"},"mobile":{"height":"59px"},"pad":{"height":"135px"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"}},"text_style_01_1630483570211":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"80%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","top":"70px","left":"10%"},"pad":{"left":"5.03711558854719%","width":"90%"},"mobile":{"width":"96%","font-size":"12px","color":"#333","line-height":"1.6","top":"12px","left":"2%"},"customCss":{"pc":{"@view_contents":{"font-size":"40px","font-weight":"bold","text-align":"center","color":"#002a5c"}},"mobile":{"@view_contents":{"font-size":"20px"}},"pad":{"@view_contents":{"font-size":"36px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u6587\u672c\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"layout_1630564787701":{"css":{"pc":{"height":"718px"},"content":{"overflow":"visible","max-width":"1200px"},"mobile":{"height":"586px"},"pad":{"height":"440px"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout"},"image_style_12_1_1630571001758":{"settingsBox":{"setList":{"\u5e38\u89c4":{"isDefault":"true","mod":"viewSettingsHcl","act":"photoConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_12_1","diyShowName":"\u56fe\u6587\u98ce\u683c01","styleShowName":"\u56fe\u6587\u98ce\u683c01","styleKind":"\u56fe\u6587\u7ec4","styleHelpId":"","viewCtrl":"photo","css":{"pc":{"width":"100%","position":"absolute","top":"50px","left":"0%"},"pad":[],"mobile":{"width":"96%","top":"10px","left":"2%"},"content":{"overflow":"hidden"},"customCss":{"pc":{"@titProSet":{"font-size":"24px","color":"#002a5c","padding-bottom":"0px","padding-top":"10px"},"@modSet":{"background":"transparent","padding-top":"30px"},"@defProSet":{"font-size":"16px","color":"#575a7b","padding-bottom":"30px","padding-left":"30px","padding-right":"30px"},"@btnSet":{"font-family":"Microsoft YaHei","font-size":"16px","color":"#0c5adb","height":"50px","line-height":"50px","border-radius":"10px","border-color":"#0c5adb","border-width":"1px","border-style":"solid","padding-bottom":"0px","margin-bottom":"50px"},"@modSet:hover":{"background":"#d2e4f7"},"@titProSet:hover":{"color":"#002a5c"},"@titProcurSet":{"color":"#002a5c"},"@defProSet:hover":{"color":"#575a7b"},"@modSet:hover#@btnSet":{"background":"#0c5adb","color":"#ffffff"}},"pad":{"@titProSet":{"font-size":"22px"},"@defProSet":{"padding-left":"10px","padding-right":"10px"},"@btnSet":{"line-height":"45px","height":"45px","margin-left":"60px","margin-right":"60px"}},"mobile":{"@titProSet":{"font-size":"16px"},"@defProSet":{"font-size":"12px","padding-left":"5px","padding-right":"5px","padding-bottom":"20px"},"@btnSet":{"font-size":"12px","line-height":"30px","height":"30px","margin-bottom":"30px","margin-left":"20px","margin-right":"20px"}}}},"lock":{"height":"true"},"doubleClickFunc":"photoGroupSelect6","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"photoGroupSelect4()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","params":{"filelist":"https:\/\/cdn.yun.sooce.cn\/6\/34355\/png\/1630571134066255fa99d45429545.png?version=0,https:\/\/cdn.yun.sooce.cn\/6\/34355\/png\/16305711340686003f735735792a5.png?version=0,https:\/\/cdn.yun.sooce.cn\/6\/34355\/png\/1630571134069cc428f56ca96951f.png?version=0,","titlelist":"\u9879\u76ee\u7ba1\u7406+,\u6280\u672f\u6c89\u6dc0+,\u4e1a\u52a1\u79ef\u7d2f+,","subtitlelist":",,,","textlist":"\u7cbe\u7ec6\u5316\u7ba1\u7406\u4e3a\u5bfc\u5411\uff0c\u9879\u76ee\u8fd0\u8425\u7ba1\u7406\u6807\u51c6\u5316SOP\u654f\u6377\u5316\u9879\u76ee\u4ea4\u4ed8\u7ba1\u7406\u6301\u7eed\u7814,\u4e30\u5bcc\u7684SAP HANA\u3001Data Hub\u7b49\u5168\u6d41\u7a0b\u6570\u636e\u5e94\u7528\u670d\u52a1\u7ecf\u9a8c\u8d85\u8fc715\u5e74\u4e13\u6ce8SAP ,\u5353\u8d8a\u7684\u884c\u4e1a\u7814\u7a76\u53caBI\u54a8\u8be2\u8bbe\u8ba1\u57fa\u4e8e\u5ba2\u6237\u4ef7\u503c\u521b\u9020\u7684\u884c\u4e1a\u6570\u5b57\u5316\u6d1e\u5bdfModel,","btnNamelist":"\u67e5\u770b\u66f4\u591a,\u67e5\u770b\u66f4\u591a,\u67e5\u770b\u66f4\u591a,","btnTimelist":",,,","urllist":",,,","selectlist":"bossType-1&selectVal-400225,bossType-1&selectVal-400225,bossType-1&selectVal-400225,","groupNVallist":",,,","newspagelist":",,,","newsidlist":",,,","groupVallist":",,,","propagelist":",,,","proidlist":",,,","bgimglist":",\/images\/logoback.gif,\/images\/logoback.gif,"},"data":{"prodhnum":"2","prodhnumpc":"3","prodhnumpad":"3","prodhnummobile":"2","imgWidthNum":"60","imgWidthNumpc":"100","imgWidthNumpad":"100","imgWidthNummobile":"60","prodznum":"2","prodznumpc":"2","prodznumpad":"2","prodznummobile":"2","chkbtn":"on","prodnum":"4","hangnummobile":"2","farmobile":"2","far":"2"},"name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"layout_1630566880365":{"css":{"pc":{"height":"633px"},"content":{"overflow":"visible","max-width":"1200px"},"mobile":{"height":"619px"},"pad":{"height":"591px"},"customCss":{"pc":{"modelArea":{"background":"#070b3b"}}}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"}},"div_a_includeBlock_1630566890641":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"initSettingElementEvent"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"a_includeBlock","styleShowName":"\u81ea\u7531\u5bb9\u5668","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"37%","height":"425px","box-sizing":"border-box","position":"absolute","top":"120px","left":"0%"},"pad":{"box-sizing":"border-box","height":"393.5px","left":"0%","top":"91px"},"mobile":{"width":"96.00000000000001%","height":"292px","box-sizing":"border-box","top":"10px","left":"2%","display":"block"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668-\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"bounceInLeft","duration":"1","delay":"0.25","iteration":"1","offset":"0"},"moveEdit":[]},"image_style_13_1_1630566890808":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"photoConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_13_1","diyShowName":"\u56fe\u6587\u98ce\u683c02","styleShowName":"\u56fe\u6587\u98ce\u683c02","styleKind":"\u56fe\u6587\u7ec4","styleHelpId":"","viewCtrl":"photo","css":{"pc":{"width":"57.432432432432435%","position":"absolute","top":"310px","left":"0%"},"pad":{"left":"0%","top":"287.5px","width":"278px"},"mobile":{"left":"1.9965277777777777%","top":"187px","width":"187px"},"content":{"overflow":"visible"},"customCss":{"mobile":{"@titleSet":{"font-size":"12px","line-height":"12px","height":"12px","letter-spacing":"0px"}},"pc":{"@detailSet":{"font-size":"16px","font-family":"Microsoft YaHei","text-align":"left"},"@titleSet":{"line-height":"25px","height":"25px","color":"#ffffff"}},"pad":{"@titleSet":{"line-height":"24px","height":"24px"}}}},"lock":{"height":"true"},"doubleClickFunc":"photoGroupSelect6","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"photoGroupSelect4()","ico":"fa-file-image-o"}],"newPicScale":"2:3","sizeCallbackFunc":"setImgCen","data":{"prodhnum":"1","prodhnumpc":"1","prodhnumpad":"1","prodhnummobile":"1","imgWidthNum":"20","imgWidthNumpc":"25","imgWidthNumpad":"24","imgWidthNummobile":"17","newPicScale":"1:1","prodnum":"3","hangnumpc":"1","chk":"on","hangnumpad":"1","prodznumpc":"3","farpc":"3","far":"3"},"params":{"filelist":"https:\/\/cdn.yun.sooce.cn\/6\/34355\/png\/16305728176993e04d6a6d28531b1.png?version=1630572823,https:\/\/cdn.yun.sooce.cn\/6\/34355\/png\/16305728176993e04d6a6d28531b1.png?version=1630572823,https:\/\/cdn.yun.sooce.cn\/6\/34355\/png\/16305728176993e04d6a6d28531b1.png?version=1630572823,","titlelist":"\u7cbe\u51c6\u884c\u4e1a\u5206\u6790\u884c\u4e1a\u73b0\u72b6\u53ca\u75db\u70b9,\u884c\u4e1a\u6570\u5b57\u5316\u8f6c\u578b\u73b0\u72b6\u5206\u6790,\u63d0\u4f9b\u6570\u636e\u4ef7\u503c\u6d1e\u5bdf\u5206\u6790\u670d\u52a1,","subtitlelist":",,,","textlist":",,,","btnNamelist":",,,","btnTimelist":",,,","urllist":",,,","selectlist":",,,","groupNVallist":",,,","newspagelist":",,,","newsidlist":",,,","groupVallist":",,,","propagelist":",,,","proidlist":",,,","bgimglist":"\/images\/logoback.gif,\/images\/logoback.gif,\/images\/logoback.gif,"},"name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"text_style_01_1630566890819":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"87.33031674208145%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","left":"0%","top":"89px"},"pad":{"left":"0%","width":"97.7491961414791%","top":"43px"},"mobile":{"width":"96%","font-size":"12px","color":"#333","line-height":"1.6","top":"43px","left":"2%"},"customCss":{"pc":{"@view_contents":{"color":"#ffffff"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u6587\u672c\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"}},"text_style_01_1630566890825":{"settingsBox":{"setList":{"\u5e38\u89c4":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"98.98989898989899%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","left":"0%","top":"0px"},"pad":{"left":"0.1853813559322034%","width":"98.72881355932203%"},"mobile":{"width":"96%","font-size":"12px","color":"#333","line-height":"1.6","top":"11px","left":"2%"},"customCss":{"pc":{"@view_contents":{"font-size":"40px","font-weight":"bold","color":"#ffffff"}},"mobile":{"@view_contents":{"font-size":"16px","text-align":"left"}},"pad":{"@view_contents":{"font-size":"24px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u6587\u672c\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"}},"div_a_includeBlock_1630567147408":{"settingsBox":{"setList":{"\u5e38\u89c4":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"initSettingElementEvent"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"a_includeBlock","styleShowName":"\u81ea\u7531\u5bb9\u5668","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"30.166666666666668%","height":"274px","box-sizing":"border-box","position":"absolute","left":"38.5%","top":"50px"},"pad":{"box-sizing":"border-box","height":"201px"},"mobile":{"box-sizing":"border-box","height":"129px","width":"46%","left":"2%","top":"321px"},"customCss":{"pc":{"modelArea":{"border-radius":"15px","background":"#ffffff"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668-\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"animate":"bounceInUp","duration":"1","delay":"0.25","iteration":"1","offset":"0"}},"image_style_01_1630567147663":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"60px","height":"60px","position":"absolute","left":"16.308321727019496%","top":"28px"},"pad":{"left":"9.903169014084508%","top":"19px","height":"50px","width":"50px"},"mobile":{"left":"4.823825503355705%","top":"10px","width":"30px","height":"30px"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","imgUrl":"\/images\/matLibrary\/webImg\/image01_default.jpg","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"data":{"imgUrl":"https:\/\/cdn.img.sooce.cn\/nicetuku\/202004\/21\/png\/1587468965011ba71d27fd80d46a8bff80a9d3128c7f5.png","imgStyle":{"pc":null,"pad":"3","mobile":"3"}},"params":{"filelist":"","urllist":"","propagelist":"","newspagelist":"","proidlist":"","groupVallist":"","newsidlist":"","groupNVallist":""}},"text_style_01_1630567147670":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"67.41573033707866%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","left":"16.29213483146067%","top":"120px"},"pad":{"left":"9.908670774647888%","width":"50%","top":"84.5px"},"mobile":{"width":"63.08724832214765%","font-size":"12px","color":"#333","line-height":"1.6","top":"51px","left":"4.823825503355705%"},"customCss":{"pc":{"@view_contents":{"font-size":"18px","font-weight":"bold","color":"#002a5c","text-align":"left"}},"mobile":{"@view_contents":{"font-size":"14px"}},"pad":{"@view_contents":{"font-size":"16px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u6587\u672c\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"}},"text_style_01_1630567147675":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"76.81564245810057%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","left":"16.457201086956523%","top":"162px"},"pad":{"left":"9.793133802816902%","width":"82.41758241758241%","top":"122.5px"},"mobile":{"width":"91.2751677852349%","font-size":"12px","color":"#333","line-height":"1.6","top":"80px","left":"4.786849710982659%"},"customCss":{"pc":{"@view_contents":{"color":"#888888","text-align":"left"}},"pad":{"@view_contents":{"font-size":"16px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u6587\u672c\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"}},"text_style_01_1630567147679":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"29.2817679558011%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","left":"68.46080801104972%","top":"18px"},"pad":{"left":"64.8981227106227%","width":"35.16483516483517%"},"mobile":{"width":"29.47976878612717%","font-size":"12px","color":"#333","line-height":"1.6","top":"6px","left":"65.9320809248555%"},"customCss":{"pc":{"@view_contents":{"font-size":"72px","color":"#f0f0f0","font-weight":"bold","line-height":"80px","text-indent":"0em","text-shadow":" 0px 0px 0px","padding-top":"0px","padding-right":"0px","letter-spacing":"5px"}},"mobile":{"@view_contents":{"font-size":"30px","font-weight":"bold","line-height":"30px"}},"pad":{"@view_contents":{"letter-spacing":"0px","font-size":"60px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u6587\u672c\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"mobile":[]}},"div_a_includeBlock_1630573326812":{"settingsBox":{"setList":{"\u5e38\u89c4":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"initSettingElementEvent"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"a_includeBlock","styleShowName":"\u81ea\u7531\u5bb9\u5668","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"30.166666666666668%","height":"274px","box-sizing":"border-box","position":"absolute","left":"69.83333333333334%","top":"50px"},"pad":{"box-sizing":"border-box","height":"201px"},"mobile":{"box-sizing":"border-box","height":"137px","width":"46%","left":"52.13333333333333%","top":"321px"},"customCss":{"pc":{"modelArea":{"border-radius":"15px","background":"#ffffff"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668-\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"animate":"bounceInUp","duration":"1","delay":"0.25","iteration":"1","offset":"0"}},"image_style_01_1630573326936":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"60px","height":"60px","position":"absolute","left":"16.308321727019496%","top":"28px"},"pad":{"left":"9.903169014084508%","top":"19px","height":"50px","width":"50px"},"mobile":{"left":"4.823825503355705%","top":"10px","width":"30px","height":"30px"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","imgUrl":"\/images\/matLibrary\/webImg\/image01_default.jpg","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"data":{"imgUrl":"https:\/\/cdn.img.sooce.cn\/nicetuku\/202004\/22\/png\/15875474790351aaf7163218f91d5997db5f84a192f36.png","imgStyle":{"pc":null,"pad":"3","mobile":"3"}},"params":{"filelist":"","urllist":"","propagelist":"","newspagelist":"","proidlist":"","groupVallist":"","newsidlist":"","groupNVallist":""}},"text_style_01_1630573326945":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"67.41573033707866%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","left":"16.29213483146067%","top":"120px"},"pad":{"left":"9.908670774647888%","width":"50%","top":"84.5px"},"mobile":{"width":"63.08724832214765%","font-size":"12px","color":"#333","line-height":"1.6","top":"51px","left":"4.823825503355705%"},"customCss":{"pc":{"@view_contents":{"font-size":"18px","font-weight":"bold","color":"#002a5c","text-align":"left"}},"mobile":{"@view_contents":{"font-size":"14px"}},"pad":{"@view_contents":{"font-size":"16px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u6587\u672c\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"}},"text_style_01_1630573326948":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"76.81564245810057%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","left":"16.457201086956523%","top":"162px"},"pad":{"left":"9.793133802816902%","width":"82.41758241758241%","top":"122.5px"},"mobile":{"width":"91.2751677852349%","font-size":"12px","color":"#333","line-height":"1.6","top":"80px","left":"4.786849710982659%"},"customCss":{"pc":{"@view_contents":{"color":"#888888","text-align":"left"}},"pad":{"@view_contents":{"font-size":"16px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u6587\u672c\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"}},"text_style_01_1630573326955":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"29.2817679558011%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","left":"68.46080801104972%","top":"18px"},"pad":{"left":"64.8981227106227%","width":"35.16483516483517%"},"mobile":{"width":"29.47976878612717%","font-size":"12px","color":"#333","line-height":"1.6","top":"6px","left":"65.9320809248555%"},"customCss":{"pc":{"@view_contents":{"font-size":"72px","color":"#f0f0f0","font-weight":"bold","line-height":"80px","text-indent":"0em","text-shadow":" 0px 0px 0px","padding-top":"0px","padding-right":"0px","letter-spacing":"5px"}},"mobile":{"@view_contents":{"font-size":"30px","font-weight":"bold","line-height":"30px"}},"pad":{"@view_contents":{"letter-spacing":"0px","font-size":"60px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u6587\u672c\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"mobile":[]}},"div_a_includeBlock_1630573342391":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"initSettingElementEvent"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"a_includeBlock","styleShowName":"\u81ea\u7531\u5bb9\u5668","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"30.166666666666668%","height":"274px","box-sizing":"border-box","position":"absolute","left":"38.5%","top":"330px"},"pad":{"box-sizing":"border-box","height":"206.5px"},"mobile":{"box-sizing":"border-box","height":"137px","width":"46%","left":"2%","top":"466px"},"customCss":{"pc":{"modelArea":{"border-radius":"15px","background":"#ffffff"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668-\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"animate":"bounceInUp","duration":"1","delay":"0.25","iteration":"1","offset":"0"}},"image_style_01_1630573342530":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"60px","height":"60px","position":"absolute","left":"16.308321727019496%","top":"28px"},"pad":{"left":"9.903169014084508%","top":"19px","height":"50px","width":"50px"},"mobile":{"left":"4.823825503355705%","top":"10px","width":"30px","height":"30px"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","imgUrl":"\/images\/matLibrary\/webImg\/image01_default.jpg","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"data":{"imgUrl":"https:\/\/cdn.img.sooce.cn\/nicetuku\/202004\/21\/png\/1587468965011656e4b721b0292e1dba62bd36a231747.png","imgStyle":{"pc":null,"pad":"3","mobile":"3"}},"params":{"filelist":"","urllist":"","propagelist":"","newspagelist":"","proidlist":"","groupVallist":"","newsidlist":"","groupNVallist":""}},"text_style_01_1630573342539":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"67.41573033707866%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","left":"16.29213483146067%","top":"120px"},"pad":{"left":"9.908670774647888%","width":"50%","top":"84.5px"},"mobile":{"width":"63.08724832214765%","font-size":"12px","color":"#333","line-height":"1.6","top":"51px","left":"4.823825503355705%"},"customCss":{"pc":{"@view_contents":{"font-size":"18px","font-weight":"bold","color":"#002a5c","text-align":"left"}},"mobile":{"@view_contents":{"font-size":"14px"}},"pad":{"@view_contents":{"font-size":"16px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u6587\u672c\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"}},"text_style_01_1630573342542":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"76.81564245810057%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","left":"16.457201086956523%","top":"162px"},"pad":{"left":"9.793133802816902%","width":"82.41758241758241%","top":"122.5px"},"mobile":{"width":"91.2751677852349%","font-size":"12px","color":"#333","line-height":"1.6","top":"80px","left":"4.786849710982659%"},"customCss":{"pc":{"@view_contents":{"color":"#888888","text-align":"left"}},"pad":{"@view_contents":{"font-size":"16px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u6587\u672c\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"}},"text_style_01_1630573342546":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"29.2817679558011%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","left":"68.46080801104972%","top":"18px"},"pad":{"left":"64.8981227106227%","width":"35.16483516483517%"},"mobile":{"width":"29.47976878612717%","font-size":"12px","color":"#333","line-height":"1.6","top":"6px","left":"65.9320809248555%"},"customCss":{"pc":{"@view_contents":{"font-size":"72px","color":"#f0f0f0","font-weight":"bold","line-height":"80px","text-indent":"0em","text-shadow":" 0px 0px 0px","padding-top":"0px","padding-right":"0px","letter-spacing":"5px"}},"mobile":{"@view_contents":{"font-size":"30px","font-weight":"bold","line-height":"30px"}},"pad":{"@view_contents":{"letter-spacing":"0px","font-size":"60px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u6587\u672c\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"mobile":[]}},"div_a_includeBlock_1630573354342":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"initSettingElementEvent"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"a_includeBlock","styleShowName":"\u81ea\u7531\u5bb9\u5668","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"30.166666666666668%","height":"274px","box-sizing":"border-box","position":"absolute","left":"69.83333333333334%","top":"330px"},"pad":{"box-sizing":"border-box","height":"201px"},"mobile":{"box-sizing":"border-box","height":"137px","width":"46%","left":"52.13333333333333%","top":"466px"},"customCss":{"pc":{"modelArea":{"border-radius":"15px","background":"#ffffff"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668-\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"animate":"bounceInUp","duration":"1","delay":"0.25","iteration":"1","offset":"0"}},"image_style_01_1630573354464":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"60px","height":"60px","position":"absolute","left":"16.308321727019496%","top":"28px"},"pad":{"left":"9.903169014084508%","top":"19px","height":"50px","width":"50px"},"mobile":{"left":"4.823825503355705%","top":"10px","width":"30px","height":"30px"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","imgUrl":"\/images\/matLibrary\/webImg\/image01_default.jpg","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"data":{"imgUrl":"https:\/\/cdn.img.sooce.cn\/nicetuku\/202004\/21\/png\/158746896501102a7a9e739cfa0165c094829b4daba3c.png","imgStyle":{"pc":null,"pad":"3","mobile":"3"}},"params":{"filelist":"","urllist":"","propagelist":"","newspagelist":"","proidlist":"","groupVallist":"","newsidlist":"","groupNVallist":""}},"text_style_01_1630573354473":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"67.41573033707866%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","left":"16.29213483146067%","top":"120px"},"pad":{"left":"9.908670774647888%","width":"50%","top":"84.5px"},"mobile":{"width":"63.08724832214765%","font-size":"12px","color":"#333","line-height":"1.6","top":"51px","left":"4.823825503355705%"},"customCss":{"pc":{"@view_contents":{"font-size":"18px","font-weight":"bold","color":"#002a5c","text-align":"left"}},"mobile":{"@view_contents":{"font-size":"14px"}},"pad":{"@view_contents":{"font-size":"16px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u6587\u672c\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"}},"text_style_01_1630573354477":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"76.81564245810057%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","left":"16.457201086956523%","top":"162px"},"pad":{"left":"9.793133802816902%","width":"82.41758241758241%","top":"122.5px"},"mobile":{"width":"91.2751677852349%","font-size":"12px","color":"#333","line-height":"1.6","top":"80px","left":"4.786849710982659%"},"customCss":{"pc":{"@view_contents":{"color":"#888888","text-align":"left"}},"pad":{"@view_contents":{"font-size":"16px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u6587\u672c\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"}},"text_style_01_1630573354485":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"29.2817679558011%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","left":"68.46080801104972%","top":"18px"},"pad":{"left":"64.8981227106227%","width":"35.16483516483517%"},"mobile":{"width":"29.47976878612717%","font-size":"12px","color":"#333","line-height":"1.6","top":"6px","left":"65.9320809248555%"},"customCss":{"pc":{"@view_contents":{"font-size":"72px","color":"#f0f0f0","font-weight":"bold","line-height":"80px","text-indent":"0em","text-shadow":" 0px 0px 0px","padding-top":"0px","padding-right":"0px","letter-spacing":"5px"}},"mobile":{"@view_contents":{"font-size":"30px","font-weight":"bold","line-height":"30px"}},"pad":{"@view_contents":{"letter-spacing":"0px","font-size":"60px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u6587\u672c\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"mobile":[]}},"layout_1630570610395":{"css":{"pc":{"height":"144px"},"content":{"overflow":"visible","max-width":"1200px"},"mobile":{"height":"59px"},"pad":{"height":"135px"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"},"needfix":null},"text_style_01_1630570610398":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"80%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","top":"70px","left":"10%"},"pad":{"left":"5.03711558854719%","width":"90%"},"mobile":{"width":"96%","font-size":"12px","color":"#333","line-height":"1.6","top":"12px","left":"2%"},"customCss":{"pc":{"@view_contents":{"font-size":"40px","font-weight":"bold","text-align":"center","color":"#002a5c"}},"mobile":{"@view_contents":{"font-size":"20px"}},"pad":{"@view_contents":{"font-size":"36px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u6587\u672c\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"layout_1630573551213":{"css":{"pc":{"height":"536.88889px"},"content":{"overflow":"visible","max-width":"1200px"},"pad":{"height":"471px"},"mobile":{"height":"672px"}},"needfix":null,"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"}},"div_a_includeBlock_1630573559188":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"initSettingElementEvent"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"a_includeBlock","styleShowName":"\u81ea\u7531\u5bb9\u5668","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"32%","height":"486px","box-sizing":"border-box","position":"absolute","top":"50px","left":"0%"},"pad":{"box-sizing":"border-box","height":"406px","width":"32%"},"mobile":{"width":"46%","height":"315px","box-sizing":"border-box","top":"10px","left":"2%"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668-\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"bounceInUp","duration":"1","delay":"0.25","iteration":"1","offset":"0"}},"image_style_01_1630573559725":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"100%","height":"313px","position":"absolute","left":"0%","top":"0px"},"pad":{"left":"0%","width":"100%","height":"241px"},"mobile":{"height":"132px","width":"100%","left":"0%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","imgUrl":"\/images\/matLibrary\/webImg\/image01_default.jpg","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"data":{"imgUrl":"https:\/\/cdn.yun.sooce.cn\/6\/34355\/png\/1630486196788a79cbe636bebf367.png?version=1630485886","imgStyle":{"pc":"3","pad":"3","mobile":"3"}},"params":{"filelist":"","urllist":"","propagelist":"","newspagelist":"","proidlist":"","groupVallist":"","newsidlist":"","groupNVallist":""}},"div_blank_new01_1630573600109":{"settingsBox":{"setList":{"\u5e38\u89c4":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5706\u5f62\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"blank_new01","styleSort":"99","styleKind":"\u56fe\u5f62\u6a21\u5757","styleHelpId":1248,"viewCtrl":"blank","mainColor":"#0080FF","css":{"pc":{"width":"90%","height":"231px","box-sizing":"border-box","position":"absolute","left":"5%","top":"227px"},"pad":{"box-sizing":"border-box","left":"4.966887417218543%","width":"90%","top":"166px","height":"204px"},"mobile":{"width":"90%","height":"180px","box-sizing":"border-box","top":"106px","left":"5.202312138728324%"},"customCss":{"pc":{"modelArea":{"box-sizing":"border-box","background":"#ffffff","border-radius":"10px"},"@modSet":{"background":"#ffffff","border-radius":"10px","box-shadow":"#cccccc 0px 0px 10px "}},"pad":{"modelArea":{"box-sizing":"border-box"}},"mobile":{"modelArea":{"box-sizing":"border-box"}}},"content":{"overflow":"visible"}},"lock":{"height":"false"},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u56fe\u5f62\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"}},"image_style_12_1_1630573703734":{"settingsBox":{"setList":{"\u5e38\u89c4":{"isDefault":"true","mod":"viewSettingsHcl","act":"photoConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_12_1","diyShowName":"\u56fe\u6587\u98ce\u683c01","styleShowName":"\u56fe\u6587\u98ce\u683c01","styleKind":"\u56fe\u6587\u7ec4","styleHelpId":"","viewCtrl":"photo","css":{"pc":{"width":"80%","position":"absolute","top":"265px","left":"10%"},"pad":{"left":"10.099337748344372%","top":"186px"},"mobile":{"width":"80%","top":"118.5px","left":"9.826589595375722%"},"content":{"overflow":"hidden"},"customCss":{"pc":{"@titProSet":{"font-size":"18px","font-weight":"bold","color":"#002a5c","margin-bottom":"5px"},"@defProSet":{"font-size":"16px","color":"#888888","padding-bottom":"20px"},"@btnSet":{"color":"#0c5adb","font-size":"16px","border-style":"solid","border-width":"1px","border-color":"#0c5adb","height":"40px","line-height":"40px","border-radius":"10px"},"@modSet:hover#@btnSet":{"background":"#0c5adb","color":"#ffffff"}},"pad":{"@titProSet":{"font-size":"16px"},"@defProSet":{"font-size":"14px","padding-bottom":"10px"},"@btnSet":{"line-height":"35px","height":"35px","font-size":"14px"}},"mobile":{"@titProSet":{"font-size":"14px","margin-bottom":"0px"},"@defProSet":{"font-size":"12px","padding-bottom":"5px"},"@btnSet":{"font-size":"12px","line-height":"25px","height":"25px","margin-left":"20px","margin-right":"20px"}}}},"lock":{"height":"true"},"doubleClickFunc":"photoGroupSelect6","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"photoGroupSelect4()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","params":{"filelist":"\/images\/matLibrary\/webImg\/pets01.jpg,","titlelist":"\u4e0a\u6d77\u96c5\u8fd0,","subtitlelist":",","textlist":"\u4f20\u7edf\u884c\u4e1a\u7684\u4fe1\u606f\u5316\u9700\u8981\u5c3d\u65e9\u505a\u597d\u89c4\u5212\uff0c \u4f01\u4e1a\u666e\u904d\u7ecf\u8425\u538b\u529b\u5927\uff0c\u6240\u4ee5\u6570\u5b57\u5316...,","btnNamelist":"\u67e5\u770b\u66f4\u591a,","btnTimelist":",","urllist":",","selectlist":"bossType-1&selectVal-401091,","groupNVallist":",","newspagelist":",","newsidlist":",","groupVallist":",","propagelist":",","proidlist":",","bgimglist":"\/images\/logoback.gif,"},"data":{"prodhnum":"1","prodhnumpc":"1","prodhnumpad":"1","prodhnummobile":"1","imgWidthNum":"1","imgWidthNumpc":"1","imgWidthNumpad":"1","imgWidthNummobile":"1","prodznum":"2","prodznumpc":"2","prodznumpad":"2","prodznummobile":"2","chkbtn":"on","prodnum":"1","hangnumpc":"1","hangnumpad":"1","hangnummobile":"1"},"name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"div_a_includeBlock_1630574572816":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"initSettingElementEvent"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"a_includeBlock","styleShowName":"\u81ea\u7531\u5bb9\u5668","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"32%","height":"486px","box-sizing":"border-box","position":"absolute","top":"50px","left":"34%"},"pad":{"box-sizing":"border-box","height":"406px","width":"32%"},"mobile":{"width":"46%","height":"315px","box-sizing":"border-box","top":"10px","left":"52%"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668-\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"bounceInUp","duration":"1","delay":"0.25","iteration":"1","offset":"0"}},"image_style_01_1630574572963":{"settingsBox":{"setList":{"\u5e38\u89c4":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"100%","height":"313px","position":"absolute","left":"0%","top":"0px"},"pad":{"left":"0%","width":"100%","height":"241px"},"mobile":{"height":"132px","width":"100%","left":"0%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","imgUrl":"\/images\/matLibrary\/webImg\/image01_default.jpg","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"data":{"imgUrl":"https:\/\/cdn.yun.sooce.cn\/6\/34355\/png\/1630486203743715b78195b7a7332.png?version=1630485892","imgStyle":{"pc":"3","pad":"3","mobile":"3"}},"params":{"filelist":"","urllist":"","propagelist":"","newspagelist":"","proidlist":"","groupVallist":"","newsidlist":"","groupNVallist":""}},"div_blank_new01_1630574572973":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5706\u5f62\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"blank_new01","styleSort":"99","styleKind":"\u56fe\u5f62\u6a21\u5757","styleHelpId":1248,"viewCtrl":"blank","mainColor":"#0080FF","css":{"pc":{"width":"90%","height":"231px","box-sizing":"border-box","position":"absolute","left":"5%","top":"227px"},"pad":{"box-sizing":"border-box","left":"4.966887417218543%","width":"90%","top":"166px","height":"204px"},"mobile":{"width":"90%","height":"180px","box-sizing":"border-box","top":"106px","left":"5.202312138728324%"},"customCss":{"pc":{"modelArea":{"box-sizing":"border-box","background":"#ffffff","border-radius":"10px"},"@modSet":{"background":"#ffffff","border-radius":"10px","box-shadow":"#cccccc 0px 0px 10px "}},"pad":{"modelArea":{"box-sizing":"border-box"}},"mobile":{"modelArea":{"box-sizing":"border-box"}}},"content":{"overflow":"visible"}},"lock":{"height":"false"},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u56fe\u5f62\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"}},"image_style_12_1_1630574572979":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"photoConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_12_1","diyShowName":"\u56fe\u6587\u98ce\u683c01","styleShowName":"\u56fe\u6587\u98ce\u683c01","styleKind":"\u56fe\u6587\u7ec4","styleHelpId":"","viewCtrl":"photo","css":{"pc":{"width":"80%","position":"absolute","top":"265px","left":"10%"},"pad":{"left":"10.099337748344372%","top":"186px"},"mobile":{"width":"80%","top":"118.5px","left":"9.826589595375722%"},"content":{"overflow":"hidden"},"customCss":{"pc":{"@titProSet":{"font-size":"18px","font-weight":"bold","color":"#002a5c","margin-bottom":"5px"},"@defProSet":{"font-size":"16px","color":"#888888","padding-bottom":"20px"},"@btnSet":{"color":"#0c5adb","font-size":"16px","border-style":"solid","border-width":"1px","border-color":"#0c5adb","height":"40px","line-height":"40px","border-radius":"10px"},"@modSet:hover#@btnSet":{"background":"#0c5adb","color":"#ffffff"}},"pad":{"@titProSet":{"font-size":"16px"},"@defProSet":{"font-size":"14px","padding-bottom":"10px"},"@btnSet":{"line-height":"35px","height":"35px","font-size":"14px"}},"mobile":{"@titProSet":{"font-size":"14px","margin-bottom":"0px"},"@defProSet":{"font-size":"12px","padding-bottom":"5px"},"@btnSet":{"font-size":"12px","line-height":"25px","height":"25px","margin-left":"20px","margin-right":"20px"}}}},"lock":{"height":"true"},"doubleClickFunc":"photoGroupSelect6","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"photoGroupSelect4()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","params":{"filelist":"\/images\/matLibrary\/webImg\/pets01.jpg,","titlelist":"\u6c5f\u82cf\u4e2d\u6cd5\u6c34\u52a1,","subtitlelist":",","textlist":"\u76d2\u4fe1\u4e91\u7684\u79fb\u52a8\u7aef\u5f00\u53d1\u5e73\u53f0\u4f5c\u4e3a\u4e00\u4e2a\u80fd\u591f\u6574\u5408\u5404\u7c7b\u4e1a\u52a1\u5e94\u7528\uff0c\u5e76\u4e14\u80fd\u591f\u5feb\u901f\u654f\u6377...,","btnNamelist":"\u67e5\u770b\u66f4\u591a,","btnTimelist":",","urllist":",","selectlist":"bossType-1&selectVal-401823,","groupNVallist":",","newspagelist":",","newsidlist":",","groupVallist":",","propagelist":",","proidlist":",","bgimglist":"\/images\/logoback.gif,"},"data":{"prodhnum":"1","prodhnumpc":"1","prodhnumpad":"1","prodhnummobile":"1","imgWidthNum":"1","imgWidthNumpc":"1","imgWidthNumpad":"1","imgWidthNummobile":"1","prodznum":"2","prodznumpc":"2","prodznumpad":"2","prodznummobile":"2","chkbtn":"on","prodnum":"1","hangnumpc":"1","hangnumpad":"1","hangnummobile":"1"},"name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"div_a_includeBlock_1630574581011":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"initSettingElementEvent"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"a_includeBlock","styleShowName":"\u81ea\u7531\u5bb9\u5668","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"32%","height":"486px","box-sizing":"border-box","position":"absolute","top":"50px","left":"68%"},"pad":{"box-sizing":"border-box","height":"406px","width":"32%"},"mobile":{"width":"46%","height":"315px","box-sizing":"border-box","top":"341px","left":"2%"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668-\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"bounceInUp","duration":"1","delay":"0.25","iteration":"1","offset":"0"}},"image_style_01_1630574581375":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"100%","height":"313px","position":"absolute","left":"0%","top":"0px"},"pad":{"left":"0%","width":"100%","height":"241px"},"mobile":{"height":"132px","width":"100%","left":"0%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","imgUrl":"\/images\/matLibrary\/webImg\/image01_default.jpg","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"data":{"imgUrl":"https:\/\/cdn.yun.sooce.cn\/6\/34355\/png\/163048619963842df920cb59e3b90.png?version=1630485888","imgStyle":{"pc":"3","pad":"3","mobile":"3"}},"params":{"filelist":"","urllist":"","propagelist":"","newspagelist":"","proidlist":"","groupVallist":"","newsidlist":"","groupNVallist":""}},"div_blank_new01_1630574581387":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5706\u5f62\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"blank_new01","styleSort":"99","styleKind":"\u56fe\u5f62\u6a21\u5757","styleHelpId":1248,"viewCtrl":"blank","mainColor":"#0080FF","css":{"pc":{"width":"90%","height":"231px","box-sizing":"border-box","position":"absolute","left":"5%","top":"227px"},"pad":{"box-sizing":"border-box","left":"4.966887417218543%","width":"90%","top":"166px","height":"204px"},"mobile":{"width":"90%","height":"180px","box-sizing":"border-box","top":"106px","left":"5.202312138728324%"},"customCss":{"pc":{"modelArea":{"box-sizing":"border-box","background":"#ffffff","border-radius":"10px"},"@modSet":{"background":"#ffffff","border-radius":"10px","box-shadow":"#cccccc 0px 0px 10px "}},"pad":{"modelArea":{"box-sizing":"border-box"}},"mobile":{"modelArea":{"box-sizing":"border-box"}}},"content":{"overflow":"visible"}},"lock":{"height":"false"},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u56fe\u5f62\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"}},"image_style_12_1_1630574581392":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"photoConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_12_1","diyShowName":"\u56fe\u6587\u98ce\u683c01","styleShowName":"\u56fe\u6587\u98ce\u683c01","styleKind":"\u56fe\u6587\u7ec4","styleHelpId":"","viewCtrl":"photo","css":{"pc":{"width":"80%","position":"absolute","top":"265px","left":"10%"},"pad":{"left":"10.099337748344372%","top":"186px"},"mobile":{"width":"80%","top":"118.5px","left":"9.826589595375722%"},"content":{"overflow":"hidden"},"customCss":{"pc":{"@titProSet":{"font-size":"18px","font-weight":"bold","color":"#002a5c","margin-bottom":"5px"},"@defProSet":{"font-size":"16px","color":"#888888","padding-bottom":"20px"},"@btnSet":{"color":"#0c5adb","font-size":"16px","border-style":"solid","border-width":"1px","border-color":"#0c5adb","height":"40px","line-height":"40px","border-radius":"10px"},"@modSet:hover#@btnSet":{"background":"#0c5adb","color":"#ffffff"}},"pad":{"@titProSet":{"font-size":"16px"},"@defProSet":{"font-size":"14px","padding-bottom":"10px"},"@btnSet":{"line-height":"35px","height":"35px","font-size":"14px"}},"mobile":{"@titProSet":{"font-size":"14px","margin-bottom":"0px"},"@defProSet":{"font-size":"12px","padding-bottom":"5px"},"@btnSet":{"font-size":"12px","line-height":"25px","height":"25px","margin-left":"20px","margin-right":"20px"}}}},"lock":{"height":"true"},"doubleClickFunc":"photoGroupSelect6","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"photoGroupSelect4()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","params":{"filelist":"\/images\/matLibrary\/webImg\/pets01.jpg,","titlelist":"\u51ef\u8000\u7167\u660e,","subtitlelist":",","textlist":"\u51ef\u8000\u7167\u660e\u63d0\u51fa\u4e86\u5efa\u2f74\u7edf\u2f00\u6570\u636e\u3001\u7edf\u2f00\u5e73\u53f0\u3001\u7edf\u2f00\u8fd0\u8425\u7684\u4fe1\u606f\u5e73\u53f0\u2f6c\u6807\uff0c\u7ed3\u5408...,","btnNamelist":"\u67e5\u770b\u66f4\u591a,","btnTimelist":",","urllist":",","selectlist":"bossType-1&selectVal-401819,","groupNVallist":",","newspagelist":",","newsidlist":",","groupVallist":",","propagelist":",","proidlist":",","bgimglist":"\/images\/logoback.gif,"},"data":{"prodhnum":"1","prodhnumpc":"1","prodhnumpad":"1","prodhnummobile":"1","imgWidthNum":"1","imgWidthNumpc":"1","imgWidthNumpad":"1","imgWidthNummobile":"1","prodznum":"2","prodznumpc":"2","prodznumpad":"2","prodznummobile":"2","chkbtn":"on","prodnum":"1","hangnumpc":"1","hangnumpad":"1","hangnummobile":"1"},"name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"layout_1630570636152":{"css":{"pc":{"height":"144px"},"content":{"overflow":"visible","max-width":"1200px"},"mobile":{"height":"59px"},"pad":{"height":"135px"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"},"needfix":null},"text_style_01_1630570636153":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"80%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","top":"70px","left":"10%"},"pad":{"left":"5.03711558854719%","width":"90%"},"mobile":{"width":"96%","font-size":"12px","color":"#333","line-height":"1.6","top":"12px","left":"2%"},"customCss":{"pc":{"@view_contents":{"font-size":"40px","font-weight":"bold","text-align":"center","color":"#002a5c"}},"mobile":{"@view_contents":{"font-size":"20px"}},"pad":{"@view_contents":{"font-size":"36px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u6587\u672c\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"layout_1630574649840":{"css":{"pc":{"height":"361px"},"content":{"overflow":"visible","max-width":"1200px"},"mobile":{"height":"905px"},"pad":{"height":"344px"}},"needfix":null,"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"},"autoHeight":"true"},"newsList_style_04_1630574685667":{"settingsBox":{"setList":{"\u5e38\u89c4":{"isDefault":"true","mod":"viewSettingsBhj","act":"newListCfg","setupFunc":"newListSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u65b0\u95fb\u5217\u8868\u5c5e\u6027\u8bbe\u7f6e"},"styleHelpId":1266,"style":"style_04","diyShowName":"\u65b0\u95fb\u5217\u8868-\u98ce\u683c4","styleShowName":"\u98ce\u683c4","styleKind":"AAA","styleSort":"9998","viewCtrl":"newsList","css":{"pc":{"width":"100%","position":"absolute","top":"50px","left":"0%"},"pad":[],"mobile":{"width":"96%","top":"10px","left":"2%"},"customCss":{"pc":{"@imgSet":{"border-radius":"10px"},"@titleSet":{"font-size":"18px","color":"#002a5c","font-weight":"bold","padding-left":"15px","padding-right":"15px","line-height":"25px"},"@modSet":{"box-shadow":"#e5e5e5 0px 0px 10px ","border-radius":"10px"},"@modSet:hover":{"box-shadow":"#cccccc 0px 0px 10px "}},"pad":{"@titleSet":{"font-size":"16px"}},"mobile":{"@titleSet":{"font-size":"14px"}}}},"lock":{"height":"true"},"params":{"titlenum":10,"detailnum":10,"animate":"bounceInUp","duration":"1","delay":"0.25","iteration":"1","offset":"0"},"data":{"newsShow":["pic","title"],"hidden":null,"comments_num":10,"sort":"id","property_disable":[".picScale","._column"],"newsnum":"3","column":1,"gid":0,"newPicScale":"2:3","newshnumpc":"3","newshnum":"1","newsznumpc":"2","newsznum":"2","titlenum":"30","newshnummobile":"1","newsSort":"time"},"newList":{"pic":"\u56fe\u7247","date":"\u65e5\u671f","title":"\u6807\u9898","kind":"\u7c7b\u522b","summary":"\u6458\u8981","page":"\u5206\u9875","article":"\u67e5\u770b\u5168\u6587"},"newshnum":4,"newshnumpad":3,"newshnummobile":2,"newsznum":1,"tnum":10,"dnum":10,"name":"newsList","kind":"\u65b0\u95fb\u6a21\u5757","showname":"\u65b0\u95fb\u5217\u8868","eventSet":{"scrollView":"none","type":"none"}},"layout_1630564814052":{"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","css":{"content":{"overflow":"visible","max-width":"1200px"},"pc":{"height":"61px"},"pad":{"height":"53px"},"mobile":{"height":"1px"}},"settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"}},"layout_1630575378462":{"needfix":null,"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","css":{"content":{"overflow":"visible","max-width":"1200px"},"pc":{"height":"1px"},"pad":{"height":"1px"}}},"layout_1647221286948":{"needfix":null,"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","css":{"content":{"overflow":"visible","max-width":"1200px"}}},"comm_layout_footer":{"diyShowName":"\u5171\u4eab\u5e95\u90e8","css":{"pc":{"height":"380px","z-index":"99999"},"content":{"max-width":"1200px"},"pad":{"height":"345px"},"mobile":{"height":"83px"},"customCss":{"pc":{"modelArea":{"background":"#070b3b"}}}},"settingsBox":{"showTitle":"\u5171\u4eab\u5e95\u90e8\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"}},"copyright_style_01_1630575370754":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"copyrightConfig","setupFunc":"copyrightSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6309\u94ae\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u7248\u6743\u4fe1\u606f-\u98ce\u683c1","styleShowName":"\u7248\u6743\u4fe1\u606f-\u98ce\u683c1","styleKind":"AAA","viewCtrl":"default","css":{"pc":{"width":"83.33333333333334%","position":"absolute","top":"338px","left":"5.125%"},"pad":{"left":"8.324496288441145%","top":"293px"},"mobile":{"width":"100%","top":"25px","left":"0%"},"content":{"overflow":"visible"}},"lock":{"height":"true"},"data":{"copyright_info":"Copyright @ 2019-2022 Company name All rights reserved.","icp_info":"\u7ca4ICP\u590714000000\u53f7","lw_info":"\u7ca4\u516c\u7f51\u5b89\u590744000000000000\u53f7","show_copyright":"1","show_icp":"1","show_lw":"1"},"name":"copyright","kind":"\u5e95\u90e8\u83dc\u5355","showname":"\u7248\u6743\/\u5907\u6848","eventSet":{"scrollView":"none","type":"none"}},"div_a_includeBlock_1630575385385":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"blankDivConfig","setupFunc":"initSettingElementEvent"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"a_includeBlock","styleShowName":"\u81ea\u7531\u5bb9\u5668","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"100%","height":"333px","box-sizing":"border-box","position":"absolute","top":"0%","left":"0%"},"pad":{"box-sizing":"border-box","height":"259px"},"mobile":{"width":"100%","height":"300px","box-sizing":"border-box","top":"0px","left":"0%","display":"none"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668-\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"}},"footerCustom_footerDh_01_1630579660451":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsB","act":"dhConfig","setupFunc":"dhSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bfc\u822a\u83dc\u5355\u5c5e\u6027\u8bbe\u7f6e"},"styleHelpId":1257,"style":"footerDh_01","diyShowName":"\u5bfc\u822a\u5217\u8868\u98ce\u683c","styleShowName":"\u5bfc\u822a\u5217\u8868\u98ce\u683c","styleKind":"\u5bfc\u822a\u5217\u8868\u6a21\u5757","viewCtrl":"default","css":{"pc":{"width":"43.416666666666664%","z-index":"999","position":"absolute","left":"26.541666666666668%","top":"25px"},"pad":{"z-index":"999","left":"26.82926829268293%","width":"56.9459172852598%","top":"25px"},"mobile":{"width":"98%","z-index":"999","top":"0px","left":"1%"},"content":{"overflow":"visible"},"customCss":{"pc":{"@mainMenuSet":{"text-align":"left","font-size":"18px","padding-bottom":"15px","color":"#0c5adb"},"@subMenuSet":{"font-size":"16px","color":"#ffffff","padding-bottom":"10px","text-align":"left"},"@mainMenuSet:hover":{"color":"#0c5adb"},"%hot>a":{"color":"#0c5adb"},"%hot#@aview":{"color":"#0c5adb"},"@subMenuSet:hover":{"color":"#ffffff"},"%subCurSet":{"color":"#ffffff"}},"pad":{"@dhAreaSet":{"padding-left":"10px","padding-right":"10px","margin-left":"40px","margin-right":"25px"}}}},"lock":{"height":"true"},"data":{"childMenuType":"1","dhOpen":"on","subtitlename":"off","logoposition":"0","logoopen":"off","logoright":"","logoleft":"","contentWidth":"","hanghnumpc":"3","hanghnumpad":"5","hanghnummobile":"4","hanghnum":"3","showpc":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],"showmobile":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]},"name":"footerCustom","kind":"\u5e95\u90e8\u83dc\u5355","showname":"\u5e95\u90e8\u5bfc\u822a","eventSet":{"scrollView":"none","type":"none"}},"text_style_01_1630580891744":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"18%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","left":"1.2334801762114538%","top":"106.5px"},"pad":{"left":"0%","width":"23.966065747614%","top":"103.5px"},"mobile":{"width":"50%","font-size":"12px","color":"#333","line-height":"1.6","top":"0px","left":"25%"},"customCss":{"pc":{"@view_contents":{"color":"#ffffff","text-align":"center","padding-left":"0px","padding-right":"0px","margin-left":"6px","margin-right":"6px"}},"pad":{"@view_contents":{"margin-left":"0px","margin-right":"0px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u6587\u672c\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"}},"image_style_13_1_1630581145175":{"settingsBox":{"setList":{"\u5e38\u89c4":{"isDefault":"true","mod":"viewSettingsHcl","act":"photoConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_13_1","diyShowName":"\u56fe\u6587\u98ce\u683c02","styleShowName":"\u56fe\u6587\u98ce\u683c02","styleKind":"\u56fe\u6587\u7ec4","styleHelpId":"","viewCtrl":"photo","css":{"pc":{"width":"27.166666666666668%","position":"absolute","left":"71.08333333333333%","top":"103px"},"pad":{"left":"71.26193001060446%","width":"28.738069989395548%","top":"32px"},"mobile":{"width":"94%","top":"0px","left":"3%"},"content":{"overflow":"visible"},"customCss":{"pc":{"@titleSet":{"color":"#ffffff","line-height":"25px"},"@imgSet":{"background":"rgba(255,255,255,0)"}},"pad":{"@titleSet":{"height":"25px"}}}},"lock":{"height":"true"},"doubleClickFunc":"photoGroupSelect6","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"photoGroupSelect6()","ico":"fa-file-image-o"}],"newPicScale":"2:3","sizeCallbackFunc":"setImgCen","data":{"prodhnum":"1","prodhnumpc":"1","prodhnumpad":"2","prodhnummobile":"1","imgWidthNum":"25","imgWidthNumpc":"25","imgWidthNumpad":"25","imgWidthNummobile":"160","newPicScale":"1:1","prodnum":"1","hangnumpc":"1","chk":"on"},"params":{"filelist":"https:\/\/cdn.img.sooce.cn\/nicetuku\/202004\/23\/png\/1587643549280ae03b0322b75204445a2a8eee481def9.png,","titlelist":"\u552e\u524d\u54a8\u8be2\u70ed\u7ebf,","subtitlelist":",","textlist":",","btnNamelist":",","btnTimelist":",","urllist":",","selectlist":",","groupNVallist":",","newspagelist":",","newsidlist":",","groupVallist":",","propagelist":",","proidlist":",","bgimglist":"\/images\/logoback.gif,"},"name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"text_style_01_1630581224014":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"26.583333333333332%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","left":"71.08333333333333%","top":"143.5px"},"pad":{"left":"71.82197773064686%","top":"62px","width":"214px"},"mobile":{"width":"50%","font-size":"12px","color":"#333","line-height":"1.6","top":"32px","left":"25%"},"customCss":{"pc":{"@view_contents":{"color":"#ffffff","text-align":"left","padding-left":"0px","padding-right":"0px","margin-left":"0px","margin-right":"0px","font-weight":"bold","font-size":"18px","letter-spacing":"1px","margin-top":"-8px","margin-bottom":"-6px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u6587\u672c\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"image_style_13_1_1630581558749":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"photoConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_13_1","diyShowName":"\u56fe\u6587\u98ce\u683c02","styleShowName":"\u56fe\u6587\u98ce\u683c02","styleKind":"\u56fe\u6587\u7ec4","styleHelpId":"","viewCtrl":"photo","css":{"pc":{"width":"27.166666666666668%","position":"absolute","left":"71.08333333333333%","top":"169px"},"pad":{"width":"28.63202545068929%","left":"71.08297985153764%","top":"119px"},"mobile":{"width":"94%","top":"0px","left":"0%"},"content":{"overflow":"visible"},"customCss":{"pc":{"@titleSet":{"color":"#ffffff","line-height":"25px"}},"pad":{"@titleSet":{"padding-left":"10px"},"@imgSet":{"height":"25px"}}}},"lock":{"height":"true"},"doubleClickFunc":"photoGroupSelect6","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"photoGroupSelect6()","ico":"fa-file-image-o"}],"newPicScale":"2:3","sizeCallbackFunc":"setImgCen","data":{"prodhnum":"1","prodhnumpc":"1","prodhnumpad":"2","prodhnummobile":"1","imgWidthNum":"25","imgWidthNumpc":"25","imgWidthNumpad":"25","imgWidthNummobile":"160","newPicScale":"1:1","prodnum":"1","hangnumpc":"1","chk":"on"},"params":{"filelist":"https:\/\/cdn.yun.sooce.cn\/6\/34355\/png\/163058137275546bd9ff5a3ee0e8d.png?version=1630581061,","titlelist":"\u552e\u524d\u5ba2\u670d\u90ae\u7bb1,","subtitlelist":",","textlist":",","btnNamelist":",","btnTimelist":",","urllist":",","selectlist":",","groupNVallist":",","newspagelist":",","newsidlist":",","groupVallist":",","propagelist":",","proidlist":",","bgimglist":"\/images\/logoback.gif,"},"name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"text_style_01_1630581574079":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u672c\u6a21\u5757","styleKind":"\u6587\u672c\u6a21\u5757","styleSort":"99","viewCtrl":"default","css":{"pc":{"width":"26.583333333333332%","font-size":"16px","color":"#333","line-height":"1.8","font-family":"Microsoft YaHei","position":"absolute","left":"71.08333333333333%","top":"205px"},"pad":{"left":"71.29175503711559%","top":"149px"},"mobile":{"width":"50%","font-size":"12px","color":"#333","line-height":"1.6","top":"0px","left":"0%"},"customCss":{"pc":{"@view_contents":{"color":"#ffffff","text-align":"left","padding-left":"0px","padding-right":"0px","margin-left":"6px","margin-right":"6px","font-weight":"normal","font-size":"18px","letter-spacing":"1px","margin-top":"-10px"}},"pad":{"@view_contents":{"margin-left":"0px","margin-right":"0px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u6587\u672c\u6a21\u5757","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"image_style_01_1630580807962":{"settingsBox":{"setList":{"\u5e38\u89c4":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"17.885462555066077%","height":"71px","position":"absolute","left":"3.039647577092511%","top":"32px","z-index":"9999"},"pad":[],"mobile":{"height":"64px","top":"50px","left":"47.205396475770925%","width":"5.589207048458149%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","imgUrl":"\/images\/matLibrary\/webImg\/image01_default.jpg","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"data":{"imgUrl":"https:\/\/wds-service-1258344699.file.myqcloud.com\/20\/29709\/png\/164717998920956fdbcb4e2a85145.png?version=1647179991","imgStyle":{"pc":"4","pad":null,"mobile":null},"showtarget":"1","selectVal":"103486"},"params":{"filelist":"","urllist":"","propagelist":"","newspagelist":"","proidlist":"","groupVallist":"","newsidlist":"","groupNVallist":""},"setFixed":"2","moveEdit":[]}}
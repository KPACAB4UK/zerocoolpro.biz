var c_cache=[];
function RunAjaxJS(a,c){var b=new Date,d=!1,b=b.getTime(),e=/<script.*?>(.|[\r\n])*?<\/script>/ig,f=e.exec(c);if(null!=f){for(var g=Array(f.shift()),d=!0;f;)f=e.exec(c),null!=f&&g.push(f.shift());for(e=0;e<g.length;e++)c=c.replace(g[e],'<span id="'+b+e+'" style="display:none;"></span>')}$("#"+a).html(c);if(d)for(d=/<script.*?>((.|[\r\n])*?)<\/script>/ig,e=0;e<g.length;e++){var h=document.getElementById(b+""+e),f=h.parentNode;f.removeChild(h);d.lastIndex=0;h=d.exec(g[e]);f=f.appendChild(document.createElement("script"));f.text=
h[1];h=g[e].substring(g[e].indexOf(" ",0),g[e].indexOf(">",0)).split(" ");if(1<h.length)for(var l=0;l<h.length;l++)if(0<h[l].length){var k=h[l].split("=");k[1]=k[1].substr(1,k[1].length-2);f.setAttribute(k[0],k[1])}}}
function IPMenu(a,c,b,d){var e=[];e[0]='<a href="https://www.nic.ru/whois/?ip='+a+'" target="_blank">'+c+"</a>";e[1]='<a href="'+dle_root+dle_admin+"?mod=iptools&ip="+a+'" target="_blank">'+b+"</a>";e[2]='<a href="'+dle_root+dle_admin+"?mod=blockip&ip="+a+'" target="_blank">'+d+"</a>";return e}
function ajax_save_for_edit(a,c){var b={};"1"==quick_wysiwyg&&submit_all_data();"2"==quick_wysiwyg&&tinyMCE.triggerSave();$.each($("#ajaxnews"+a).serializeArray(),function(a,c){-1!=c.name.indexOf("xfield")&&(b[c.name]=c.value)});document.getElementById("allow_br_"+a).checked&&(b.allow_br=1);document.getElementById("approve_"+a).checked&&(b.approve=1);b.news_txt=$("#dleeditnews"+a).val();b.full_txt=$("#dleeditfullnews"+a).val();b.title=$("#edit-title-"+a).val();b.reason=$("#edit-reason-"+a).val();
b.id=a;b.field=c;b.action="save";ShowLoading("");$.post(dle_root+"engine/ajax/editnews.php",b,function(a){HideLoading("");"ok"!=a?DLEalert(a,dle_info):($("#dlepopup-news-edit").dialog("close"),DLEconfirm(dle_save_ok,dle_confirm,function(){location.reload(!0)}))});return!1}
function ajax_prep_for_edit(a,c){for(var b=0,d=c_cache.length;b<d;b++)b in c_cache&&(c_cache[b]||""!=c_cache[b])&&ajax_cancel_comm_edit(b);ShowLoading("");$.get(dle_root+"engine/ajax/editnews.php",{id:a,field:c,action:"edit"},function(b){HideLoading("");var d="none";$("#modal-overlay").remove();$("body").prepend('<div id="modal-overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #666666; opacity: .40;filter:Alpha(Opacity=40); z-index: 999; display:none;"></div>');
$("#modal-overlay").css({filter:"alpha(opacity=40)"}).fadeIn();var g={};g[dle_act_lang[3]]=function(){$(this).dialog("close")};g[dle_act_lang[4]]=function(){ajax_save_for_edit(a,c)};$("#dlepopup-news-edit").remove();$("body").prepend("<div id='dlepopup-news-edit' class='dlepopupnewsedit' title='"+menu_short+"' style='display:none'></div>");$(".dlepopupnewsedit").html("");$("#dlepopup-news-edit").dialog({autoOpen:!0,width:"800",height:500,buttons:g,resizable:!1,dialogClass:"modalfixed",dragStart:function(a,
b){d=$(".modalfixed").css("box-shadow");$(".modalfixed").css("box-shadow","none")},dragStop:function(a,b){$(".modalfixed").css("box-shadow",d)},close:function(a,b){$(this).dialog("destroy");$("#modal-overlay").fadeOut(function(){$("#modal-overlay").remove()})}});830<$(window).width()&&530<$(window).height()&&($(".modalfixed.ui-dialog").css({position:"fixed"}),$("#dlepopup-news-edit").dialog("option","position",["0","0"]));RunAjaxJS("dlepopup-news-edit",b)});return!1}
function ajax_comm_edit(a,c){for(var b=0,d=c_cache.length;b<d;b++)b in c_cache&&""!=c_cache[b]&&ajax_cancel_comm_edit(b);c_cache[a]&&""!=c_cache[a]||(c_cache[a]=$("#comm-id-"+a).html());ShowLoading("");$.get(dle_root+"engine/ajax/editcomments.php",{id:a,area:c,action:"edit"},function(b){HideLoading("");RunAjaxJS("comm-id-"+a,b);setTimeout(function(){$("html,body").stop().animate({scrollTop:$("#comm-id-"+a).offset().top-70},700)},100)});return!1}
function ajax_cancel_comm_edit(a){""!=c_cache[a]&&$("#comm-id-"+a).html(c_cache[a]);c_cache[a]="";return!1}function ajax_save_comm_edit(a,c){"1"==dle_wysiwyg&&submit_all_data();"2"==dle_wysiwyg&&tinyMCE.triggerSave();var b=$("#dleeditcomments"+a).val();ShowLoading("");$.post(dle_root+"engine/ajax/editcomments.php",{id:a,comm_txt:b,area:c,action:"save"},function(b){HideLoading("");c_cache[a]="";$("#comm-id-"+a).html(b)});return!1}
function DeleteComments(a,c){DLEconfirm(dle_del_agree,dle_confirm,function(){ShowLoading("");$.get(dle_root+"engine/ajax/deletecomments.php",{id:a,dle_allow_hash:c},function(a){HideLoading("");a=parseInt(a);isNaN(a)||($("html,body").stop().animate({scrollTop:$("#comment-id-"+a).offset().top-70},700),setTimeout(function(){$("#comment-id-"+a).hide("blind",{},1400)},700))})})}
function MarkSpam(a,c){DLEconfirm(dle_spam_agree,dle_confirm,function(){ShowLoading("");$.get(dle_root+"engine/ajax/adminfunction.php",{id:a,action:"commentsspam",user_hash:c},function(a){HideLoading("");"error"!=a&&DLEconfirm(a,dle_confirm,function(){location.reload(!0)})})})}function doFavorites(a,c){ShowLoading("");$.get(dle_root+"engine/ajax/favorites.php",{fav_id:a,action:c,skin:dle_skin},function(b){HideLoading("");$("#fav-id-"+a).html(b)});return!1}
function CheckLogin(){var a=document.getElementById("name").value;ShowLoading("");$.post(dle_root+"engine/ajax/registration.php",{name:a},function(a){HideLoading("");$("#result-registration").html(a)});return!1}
function doCalendar(a,c,b){ShowLoading("");$.get(dle_root+"engine/ajax/calendar.php",{month:a,year:c},function(a){HideLoading("");"left"==b?$("#calendar-layer").hide("slide",{direction:"left"},500).html(a).show("slide",{direction:"right"},500):$("#calendar-layer").hide("slide",{direction:"right"},500).html(a).show("slide",{direction:"left"},500)})}
function doRate(a,c){ShowLoading("");$.get(dle_root+"engine/ajax/rating.php",{go_rate:a,news_id:c,skin:dle_skin},function(a){HideLoading("");if(a.success){var d=a.rating,d=d.replace(/&lt;/g,"<"),d=d.replace(/&gt;/g,">"),d=d.replace(/&amp;/g,"&");$("#ratig-layer-"+c).html(d);$("#vote-num-id-"+c).html(a.votenum)}},"json")}
function doAddComments(){var a=document.getElementById("dle-comments-form");if("1"==dle_wysiwyg||"2"==dle_wysiwyg){"1"==dle_wysiwyg?submit_all_data():tinyMCE.triggerSave();var c="wysiwyg"}else c="";if(""==a.comments.value||""==a.name.value)return DLEalert(dle_req_field,dle_info),!1;var b=a.question_answer?a.question_answer.value:"",d=a.sec_code?a.sec_code.value:"";if(a.recaptcha_response_field)var e=Recaptcha.get_response(),f=Recaptcha.get_challenge();else f=e="";var g=a.allow_subscribe?!0==a.allow_subscribe.checked?
"1":"0":"0";ShowLoading("");$.post(dle_root+"engine/ajax/addcomments.php",{post_id:a.post_id.value,comments:a.comments.value,name:a.name.value,mail:a.mail.value,editor_mode:c,skin:dle_skin,sec_code:d,question_answer:b,recaptcha_response_field:e,recaptcha_challenge_field:f,allow_subscribe:g},function(b){a.sec_code&&(a.sec_code.value="",reload());HideLoading("");RunAjaxJS("dle-ajax-comments",b);"error"!=b&&document.getElementById("blind-animation")&&($("html,body").stop().animate({scrollTop:$("#dle-ajax-comments").offset().top-
70},1100),setTimeout(function(){$("#blind-animation").show("blind",{},1500)},1100))})}
function CommentsPage(a,c){ShowLoading("");$.get(dle_root+"engine/ajax/comments.php",{cstart:a,news_id:c,skin:dle_skin},function(b){HideLoading("");isNaN(a)||isNaN(c)||($("#dle-comm-link").unbind("click"),$("#dle-comm-link").bind("click",function(){CommentsPage(a,c);return!1}));scroll(0,$("#dle-comments-list").offset().top-70);$("#dle-comments-list").html(b.comments);$(".dle-comments-navigation").html(b.navigation)},"json");return!1}
function dle_copy_quote(a){dle_txt="";window.getSelection?dle_txt=window.getSelection():document.selection&&(dle_txt=document.selection.createRange().text);""!=dle_txt&&(dle_txt="[quote="+a+"]"+dle_txt+"[/quote]")}
function dle_ins(a){if(!document.getElementById("dle-comments-form"))return!1;var c=document.getElementById("dle-comments-form").comments,b="";""!=dle_txt?("0"==dle_wysiwyg?(c.value+=dle_txt+"\n",c.focus()):(b=dle_txt+"<br />","1"==dle_wysiwyg?(oUtil.obj.focus(),oUtil.obj.insertHTML(b)):tinyMCE.execCommand("mceInsertContent",!1,b)),setTimeout(function(){$("html,body").stop().animate({scrollTop:$("#dle-comments-form").offset().top-70},700)},100)):(ShowLoading(""),$.get(dle_root+"engine/ajax/quote.php",
{id:a},function(a){HideLoading("");"0"==dle_wysiwyg?(c.value+=a+"\n",c.focus()):(b=a+"<br />","1"==dle_wysiwyg?(oUtil.obj.focus(),oUtil.obj.insertHTML(b)):tinyMCE.execCommand("mceInsertContent",!1,b));setTimeout(function(){$("html,body").stop().animate({scrollTop:$("#dle-comments-form").offset().top-70},700)},100)}));return!1}
function ShowOrHide(a){var c=$("#"+a);a=document.getElementById("image-"+a)?document.getElementById("image-"+a):null;var b=c.height()/200*1E3;3E3<b&&(b=3E3);250>b&&(b=250);"none"==c.css("display")?(c.show("blind",{},b),a&&(a.src=dle_root+"templates/"+dle_skin+"/dleimages/spoiler-minus.gif")):(2E3<b&&(b=2E3),c.hide("blind",{},b),a&&(a.src=dle_root+"templates/"+dle_skin+"/dleimages/spoiler-plus.gif"))}
function ckeck_uncheck_all(){for(var a=document.pmlist,c=0;c<a.elements.length;c++){var b=a.elements[c];"checkbox"==b.type&&(b.checked=!0==a.master_box.checked?!1:!0)}a.master_box.checked=!0==a.master_box.checked?!1:!0}function confirmDelete(a){DLEconfirm(dle_del_agree,dle_confirm,function(){document.location=a})}function setNewField(a,c){a!=selField&&(fombj=c,selField=a)}
function dle_news_delete(a){var c={};c[dle_act_lang[1]]=function(){$(this).dialog("close")};allow_dle_delete_news&&(c[dle_del_msg]=function(){$(this).dialog("close");var b={};b[dle_act_lang[3]]=function(){$(this).dialog("close")};b[dle_p_send]=function(){if(1>$("#dle-promt-text").val().length)$("#dle-promt-text").addClass("ui-state-error");else{var b=$("#dle-promt-text").val();$(this).dialog("close");$("#dlepopup").remove();$.post(dle_root+"engine/ajax/message.php",{id:a,text:b},function(b){"ok"==
b?document.location=dle_root+"index.php?do=deletenews&id="+a+"&hash="+dle_login_hash:DLEalert("Send Error",dle_info)})}};$("#dlepopup").remove();$("body").append("<div id='dlepopup' title='"+dle_notice+"' style='display:none'><br />"+dle_p_text+"<br /><br /><textarea name='dle-promt-text' id='dle-promt-text' class='ui-widget-content ui-corner-all' style='width:97%;height:100px; padding: .4em;'></textarea></div>");$("#dlepopup").dialog({autoOpen:!0,width:500,resizable:!1,dialogClass:"modalfixed",buttons:b});
$(".modalfixed.ui-dialog").css({position:"fixed"});$("#dlepopup").dialog("option","position",["0","0"])});c[dle_act_lang[0]]=function(){$(this).dialog("close");document.location=dle_root+"index.php?do=deletenews&id="+a+"&hash="+dle_login_hash};$("#dlepopup").remove();$("body").append("<div id='dlepopup' title='"+dle_confirm+"' style='display:none'><br /><div id='dlepopupmessage'>"+dle_del_agree+"</div></div>");$("#dlepopup").dialog({autoOpen:!0,width:500,resizable:!1,dialogClass:"modalfixed",buttons:c});
$(".modalfixed.ui-dialog").css({position:"fixed"});$("#dlepopup").dialog("option","position",["0","0"])}
function MenuNewsBuild(a,c){var b=[];b[0]="<a onclick=\"ajax_prep_for_edit('"+a+"', '"+c+'\'); return false;" href="#">'+menu_short+"</a>";""!=dle_admin&&(b[1]='<a href="'+dle_root+dle_admin+"?mod=editnews&action=editnews&id="+a+'" target="_blank">'+menu_full+"</a>");allow_dle_delete_news&&(b[2]="<a onclick=\"sendNotice ('"+a+'\'); return false;" href="#">'+dle_notice+"</a>",b[3]="<a onclick=\"dle_news_delete ('"+a+'\'); return false;" href="#">'+dle_del_news+"</a>");return b}
function sendNotice(a){var c={};c[dle_act_lang[3]]=function(){$(this).dialog("close")};c[dle_p_send]=function(){if(1>$("#dle-promt-text").val().length)$("#dle-promt-text").addClass("ui-state-error");else{var b=$("#dle-promt-text").val();$(this).dialog("close");$("#dlepopup").remove();$.post(dle_root+"engine/ajax/message.php",{id:a,text:b,allowdelete:"no"},function(a){"ok"==a&&DLEalert(dle_p_send_ok,dle_info)})}};$("#dlepopup").remove();$("body").append("<div id='dlepopup' title='"+dle_notice+"' style='display:none'><br />"+
dle_p_text+"<br /><br /><textarea name='dle-promt-text' id='dle-promt-text' class='ui-widget-content ui-corner-all' style='width:97%;height:100px; padding: .4em;'></textarea></div>");$("#dlepopup").dialog({autoOpen:!0,width:500,resizable:!1,dialogClass:"modalfixed",buttons:c});$(".modalfixed.ui-dialog").css({position:"fixed"});$("#dlepopup").dialog("option","position",["0","0"])}
function AddComplaint(a,c){var b={};b[dle_act_lang[3]]=function(){$(this).dialog("close")};b[dle_p_send]=function(){if(1>$("#dle-promt-text").val().length)$("#dle-promt-text").addClass("ui-state-error");else{var b=$("#dle-promt-text").val();$(this).dialog("close");$("#dlepopup").remove();$.post(dle_root+"engine/ajax/complaint.php",{id:a,text:b,action:c},function(a){"ok"==a?DLEalert(dle_p_send_ok,dle_info):DLEalert(a,dle_info)})}};$("#dlepopup").remove();$("body").append("<div id='dlepopup' title='"+
dle_complaint+"' style='display:none'><br /><textarea name='dle-promt-text' id='dle-promt-text' class='ui-widget-content ui-corner-all' style='width:97%;height:100px; padding: .4em;'></textarea></div>");$("#dlepopup").dialog({autoOpen:!0,width:500,resizable:!1,dialogClass:"modalfixed",buttons:b});$(".modalfixed.ui-dialog").css({position:"fixed"});$("#dlepopup").dialog("option","position",["0","0"])}
function DLEalert(a,c){$("#dlepopup").remove();$("body").append("<div id='dlepopup' title='"+c+"' style='display:none'><br />"+a+"</div>");$("#dlepopup").dialog({autoOpen:!0,width:470,resizable:!1,dialogClass:"modalfixed",buttons:{Ok:function(){$(this).dialog("close");$("#dlepopup").remove()}}});$(".modalfixed.ui-dialog").css({position:"fixed"});$("#dlepopup").dialog("option","position",["0","0"])}
function DLEconfirm(a,c,b){var d={};d[dle_act_lang[1]]=function(){$(this).dialog("close");$("#dlepopup").remove()};d[dle_act_lang[0]]=function(){$(this).dialog("close");$("#dlepopup").remove();b&&b()};$("#dlepopup").remove();$("body").append("<div id='dlepopup' title='"+c+"' style='display:none'><br />"+a+"</div>");$("#dlepopup").dialog({autoOpen:!0,width:500,resizable:!1,dialogClass:"modalfixed",buttons:d});$(".modalfixed.ui-dialog").css({position:"fixed"});$("#dlepopup").dialog("option","position",
["0","0"])}
function DLEprompt(a,c,b,d,e){var f={};f[dle_act_lang[3]]=function(){$(this).dialog("close")};f[dle_act_lang[2]]=function(){if(!e&&1>$("#dle-promt-text").val().length)$("#dle-promt-text").addClass("ui-state-error");else{var a=$("#dle-promt-text").val();$(this).dialog("close");$("#dlepopup").remove();d&&d(a)}};$("#dlepopup").remove();$("body").append("<div id='dlepopup' title='"+b+"' style='display:none'><br />"+a+"<br /><br /><input type='text' name='dle-promt-text' id='dle-promt-text' class='ui-widget-content ui-corner-all' style='width:97%; padding: .4em;' value='"+c+
"'/></div>");$("#dlepopup").dialog({autoOpen:!0,width:500,resizable:!1,dialogClass:"modalfixed",buttons:f});$(".modalfixed.ui-dialog").css({position:"fixed"});$("#dlepopup").dialog("option","position",["0","0"]);0<c.length?$("#dle-promt-text").select().focus():$("#dle-promt-text").focus()}var dle_user_profile="",dle_user_profile_link="";
function ShowPopupProfile(a,c){var b={};b[menu_profile]=function(){document.location=dle_user_profile_link};5!=dle_group&&(b[menu_send]=function(){document.location=dle_root+"index.php?do=pm&doaction=newpm&username="+dle_user_profile});1==c&&(b[menu_uedit]=function(){$(this).dialog("close");var a={};$("body").append('<div id="modal-overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #666666; opacity: .40;filter:Alpha(Opacity=40); z-index: 999; display:none;"></div>');
$("#modal-overlay").css({filter:"alpha(opacity=40)"}).fadeIn("slow");$("#dleuserpopup").remove();$("body").append("<div id='dleuserpopup' title='"+menu_uedit+"' style='display:none'></div>");a[dle_act_lang[3]]=function(){$(this).dialog("close");$("#dleuserpopup").remove()};a[dle_act_lang[5]]=function(){window.frames.edituserframe.confirmDelete(dle_login_hash)};a[dle_act_lang[4]]=function(){document.getElementById("edituserframe").contentWindow.document.getElementById("saveuserform").submit()};$("#dleuserpopup").dialog({autoOpen:!0,
show:"fade",width:560,height:500,resizable:!1,dialogClass:"modalfixed",buttons:a,open:function(a,b){$("#dleuserpopup").html("<iframe name='edituserframe' id='edituserframe' width='100%' height='400' src='"+dle_root+dle_admin+"?mod=editusers&action=edituser&user="+dle_user_profile+"&skin="+dle_skin+"' frameborder='0' marginwidth='0' marginheight='0' allowtransparency='true'></iframe>")},beforeClose:function(a,b){$("#dleuserpopup").html("")},close:function(a,b){$("#modal-overlay").fadeOut("slow",function(){$("#modal-overlay").remove()})}});
830<$(window).width()&&530<$(window).height()&&($(".modalfixed.ui-dialog").css({position:"fixed"}),$("#dleuserpopup").dialog("option","position",["0","0"]))});$("#dleprofilepopup").remove();$("body").append(a);$("#dleprofilepopup").dialog({autoOpen:!0,show:"fade",hide:"fade",resizable:!1,buttons:b,width:500});return!1}
function ShowProfile(a,c,b){if(dle_user_profile==a&&document.getElementById("dleprofilepopup"))return $("#dleprofilepopup").dialog("open"),!1;dle_user_profile=a;dle_user_profile_link=c;ShowLoading("");$.get(dle_root+"engine/ajax/profile.php",{name:a,skin:dle_skin},function(a){HideLoading("");ShowPopupProfile(a,b)});return!1}
function FastSearch(){$("#story").attr("autocomplete","off");$("#story").blur(function(){$("#searchsuggestions").fadeOut()});$("#story").keyup(function(){var a=$(this).val();0==a.length?$("#searchsuggestions").fadeOut():dle_search_value!=a&&3<a.length&&(clearInterval(dle_search_delay),dle_search_delay=setInterval(function(){dle_do_search(a)},600))})}
function dle_do_search(a){clearInterval(dle_search_delay);$("#searchsuggestions").remove();$("body").append("<div id='searchsuggestions' style='display:none'></div>");$.post(dle_root+"engine/ajax/search.php",{query:""+a+""},function(a){$("#searchsuggestions").html(a).fadeIn().css({position:"absolute",top:0,left:0}).position({my:"left top",at:"left bottom",of:"#story",collision:"fit flip"})});dle_search_value=a}
function ShowLoading(a){a&&$("#loading-layer").html(a);a=($(window).width()-$("#loading-layer").width())/2;var c=($(window).height()-$("#loading-layer").height())/2;$("#loading-layer").css({left:a+"px",top:c+"px",position:"fixed",zIndex:"99"});$("#loading-layer").fadeTo("slow",0.6)}function HideLoading(a){$("#loading-layer").fadeOut("slow")}
function ShowAllVotes(){if(document.getElementById("dlevotespopup"))return $("#dlevotespopup").dialog("open"),!1;$.ajaxSetup({cache:!1});ShowLoading("");$.get(dle_root+"engine/ajax/allvotes.php?dle_skin="+dle_skin,function(a){HideLoading("");$("#dlevotespopup").remove();$("body").append(a);$(".dlevotebutton").button();$("#dlevotespopup").dialog({autoOpen:!0,show:"fade",hide:"fade",resizable:!1,width:600,height:150});400<$("#dlevotespopupcontent").height()&&$("#dlevotespopupcontent").height(400);$("#dlevotespopup").dialog("option",
"height",$("#dlevotespopupcontent").height()+60);$("#dlevotespopup").dialog("option","position","center")});return!1}function fast_vote(a){var c=$("#vote_"+a+" input:radio[name=vote_check]:checked").val();ShowLoading("");$.get(dle_root+"engine/ajax/vote.php",{vote_id:a,vote_action:"vote",vote_mode:"fast_vote",vote_check:c,vote_skin:dle_skin},function(b){HideLoading("");$("#dle-vote_list-"+a).fadeOut(500,function(){$(this).html(b);$(this).fadeIn(500)})});return!1}
function AddIgnorePM(a,c){DLEconfirm(c,dle_confirm,function(){ShowLoading("");$.get(dle_root+"engine/ajax/pm.php",{id:a,action:"add_ignore",skin:dle_skin},function(a){HideLoading("");DLEalert(a,dle_info);return!1})})}function DelIgnorePM(a,c){DLEconfirm(c,dle_confirm,function(){ShowLoading("");$.get(dle_root+"engine/ajax/pm.php",{id:a,action:"del_ignore",skin:dle_skin},function(b){HideLoading("");$("#dle-ignore-list-"+a).html("");DLEalert(b,dle_info);return!1})})}
function media_upload(a,c,b,d){var e=(new Date).getTime(),f="none";$("#mediaupload").remove();$("body").append("<div id='mediaupload' title='"+text_upload+"' style='display:none'></div>");$("#mediaupload").dialog({autoOpen:!0,width:710,height:605,resizable:!1,dialogClass:"modalfixed",open:function(f,h){$("#mediaupload").html("<iframe name='mediauploadframe' id='mediauploadframe' width='100%' height='550' src='"+dle_root+"engine/ajax/upload.php?area="+a+"&author="+c+"&news_id="+b+"&wysiwyg="+d+"&skin="+
dle_skin+"&rndval="+e+"' frameborder='0' marginwidth='0' marginheight='0' allowtransparency='true'></iframe>");$(".ui-dialog").draggable("option","containment","")},dragStart:function(a,b){f=$(".modalfixed").css("box-shadow");$(".modalfixed").fadeTo(0,0.6).css("box-shadow","none");$("#mediaupload").css("visibility","hidden")},dragStop:function(a,b){$(".modalfixed").fadeTo(0,1).css("box-shadow",f);$("#mediaupload").css("visibility","visible")},beforeClose:function(a,b){$("#mediaupload").html("")}});
830<$(window).width()&&530<$(window).height()&&($(".modalfixed.ui-dialog").css({position:"fixed"}),$("#mediaupload").dialog("option","position",["0","0"]));return!1}
function dropdownmenu(a,c,b,d){window.event?event.cancelBubble=!0:c.stopPropagation&&c.stopPropagation();c=$("#dropmenudiv");if(c.is(":visible"))return clearhidemenu(),c.fadeOut("fast"),!1;c.remove();$("body").append('<div id="dropmenudiv" style="display:none;position:absolute;z-index:100;width:165px;"></div>');c=$("#dropmenudiv");c.html(b.join(""));d&&c.width(d);b=$(document).width()-30;d=$(a).offset();b-d.left<c.width()&&(d.left-=c.width()-$(a).width());c.css({left:d.left+"px",top:d.top+$(a).height()+
"px"});c.fadeTo("fast",0.9);c.mouseenter(function(){clearhidemenu()}).mouseleave(function(){delayhidemenu()});$(document).one("click",function(){hidemenu()});return!1}function hidemenu(a){$("#dropmenudiv").fadeOut("fast")}function delayhidemenu(){delayhide=setTimeout("hidemenu()",1E3)}function clearhidemenu(){"undefined"!=typeof delayhide&&clearTimeout(delayhide)}
jQuery(function(a){a(document).keydown(function(c){if(13==c.which&&c.ctrlKey){if(window.getSelection)var b=window.getSelection();else document.getSelection?b=document.getSelection():document.selection&&(b=document.selection.createRange().text);if(""!=b){if(255<b.toString().length)return DLEalert(dle_big_text,dle_info),!1;c={};c[dle_act_lang[3]]=function(){a(this).dialog("close")};c[dle_p_send]=function(){if(1>a("#dle-promt-text").val().length)a("#dle-promt-text").addClass("ui-state-error");else{var b=
a("#dle-promt-text").val(),c=a("#orfom").text();a(this).dialog("close");a("#dlepopup").remove();a.post(dle_root+"engine/ajax/complaint.php",{seltext:c,text:b,action:"orfo",url:window.location.href},function(a){"ok"==a?DLEalert(dle_p_send_ok,dle_info):DLEalert(a,dle_info)})}};a("#dlepopup").remove();a("body").append("<div id='dlepopup' title='"+dle_orfo_title+"' style='display:none'><br /><textarea name='dle-promt-text' id='dle-promt-text' class='ui-widget-content ui-corner-all' style='width:97%;height:80px; padding: .4em;'></textarea><div id='orfom' style='display:none'>"+
b+"</div></div>");a("#dlepopup").dialog({autoOpen:!0,width:600,resizable:!1,dialogClass:"modalfixed",buttons:c});a(".modalfixed.ui-dialog").css({position:"fixed"});a("#dlepopup").dialog("option","position",["0","0"])}}})});
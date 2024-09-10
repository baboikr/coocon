$(document).ready(function() {
	'use strict';
	function menuEvent(){
		var scrollPosition = $(window).scrollTop();
		if (scrollPosition > 1){
			$('.header').addClass('active');
		}else{
			$('.header').removeClass('active');
		}
	}
	menuEvent();

	$(window).scroll(function() {
		var scrollLeft = $(this).scrollLeft();
		$('.header').css({"left":-scrollLeft});
		menuEvent();
	});

	$(".js_tab_wrap").tabs({
		wrapClass:".js_tab_wrap",
		clickClass:".js_tab_click",
		showClass:".js_tab_show",
		animate:false,
		contentWidthFull:false,
		animateBorder:["false",".tabs_header"],
		fade:false,
		speed:500
	});

	$(".js_tab_wrap2").tabs({
		wrapClass:".js_tab_wrap2",
		clickClass:".js_tab_click2",
		showClass:".js_tab_show2",
		animate:false,
		contentWidthFull:false,
		animateBorder:["false",".tabs_header"],
		fade:false,
		speed:500
	});

	$('.js_wrap').toggleAccordion({
		wrapClass:".js_wrap",
		clickClass:".js_click",
		showClass:".js_show",
		clickclassNoHide:[".mCSB_dragger_bar", ".mCSB_draggerRail"],
		layer:true,
		speed:300
	});

	$('.js_table_wrap').toggleAccordion({
		wrapClass:".js_table_wrap",
		clickClass:".js_table_click ",
		showClass:".js_table_show",
		multiShow:false,
		layer:false,
		speed:300
	});

//(start)20231109
	/*$(".js_menu").hover(function(){
		$(".header").addClass("menu_open");
	})

	$(".gnb_inner > ul").mouseleave(function(){
		$(".header").removeClass("menu_open");
	})*/

	$(".js_menu").click(function(){
		$(".header").toggleClass("menu_open");
		$("body").append("<div class='menu_layer'></div>");
		var is_menu_show = $(".menu_layer").length;
		if(is_menu_show > 1){
			$(".menu_layer").remove();
		}
	})
	$("body").on("click",".menu_layer",function(){
		$(".header").toggleClass("menu_open");
		$(".menu_layer").remove();
	})
//(end)20231109

	$(".btn_totop_wrap").gotoTopStyle1({
		wrapClass:".btn_totop_wrap",
		clickClass:".btn_goTop",
		jumpOnClass:".footer",
		bottom:["-100","40","55"],
		speed:500
	});

	$(".btn_history").click(function(){
		$(".history_wrap").fadeIn(300);
		$("body").css({"overflow":"hidden"});
	})
	$(".dark_bg_layer").click(function(){
		$(".history_wrap,.js_show_popup,.ly_blur").fadeOut(300);
		$("body").css({"overflow":"visible"});
	})
	$(".btn_history_close").click(function(){
		$(".history_wrap").fadeOut(300);
		$("body").css({"overflow":"visible"});
	})

	$(".js_clickShow_popup").click(function(e){
		e.stopPropagation();
		$(".js_show_popup").fadeIn(300);
	})
	$(".js_clickHide_popup").click(function(){
		$(".js_show_popup").fadeOut(300);
	})
	$(".bt_file").click(function(e){
		e.stopPropagation();
	})

	$(".js_click2").click(function(e) {
		e.stopPropagation();
		$(".js_click2").toggleClass("on");
		$(this).addClass("on");
		var $targetShow2 = $(this).parent().find(".js_show2");
		if (!$targetShow2.is(":visible")) {
			$(".js_show2").slideUp(300);
			$targetShow2.slideDown(300);
		}else{
			$(".js_show2").slideUp(300);
		}
	});
	$(document).click(function(e) {
		var isInsideFilterBox = $(e.target).parents(".filterBox_layer").length > 0;
		if(!isInsideFilterBox){
			$(".js_click2").removeClass("on");
			$(".js_show2").slideUp(300);
		}
	});

	$('.terms_tit_list li').on('click', function(e){
		var thisIndex = $(this).index();
		var target = $(this).parents(".js_target_wrap").find(".js_target_list");
		e.preventDefault();
		$('html, body').animate({
			scrollTop :target.eq(thisIndex).offset().top - 130
		},300);
	});

//(start)20231118
	$('.btn_inquire').on('click', function(){
		$('.layer_inquire').toggleClass('on');
	});
//(end)20231118

//(start)20240613
$('.apiFilter_tab_area .tab ul li').on('click', function(){
	var index = $(this).index();
	$(".apiFilter_grp_inner").removeClass("on");
	if(index == 1){
		$(".apiFilter_grp_inner").addClass("on");
	}
});
//(end)20240613

//(start)20240617
	let footerH = $(".footer_grp").outerHeight();
	let windowH = $(window).outerHeight();
	$(".section_grp").css("min-height", windowH-footerH);
	$(window).resize(function(){
		let footerH = $(".footer_grp").outerHeight();
		let windowH = $(window).outerHeight();
		$(".section_grp").css("min-height", windowH-footerH);
	});
//(end)20240617

});

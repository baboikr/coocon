(function($) {
	var win='';
	var getsindex = 0;
	$(window).load(function(){
		win	=	$('.header').width();
		return win;
	});
	//var win	=	$('.header').width();
	$(window).resize(function(){
		win	=	$(window).width();
		$('.slides').css({"width":100 + "%"});
		//$('.slides').css({"width":100 + "%","left":0});
		return win;
	});
	$.fn.slide = function(options) {
		this.defaults = {
			start: true,
			speed: 5000,
			animate: "horizontal"
		}
		opts = $.extend({}, this.defaults, options);
		this.each(function() {
			var slideContainer = $(this).find('.slide_container');
			var animate = opts.animate;
			var slide = slideContainer.find('.slides');
			var count = slide.length;
			var index = 0;
			var time = null;
			var _this = this;
			var speed = opts.speed || 5000;
			$(this).data('opts', opts);
			$(slide[0]).show();

			var ctrlHtml = '<a href="javascript:;" class="ctrl-slide prev"></a>' + '<a href="javascript:;" class="ctrl-slide next"></a>';
			$('.slide').append(ctrlHtml);
			var pageIndex = '<div class="rolling"><ul class="slide-tabs">';
			for (var i = 0; i < count; i++) {
				pageIndex += '<li><a href="#none"></a></li>'
			}
			//trigger

			pageIndex += '</ul></div>';
			$(this).append(pageIndex);

			//var i	=0;
			function start() {
				if (opts.start) {
					time = setInterval(function() {
						//$('.text').text(i);
						var old = index;
						if (index >= count - 1) {
							index = 0;
						}
						else {
							index++;
						}
						change.call(_this, index, old);
					}, speed);
				}
			};

			$(this).find('.btn_sl_next').on('click', function() {
				var old = index;
				if (index >= count - 1) {
					index = 0;
				}
				else {
					index++;
				}
				change.call(_this, index, old);

			});

			/* [D]명품상품 전용 : (add)20190305 */
			$(this).find('.slides.type1').on('click', function() {
			    var old = index;
				if (index >= count - 1) {
					index = 0;
				}
				else {
					index++;
				}
				change.call(_this, index, old);

			});
			/* //[D]명품상품 전용 : (add)20190305 */

			$(this).find('.btn_sl_prev').on('click', function() {
			    var old = index;
				if (index <= 0) {
					index = count - 1;
				}
				else {
					index--;
				}
				change.call(_this, index, old, 'left');

			});

			$(this).on('mouseover', function() {
				if (opts.start) {
					clearInterval(time);
				}
				$(this).find('.ctrl-slide').css({
					opacity: 0.6
				});
			});

			$(this).on('mouseout', function() {
				if (opts.start) {
					start();
				}
				$(this).find('.ctrl-slide').css({
					opacity: 0
				});
			});

			//trigger
			$(this).find('.slide-tabs li').each(function(aIndex) {
				$(this).on('click.slide-tabs', function() {
					if (aIndex < index) {
						change.call(_this, aIndex, index, 'left');
					}
					else if (aIndex == index) {

					}
					else {
						change.call(_this, aIndex, index);
					}

					index = aIndex;
				});
			});

			switch (opts.animate) {
				case "horizontal":
					opts['width'] = $(this).width();
					slide.css('left', -opts['width']);
					$(slide[0]).css('left',0);
					slide.show();
					break;
				case "opacity":
					slideContainer.css({
						'position': 'relative'
					});
					slide.css('display', 'none');
					$(slide[0]).show();
			}

			start();
		});
	};

	function change(showIndex, hideIndex, left) {
		var opts = $(this).data('opts');
		var slideContainer = $(this).find('.slide_container');
		var slide = $(this).find('.slide_container div.slides');
		if (opts.animate == "horizontal") {
			var x = showIndex % (slide.length);
			var y = hideIndex % (slide.length);
			getsindex	=	x
			//var slideWidth = opts['width'];

			var slideWidth;
			if(win <=980){
				//slideWidth =	980;	//20180518
				slideWidth = opts['width'];	//20180518
			}else{
				slideWidth =	win;
			}

			if (left == 'left') {
				slide.eq(x).stop().css({"left": -slideWidth}).addClass("active").animate({
					left: 0
				});
				slide.eq(y).stop().css("left","0").animate({
					left: slideWidth
				}, function() {
					slide.eq(x).removeClass('active');
				});
			}
			else {

				//slideWidth	=	200;
				slide.eq(x).stop().css("left", slideWidth).addClass("active").animate({
					left: 0
				});
				slide.eq(y).stop().css("left", 0).animate({
					left: -slideWidth
				}, function() {
					slide.eq(x).removeClass('active');
				});
			}

			//$(this).find('.slide-tabs li').eq(hideIndex).css({"background":"#fff"});
			//$(this).find('.slide-tabs li').eq(showIndex).css({"background":"#000"});
			$(this).find('.slide-tabs li > a').eq(hideIndex).css({"background-image":"url(../img/ico/rolling_off.png)"});/* (modify)20160412 */
			$(this).find('.slide-tabs li > a').eq(showIndex).css({"background-image":"url(../img/ico/rolling_on.png)"});/* (modify)20160412 */
		}
		else {
			$(this).find('.slide_container div').eq(hideIndex).stop().hide().animate({
				opacity: 0
			});
			//$(this).find('.slide-tabs li').eq(hideIndex).css({"background":"#000"});
			//$(this).find('.slide-tabs li').eq(showIndex).css({"background":"#fff"});
			$(this).find('.slide-tabs li > a').eq(hideIndex).css({"background-image":"url(../img/ico/rolling_off.png)"});/* (modify)20160412 */
			$(this).find('.slide-tabs li > a').eq(showIndex).css({"background-image":"url(../img/ico/rolling_on.png)"});/* (modify)20160412 */
			$(this).find('.slide_container div').eq(showIndex).show().css({"background":"#fff"}).stop().animate({
				opacity: 1
			});
		}
	};

	$(window).resize(function(){
		var slid	=	getsindex+1;
		win	=	$('.header').width();
		var cls		=	'.slide'+slid;
		$('.slides').css({"left":-win+"px"});
		$(cls).css({"left":0});
		return win;
	});
})(jQuery);

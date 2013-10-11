$(document).ready(function() {
				
	// TABS SCRIPT
	$(function () {
			var tabContainers = $('div.tabs > div');
			tabContainers.hide().filter(':first').show();
			
			$('div.tabs ul.tabNavigation a').click(function () {
				tabContainers.hide();
				tabContainers.filter(this.hash).fadeIn("medium");
				$('div.tabs ul.tabNavigation a').removeClass('selected');
				$(this).addClass('selected');
				return false;
			}).filter(':first').click();
		});
	// .TABS SCRIPT

	// SLIDESHOW
    $('#slider').cycle({
		fx:             'fade',
    	timeout:         8000,
		speed:           800, 
		easing: "easeOutExpo",
		pause:           0//,
//		next:   '#next', 
//    	prev:   '#prev'
	});
	// .SLIDESHOW
	
	// SLIDESHOW O NAS
    $('#slider_onas').cycle({
		fx:             'fade',
    	timeout:         4000,
		speed:           400, 
		pause:           1,
		next:   '#next1', 
    	prev:   '#prev1'
	});
	// .SLIDESHOW O NAS
	
	// SCROLL TO TOP
	$().UItoTop({ easingType: 'easeOutExpo' });
	// SCROLL TO TOP
	
	// WORKS SLIDER
	$(function() {
    $("#works_slider").jCarouselLite({
        btnNext: "#next2",
        btnPrev: "#prev2",
		easing: "easeOutExpo",
	    speed: 400
    });
    });
	// .WORKS SLIDER
	
	// WORKS FADING
	$(".work_zoom").css("opacity","0");
	$('li.work a').hover(function()
     {
     $(this).children(".work_zoom").stop().animate( { opacity: 0.8 }, 400  );
     },
     function()
     {
        $(this).children(".work_zoom").stop().animate( { opacity: 0 }, 800  );
    });
	// .WORKS FADING
	
	// SERVICES FADING
	
	$('#services li a').append('<span></span>');
	$('#services li a span').hide();
	$('#services li a').hover(function() {
		$(this).children('span').fadeIn(400);
	}, function() {
		$(this).children('span').fadeOut(400);
	});
	// .SERVICES FADING
	
	// WORKS BTN FADING	
	$('a#prev2, a#next2').append('<span></span>');
	$('a#prev2 span, a#next2 span').hide();
	$('a#prev2, a#next2').hover(function() {
		$(this).children('span').fadeIn(400);
	}, function() {
		$(this).children('span').fadeOut(400);
	});
	// .WORKS BTN FADING
	
	// NEXT WORK BTN FADING	
	$('#header_home a.prev, #header_home a.next').append('<span></span>');
	$('#header_home a.prev span, #header_home a.next span').hide();
	$('#header_home a.prev, #header_home a.next').hover(function() {
		$(this).children('span').fadeIn(400);
	}, function() {
		$(this).children('span').fadeOut(400);
	});
	// .NEXT WORK BTN FADING

	// SERVICES subpage FADING
	$('a#services_icons').append('<span></span>');
	$('a#services_icons span').hide();
	$('a#services_icons').hover(function() 
	{
		var class_test = $(this).attr("class");
		$("a#link_"+class_test).addClass("services_hover");
		$(this).children('span').stop(true, true).fadeIn(400);
	}, function() {
		var class_test = $(this).attr("class");
		$("a#link_"+class_test).removeClass();
		$(this).children('span').stop(true, true).fadeOut(400);
	});

	$("a[id*='link_']").hover(function() 
	{
		var id = $(this).attr("id");
		var a_class = id.replace("link_", "");
		$("a."+a_class).children('span').stop(true, true).fadeIn(400);
	}, function() {
		var id = $(this).attr("id");
		var a_class = id.replace("link_", "");
		$("a."+a_class).children('span').stop(true, true).fadeOut(400);
	});
	
	// .SERVICES subpage FADING

	// STICKY ELEMENTS
	(function( $ ){
  	$.fn.containedStickyScroll = function( options ) {
  
	var defaults = {  
		oSelector : this.selector,
		unstick : true,
		easing: "easeOutExpo",
	    duration: 800,
		queue: false,
		closeChar: '',
		closeTop: 0,
		closeRight: 0  
	}  
                  
	var options =  $.extend(defaults, options);
  
	if(options.unstick == true){  
		this.css('position','relative');
		this.append('<a class="scrollFixIt">' + options.closeChar + '</a>');
		jQuery(options.oSelector + ' .scrollFixIt').css('position','absolute');
		jQuery(options.oSelector + ' .scrollFixIt').css('top',options.closeTop + 'px');
		jQuery(options.oSelector + ' .scrollFixIt').css('right',options.closeTop + 'px');
		jQuery(options.oSelector + ' .scrollFixIt').css('cursor','pointer');
		jQuery(options.oSelector + ' .scrollFixIt').click(function() {
			getObject = options.oSelector;
			jQuery(getObject).animate({ top: "0px" },
				{ queue: options.queue, easing: options.easing, duration: options.duration });
			jQuery(window).unbind();
			jQuery('.scrollFixIt').remove();
		});
	} 
  	jQuery(window).scroll(function() {
  		getObject = options.oSelector;
        if(jQuery(window).scrollTop() > (jQuery(getObject).parent().offset().top) &&
           (jQuery(getObject).parent().height() + jQuery(getObject).parent().position().top - 30) > (jQuery(window).scrollTop() + jQuery(getObject).height())){
        	jQuery(getObject).animate({ top: (jQuery(window).scrollTop() - jQuery(getObject).parent().offset().top + 70) + "px" }, 
            { queue: options.queue, easing: options.easing, duration: options.duration });
        }
        else if(jQuery(window).scrollTop() < (jQuery(getObject).parent().offset().top)){
        	jQuery(getObject).animate({ top: "0px" },
            { queue: options.queue, easing: options.easing, duration: options.duration });
        }
	});

  	};
	})( jQuery );

	// .STICKY ELEMENTS
	
	$('input.text,textarea').hover(function(){
		$(this).addClass('hover');
	},
	function(){
		$(this).removeClass('hover');	
	});

	$('input.text,textarea').focus(function() {
		$(this).addClass('focus');
	});
	$('input.text,textarea,select').blur(function() {
		$(this).removeClass('focus');
	});
});


function swip (elementInput, swipFrom, swipTo){
	if (elementInput.value == swipFrom) elementInput.value = swipTo;
}

// --------------------
//			selectBox
// --------------------

function selectBox()
{
	$(document).ready(function() 
	{
		$("SELECT").selectBox({
			'menuTransition': 'slide',
			'menuSpeed': 'fast'
		});
		$(function(){ $("label").inFieldLabels(); });		
	});
}

//--------------------
//		 twitter
//--------------------

function twitter()
{
	$('#twitts').twit('art4websk', 
	{
	  icon: false,
	  username: false,
	  limit: 1,
	  label: '',
	  title: ''
	});
}

//--------------------
//	stickyScroll
//--------------------

function stickyScroll() 
{
	jQuery(document).ready(function()
	{
		jQuery('.col_1').containedStickyScroll();
	});
}

//--------------------
//	  mobilySelect
//--------------------

function mobilySelect() 
{
	$(function(){
		$('.wrap_box').mobilyselect({
			collection: 'all',
			animation: 'fade',
			duration: 400,
			listClass: 'selecterContent',
			btnsClass: 'selecterBtns',
			btnActiveClass: 'active',
			easing: "easeOutExpo",
			elements: 'li',
			onChange: function(){},
			onComplete: function(){}
		});
	});
}

//--------------------
//		show_modal
//--------------------

function show_modal() 
{
	$("#modal_lightbox").fadeIn();
}

//--------------------
//		close_modal
//--------------------

function close_modal() 
{
	$("#modal_lightbox").fadeOut();
}

//--------------------
//		prettyDate
//--------------------

/*
 * JavaScript Pretty Date
 * Copyright (c) 2008 John Resig (jquery.com)
 * Licensed under the MIT license.
 */
// converts ISO time to casual time
function prettyDate(time){
	var date = new Date((time || "").replace(/-/g,"/").replace(/TZ/g," ")),
		diff = (((new Date()).getTime() - date.getTime()) / 1000),
		day_diff = Math.floor(diff / 86400);
			
	if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
		return;
	var v = day_diff == 0 && (
			diff < 60 && "just now" ||
			diff < 120 && "1 minute ago" ||
			diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
			diff < 7200 && "1 hour ago" ||
			diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
		day_diff == 1 && "Yesterday" ||
		day_diff < 7 && day_diff + " days ago" ||
		day_diff < 31 && Math.ceil( day_diff / 7 ) + " weeks ago";
	if (!v)
		window.console && console.log(time);
	return v ? v : '';
}
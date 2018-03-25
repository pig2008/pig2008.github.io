

// variable to hold current window state - small, medium, or large
var windowState = 'large';

// check intital width of the screen, respond with appropriate menu
$(document).ready(function() {
    var sw = document.body.clientWidth;
    if (sw < 481) {
       smMenu();
    } else if (sw >= 481 && sw <= 768) {
		medMenu();
	} else {
		lgMenu();
	}
});

// take care of resizing the window
$(window).resize(function() {
	var sw = document.body.clientWidth;
    if (sw < 481 && windowState != 'small') {
       smMenu();
    }
	if (sw > 480 && sw < 769 && windowState != 'medium') {
       medMenu();
    }  
    if (sw > 768 && windowState != 'large') {
       lgMenu();
    } 
});

//handle menu for small screens
function smMenu() {
	 // since we may be switching from another menu, reset the menu first
	//unbind click and touch events    
    $('.menuToggle a').off('click');
    $('.topMenu h3').off('click touchstart');
	$('html').off('touchstart');
	$('#mainNav').off('touchstart');
	//reset the menu in case it's being resized from a medium screen    
    // remove any expanded menus
	$('.expand').removeClass('expand');
	$('.menuToggle').remove();
    //now that the menu is reset, add the toggle and reinitialize the indicator
     $('.topMenu').before('<div class="menuToggle"><a href="#">menu<span class="indicator">+</span></a></div>');
    // append the + indicator
     $('.topMenu h3').append('<span class="indicator">+</span>');
    // wire up clicks and changing the various menu states
	//we'll use clicks instead of touch in case a smaller screen has a pointer device
	//first, let's deal with the menu toggle
	$('.menuToggle a').click(function() {
		//expand the menu
		$('.topMenu').toggleClass('expand');
		// figure out whether the indicator should be changed to + or -
		var newValue = $(this).find('span.indicator').text() == '+' ? '-' : '+';
		// set the new value of the indicator
		$(this).find('span.indicator').text(newValue);
	});
	
		//now we'll wire up the submenus
	$(".topMenu h3").click(function() {
		//find the current submenu
		var currentItem = $(this).siblings('.submenu');
		//remove the expand class from other submenus to close any currently open submenus
		$('ul.submenu').not(currentItem).removeClass('expand');
		//change the indicator of any closed submenus 
		$('.topMenu h3').not(this).find('span.indicator:contains("-")').text('+');
		//open the selected submenu
		$(this).siblings('.submenu').toggleClass('expand');
		//change the selected submenu indicator
		var newValue = $(this).find('span.indicator').text() == '+' ? '-' : '+';
        $(this).find('span.indicator').text(newValue);
	});
	//indicate current window state
	windowState = 'small';
}
//handle menu for medium screen sizes
function medMenu() {
	//reset the menu in case it's being resized from a small screen
	// unbind click events    
    $('.menuToggle a').off('click');
    $('.topMenu h3').off('click');
    // remove any expanded menus
	$('.expand').removeClass('expand');
    // remove the span tags inside the menu
    $('.topMenu h3').find('span.indicator').remove();
    // remove the "menu" element
    $('.menuToggle').remove();
	
	//check to see if the device supports touch
	//we'll use touch events instead of click as it will allow us
	//to support both a CSS-driven hover and touch enabled
	//menu for this screen range
	if ('ontouchstart' in document.documentElement)
    {
		//find all 'hover' class and strip them
		 $('.topMenu').find('li.hover').removeClass('hover');
		 //add touch events to submenu headings
		 $(".topMenu h3").bind('touchstart', function(e){
			//find the current submenu
			var currentItem = $(this).siblings('.submenu');
			//remove the expand class from other submenus to close any currently open submenus
			$('ul.submenu').not(currentItem).removeClass('expand');
			//open the selected submenu
			$(this).siblings('.submenu').toggleClass('expand');
		});
		//close submenus if users click outside the menu
		$('html').bind('touchstart', function(e) {
			$('.topMenu').find('ul.submenu').removeClass('expand');
		});
		//stop clicks on the menu from bubbling up
		$('#mainNav').bind('touchstart', function(e){
          	e.stopPropagation();
       });
	}
	//indicate current window state
	windowState = 'medium';
}

//handle menu for large screens
function lgMenu() {
	 //largely what we'll do here is simple remove functionality that
	//may be left behind by other screen sizes
	//at this size the menu will function as a pure-css driven dropdown
	//advances in touch screen are beginning to make us re-think
	//this approach
    // unbind click and touch events    
    $('.menuToggle a').off('click');
    $('.topMenu h3').off('click touchstart');
	$('html').off('touchstart');
	$('#mainNav').off('touchstart');
    
    // remove any expanded submenus
    $('.topMenu').find('ul.submenu').removeClass('expand');
    
    // remove the span tags inside the menu
    $('.topMenu h3').find('span.indicator').remove();
    
    // remove the "menu" element
    $('.menuToggle').remove();
	
    //indicate current window state
    windowState = 'large';
}
$(function(){ $('#webTicker').webTicker({
	height:'48px'});
			});
var audio;
var playlist;
var tracks;
var current;

init();
function init(){
    current = 0;
    audio = $('audio');
    playlist = $('#playlist');
    tracks = playlist.find('li a');
    len = tracks.length - 1;
    audio[0].volume = .5;
    audio[0].pause();
    playlist.find('a').click(function(e){
        e.preventDefault();
        link = $(this);
        current = link.parent().index();
        run(link, audio[0]);
    });
    audio[0].addEventListener('ended',function(e){
        current++;
        if(current == len){
            current = 0;
            link = playlist.find('a')[0];
        }else{
            link = playlist.find('a')[current];    
        }
        run($(link),audio[0]);
    });
}
function run(link, player){
        player.src = link.attr('href');
        par = link.parent();
        par.addClass('active').siblings().removeClass('active');
        audio[0].load();
        audio[0].play();
}
$(function() {
    $("#videolist li").on("click", function() {
        $("#videoarea").attr({
            "src": $(this).attr("movieurl"),
            "poster": "",
            "autoplay": "autoplay"
        });
    });
    $("#videoarea").attr({
        "src": $("#videolist li").eq(0).attr("movieurl"),
        "poster": $("#videolist li").eq(0).attr("moviesposter")
    });
});

$('#smallImages').delegate('img', 'click', function() {
    $('#largeImages').attr('src', $(this).attr('src').replace('thumb', 'large'));
    window.location.hash = $('#smallImages img').index(this)+1;
});

var wlh = window.location.hash[1];
if (!isNaN(wlh)) {
    $('#largeImages').attr('src', $('#smallImages img').eq(wlh-1).attr('src').replace('thumb', 'large'));
}
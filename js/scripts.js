$(document).scroll(function() {
	$(".js-intro").css({
		"opacity": 1 - (parseInt($(this).scrollTop())/(parseInt($(".js-intro").css("height"))/1.3))
	});
});

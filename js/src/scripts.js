$(document).scroll(function() {
	if(($(this).scrollTop() * 1.3) < $(window).height()){
		$(".js-intro").css({
			"opacity": 1 - (parseInt($(this).scrollTop())/(parseInt($(".js-intro").css("height"))/1.8))
		});
	} else {
		$(".js-intro").css({
			"opacity": 0
		});
	}
});

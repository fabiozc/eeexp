$(document).ready(function() {
	introScrollEffect();
	$('.js-exp-item').tilt({
		scale: 1.05,
		maxTilt: 8,
		perspective: 1000,
		tiltSpeed: 400
	});
});
$(document).scroll(function() {
	introScrollEffect();
});

function introScrollEffect(){
	if(($(this).scrollTop() * 1.3) < $(window).height()){
		$(".js-intro").css({
			"opacity": 1 - (parseInt($(this).scrollTop())/(parseInt($(".js-intro").css("height"))/1.8))
		});
	} else {
		$(".js-intro").css({
			"opacity": 0
		});
	}
}

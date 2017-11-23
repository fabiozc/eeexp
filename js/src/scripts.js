$(document).ready(function() {
	introScrollEffect();
	$('.js-exp-item').tilt({
		scale: 1.05,
		maxTilt: 9,
		perspective: 2000,
		tiltSpeed: 400
	});

	$('.js-exp-item').on('click tap',$.proxy(expandExperience, self));
});
$(document).scroll(function() {
	introScrollEffect();
});

function introScrollEffect(){
	if(($(this).scrollTop() * 1.3) < $(window).height()){
		$('.js-intro').css({
			'opacity': 1 - (parseInt($(this).scrollTop())/(parseInt($('.js-intro').css('height'))/1.8))
		});
	} else {
		$('.js-intro').css({
			'opacity': 0
		});
	}
}

$('.js-pagi').on('click', function (evt) {
	evt.preventDefault();
	if ($('.current').next().length == 0) {
		$('.js-review-item').removeClass('current prev').first().addClass('current');
		return;
	}
	$('.current').addClass("prev").removeClass('current').next().removeClass("prev").addClass('current');
});

function expandExperience(event){
	var container = $('.js-request');
	var $el = $(event.currentTarget);

	container.removeAttr('style').empty();

	var getWitdh = $el.css('width');
	var getLeft = $el.offset().left;

	$el.clone().appendTo(container);
	container.find('.exp-item').removeClass('.js-exp-item').removeAttr('style').addClass('is-open');
	container.show().css({
		'position' : 'absolute',
		'top' : '-290px',
		'left' : getLeft,
		'width': getWitdh
	}).animate({
		'bottom' : '10vh',
		'top' : 'auto',
		'left' : '10vw',
		'width': '80vw',
		'height': '80vh',
		'position': 'fixed',
		'transform': 'scale(1)'
	},500);

	$el.css({
		'opacity': '0'
	});

}

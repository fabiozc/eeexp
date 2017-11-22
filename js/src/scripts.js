$(document).ready(function() {
	introScrollEffect();
	$('.js-exp-item').tilt({
		scale: 1.05,
		maxTilt: 8,
		perspective: 1000,
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
		'position': 'fixed'
	},1000);

}

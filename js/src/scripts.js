$(document).ready(function() {
	introScrollEffect();
	$('.js-exp-item').tilt({
		scale: 1.05,
		maxTilt: 9,
		perspective: 2000,
		tiltSpeed: 400
	});

	$('.js-exp-item').on('click tap',$.proxy(expandExperience, self));
	//$('.js-exp-item.is-open').on('click tap',closeExperience());


	$(".js-scroll").click(function(e) {
	    e.preventDefault();
	    var aid = $(this).attr("href");
	    $('html,body').animate({scrollTop: $(aid).offset().top - 330},'slow');
	});
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

$('.js-pagi').on('click', function (e) {
	e.preventDefault();
	if ($('.is-current').next().length == 0) {
		$('.js-review-item').removeClass('is-current is-prev').first().addClass('is-current');
		return;
	}
	$('.is-current').addClass("is-prev").removeClass('is-current').next().removeClass("is-prev").addClass('is-current');
});

function expandExperience(event){
	var container = $('.js-request');
	var $el = $(event.currentTarget);

	//console.log(container.children(":first").hasClass("is-open"));
	// if(container.find('.exp-item').hasClass("is-open")){
	// 	$el.removeAttr('style').addClass('is-open');
	// 	container.removeAttr('style').animate({
	// 		'opacity': '0'
	// 	}, function(){
	// 		container.hide();
	// 	});
	// 	console.log("a");
	// 	return;
	// }

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
	container.find('.exp-item').children().animate({ 'opacity':'0'}, function(){ container.find('.exp-item').empty(); });
}

function closeExperience(){
}

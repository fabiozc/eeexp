function introScrollEffect(){
	var header = $('.js-intro');

	header.addClass("is-loaded");
	if(($(this).scrollTop() * 1.3) < $(window).height()){
		header.css({
			'opacity': 1 - (parseInt($(this).scrollTop())/(parseInt(header.css('height'))/1.8))
		});
	} else {
		$('.js-intro').css({
			'opacity': 0
		});
	}
}
function randomizeReviews(){
	var $list = $('.js-review-list'),
	$listItem = $list.children();
	$listItem.sort(function() {return Math.random() - 0.5; });
	$list.append($listItem);
}
function callOverlay(){
	$('body').append("<div class='overlay js-overlay'><span class='modal-close js-modal-close' >&times;</span></div>").find('.js-overlay').animate({'opacity':'1'});
}
function destroyOverlay(){
	var overlay = $(".overlay");
	overlay.animate({
		"opacity":"0"
	}, function(){
		overlay.remove();
	});
	$(".js-request").empty();
	$('.js-request-item').hide();
}
function expandExperience(event){
	var container = $('.js-request');
	var $el = $(event.currentTarget);
	var elementType = $el.data('type');

	callOverlay();
	container.attr('aria-hidden','false').removeAttr('style').empty();

	var getWitdh = $el.css('width');
	var getTop = $el.offset().top - $(document).scrollTop();
	var getLeft = $el.offset().left;

	$el.clone().appendTo(container);
	container.find('.exp-item').removeClass('.js-exp-item').removeAttr('style').addClass('is-open');
	container.show().addClass("modal").css({
		'position' : 'fixed',
		'top' : getTop,
		'left' : getLeft,
		'width': getWitdh
	}).animate({
		'top' : '10vh',
		'left' : '13vw',
		'width': '74vw',
		'position': 'fixed',
	},300);

	container.find('.exp-item').children().animate({
		'opacity':'0'
	 }, function(){
		container.find('.exp-item').empty().append($('.js-request-item[data-item="'+ elementType + '"]').show().get(0).outerHTML);
	 });
}

$(document).ready(function() {
	introScrollEffect();
	randomizeReviews();

	$('.js-exp-item').tilt({
		scale: 1.05,
		maxTilt: 10,
		perspective: 2000,
		tiltSpeed: 400
	});
	$('.js-exp-item').on('click tap',$.proxy(expandExperience, self));

	$(".js-scroll").on("click tap", function(e) {
	    e.preventDefault();
	    var aid = $(this).attr("href");
	    $('html,body').animate({scrollTop: $(aid).offset().top - 330},'slow');
	});
});
$('a[href="#"]').click( function(e) {
	e.preventDefault();
});
$(document).on('click tap', '.js-modal-close, .js-overlay', function(){
	destroyOverlay();
});
$(window).bind('keydown', function() {
	if(event.keyCode === 27) {
		destroyOverlay();
	}
});
$(document).scroll(function() { introScrollEffect();});
$('.js-pagi').on('click', function (e) {
	e.preventDefault();
	if ($('.is-current').next().length === 0) {
		$('.js-review-item').removeClass('is-current is-prev').first().addClass('is-current');
		return;
	}
	$('.is-current').addClass("is-prev").removeClass('is-current').next().removeClass("is-prev").addClass('is-current');
});

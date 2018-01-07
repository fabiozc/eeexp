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
		'top' : '7vh',
		'left' : '10vw',
		'width': '80vw',
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

	$('.js-email').attr('href','mailto:contact@eeexp.co');
	$('[aria-hidden="true"]').hide();
	$('[data-src]').each( function(){
		$(this).attr('src', $(this).data('src'));
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

//FORM CHAT
function checkIfFormIsFilled(el){
	var parentForm = el.parents('.js-request-form');
	if(parentForm.find('.js-form-item:not(.is-empty)').length === parentForm.find(".js-form-item").length){
		var name = $('.js-form-name').val().split(' ')[ 0 ];
		var email = $('.js-form-email').val();
		parentForm.find('.js-form-server-name').text(name);
		parentForm.find('.js-form-server-email').text(email);
		parentForm.find('.js-chat-message-2').show();
		parentForm.find('.js-chat-message-1').show();
		parentForm.parents('.js-request-item').animate({ scrollTop: parentForm.parents('.js-request-item').height()}, 1000);
		parentForm.find('.js-chat-message-1').delay(400).animate({
			'opacity': '1'
		}, function(){
			parentForm.find('.js-chat-message-2').delay(800).animate({
				'opacity': '1'
			}).find('.js-form-message').focus();
		});
	}
}
$('.js-request').on('click tap','.js-form-select',function(){
	$(this).find('.js-option-list:hidden').slideDown(200);
});
$('.js-request').on('click tap','.js-form-option',function(){
	var option = $(this).text();
	$(this).parents('.js-form-select').attr('data-placeholder',option).removeClass('is-empty');
	$('.' + $(this).parents('.js-form-select').attr('data-form')).val(option);
	$(this).parents('.js-option-list').slideUp(200).removeClass('is-empty');
	checkIfFormIsFilled($(this));
});

$('.js-request').on('keyup','.js-form-item',function(){
	if($(this).val() === ""){
		$(this).addClass('is-empty');
	} else{
		$(this).removeClass('is-empty');
	}
	checkIfFormIsFilled($(this));
});
$('.js-request').on('keyup','.js-form-message',function(){
	if($(this).val() === ""){
		$(this).parents('.js-request-form').find('.js-request-button').addClass('is-disabled');
	} else{
		$(this).parents('.js-request-form').find('.js-request-button').removeClass('is-disabled');
	}
});
$('.js-request').on('submit','.js-request-form',function(e){
	var chatParent = $(this);
	if($(this).hasClass('is-disabled')){
		var firstEmpty = chatParent.find('.is-empty').first();
		if(firstEmpty.is('input')){
			firstEmpty.focus();
		} else {
			firstEmpty.trigger('click');
		}
	} else {
		e.preventDefault();
		$('.js-request-button').addClass('is-loading');
		$.ajax({
			type     : "POST",
			//dataType: 'jsonp',
			cache    : false,
			url      : $(this).attr('action'),
			data     : $(this).serialize(),
			statusCode: {
				0: function() {
					chatParent.find('.js-request-chat').fadeOut(function(){
						chatParent.find('.js-request-feedback').fadeIn();
					});
				},
				200: function() {
					chatParent.find('.js-request-chat').fadeOut(function(){
						chatParent.find('.js-request-feedback').fadeIn();
					});
				}
			}
		});
	}
});
$('.js-booknow').on('click tap',function () {
	var container = $('.js-request');
	container.append($('.js-request-item[data-item="All"]'));
	callOverlay();
	container.attr('aria-hidden','false').removeAttr('style').show().addClass("modal").animate({
		'top' : '7vh',
		'left' : '10vw',
		'width': '80vw',
		'position': 'fixed',
	},300);
});

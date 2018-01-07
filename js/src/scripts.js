"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):"object"===("undefined"==typeof module?"undefined":_typeof(module))&&module.exports?module.exports=function(i,s){return void 0===s&&(s="undefined"!=typeof window?require("jquery"):require("jquery")(i)),t(s),s}:t(jQuery)}(function(t){return t.fn.tilt=function(i){var s=function(){this.ticking||(requestAnimationFrame(g.bind(this)),this.ticking=!0)},e=function(){var i=this;t(this).on("mousemove",o),t(this).on("mouseenter",a),this.settings.reset&&t(this).on("mouseleave",l),this.settings.glare&&t(window).on("resize",d.bind(i))},n=function(){var i=this;void 0!==this.timeout&&clearTimeout(this.timeout),t(this).css({transition:this.settings.speed+"ms "+this.settings.easing}),this.settings.glare&&this.glareElement.css({transition:"opacity "+this.settings.speed+"ms "+this.settings.easing}),this.timeout=setTimeout(function(){t(i).css({transition:""}),i.settings.glare&&i.glareElement.css({transition:""})},this.settings.speed)},a=function(i){this.ticking=!1,t(this).css({"will-change":"transform"}),n.call(this),t(this).trigger("tilt.mouseEnter")},r=function(i){return"undefined"==typeof i&&(i={pageX:t(this).offset().left+t(this).outerWidth()/2,pageY:t(this).offset().top+t(this).outerHeight()/2}),{x:i.pageX,y:i.pageY}},o=function(t){this.mousePositions=r(t),s.call(this)},l=function(){n.call(this),this.reset=!0,s.call(this),t(this).trigger("tilt.mouseLeave")},h=function(){var i=t(this).outerWidth(),s=t(this).outerHeight(),e=t(this).offset().left,n=t(this).offset().top,a=(this.mousePositions.x-e)/i,r=(this.mousePositions.y-n)/s,o=(this.settings.maxTilt/2-a*this.settings.maxTilt).toFixed(2),l=(r*this.settings.maxTilt-this.settings.maxTilt/2).toFixed(2),h=Math.atan2(this.mousePositions.x-(e+i/2),-(this.mousePositions.y-(n+s/2)))*(180/Math.PI);return{tiltX:o,tiltY:l,percentageX:100*a,percentageY:100*r,angle:h}},g=function(){return this.transforms=h.call(this),this.reset?(this.reset=!1,t(this).css("transform","perspective("+this.settings.perspective+"px) rotateX(0deg) rotateY(0deg)"),void(this.settings.glare&&(this.glareElement.css("transform","rotate(180deg) translate(-50%, -50%)"),this.glareElement.css("opacity","0")))):(t(this).css("transform","perspective("+this.settings.perspective+"px) rotateX("+("x"===this.settings.disableAxis?0:this.transforms.tiltY)+"deg) rotateY("+("y"===this.settings.disableAxis?0:this.transforms.tiltX)+"deg) scale3d("+this.settings.scale+","+this.settings.scale+","+this.settings.scale+")"),this.settings.glare&&(this.glareElement.css("transform","rotate("+this.transforms.angle+"deg) translate(-50%, -50%)"),this.glareElement.css("opacity",""+this.transforms.percentageY*this.settings.maxGlare/100)),t(this).trigger("change",[this.transforms]),void(this.ticking=!1))},c=function(){var i=this.settings.glarePrerender;if(i||t(this).append('<div class="js-tilt-glare"><div class="js-tilt-glare-inner"></div></div>'),this.glareElementWrapper=t(this).find(".js-tilt-glare"),this.glareElement=t(this).find(".js-tilt-glare-inner"),!i){var s={position:"absolute",top:"0",left:"0",width:"100%",height:"100%"};this.glareElementWrapper.css(s).css({overflow:"hidden","pointer-events":"none"}),this.glareElement.css({position:"absolute",top:"50%",left:"50%","background-image":"linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",width:""+2*t(this).outerWidth(),height:""+2*t(this).outerWidth(),transform:"rotate(180deg) translate(-50%, -50%)","transform-origin":"0% 0%",opacity:"0"})}},d=function(){this.glareElement.css({width:""+2*t(this).outerWidth(),height:""+2*t(this).outerWidth()})};return t.fn.tilt.destroy=function(){t(this).each(function(){t(this).find(".js-tilt-glare").remove(),t(this).css({"will-change":"",transform:""}),t(this).off("mousemove mouseenter mouseleave")})},t.fn.tilt.getValues=function(){var i=[];return t(this).each(function(){this.mousePositions=r.call(this),i.push(h.call(this))}),i},t.fn.tilt.reset=function(){t(this).each(function(){var i=this;this.mousePositions=r.call(this),this.settings=t(this).data("settings"),l.call(this),setTimeout(function(){i.reset=!1},this.settings.transition)})},this.each(function(){var s=this;this.settings=t.extend({maxTilt:t(this).is("[data-tilt-max]")?t(this).data("tilt-max"):20,perspective:t(this).is("[data-tilt-perspective]")?t(this).data("tilt-perspective"):300,easing:t(this).is("[data-tilt-easing]")?t(this).data("tilt-easing"):"cubic-bezier(.03,.98,.52,.99)",scale:t(this).is("[data-tilt-scale]")?t(this).data("tilt-scale"):"1",speed:t(this).is("[data-tilt-speed]")?t(this).data("tilt-speed"):"400",transition:!t(this).is("[data-tilt-transition]")||t(this).data("tilt-transition"),disableAxis:t(this).is("[data-tilt-disable-axis]")?t(this).data("tilt-disable-axis"):null,axis:t(this).is("[data-tilt-axis]")?t(this).data("tilt-axis"):null,reset:!t(this).is("[data-tilt-reset]")||t(this).data("tilt-reset"),glare:!!t(this).is("[data-tilt-glare]")&&t(this).data("tilt-glare"),maxGlare:t(this).is("[data-tilt-maxglare]")?t(this).data("tilt-maxglare"):1},i),null!==this.settings.axis&&(console.warn("Tilt.js: the axis setting has been renamed to disableAxis. See https://github.com/gijsroge/tilt.js/pull/26 for more information"),this.settings.disableAxis=this.settings.axis),this.init=function(){t(s).data("settings",s.settings),s.settings.glare&&c.call(s),e.call(s)},this.init()})},t("[data-tilt]").tilt(),!0});

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

	var targetOffset = $("#experiences").offset().top;
	var $w = $(window).scroll(function(){
	    if ( $w.scrollTop() > targetOffset ) {
			$('[data-src]').each( function(){
				$(this).attr('src', $(this).data('src'));
			});
			$(window).off("scroll");
	    }
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
	container.attr('aria-hidden','false').removeAttr('style').empty();
	container.append($('.js-request-item[data-item="All"]'));
	callOverlay();
	container.attr('aria-hidden','false').removeAttr('style').show().addClass("modal").animate({
		'top' : '7vh',
		'left' : '10vw',
		'width': '80vw',
		'position': 'fixed',
	},300);
});

function introScrollEffect(){1.3*$(this).scrollTop()<$(window).height()?$(".js-intro").css({opacity:1-parseInt($(this).scrollTop())/(parseInt($(".js-intro").css("height"))/1.8)}):$(".js-intro").css({opacity:0})}function callOverlay(){$("body").append("<div class='overlay js-overlay'><span class='modal-close js-modal-close' >&times;</span></div>").find(".js-overlay").animate({opacity:"1"})}function destroyOverlay(){var e=$(".overlay");e.animate({opacity:"0"},function(){e.remove()}),$(".js-request").empty(),$(".js-request-item").hide()}function expandExperience(e){var t=$(".js-request"),s=$(e.currentTarget),i=s.data("type");callOverlay(),t.attr("aria-hidden","false").removeAttr("style").empty();var o=s.css("width"),n=s.offset().top-$(document).scrollTop(),r=s.offset().left;s.clone().appendTo(t),t.find(".exp-item").removeClass(".js-exp-item").removeAttr("style").addClass("is-open"),t.show().addClass("modal").css({position:"fixed",top:n,left:r,width:o}).animate({top:"10vh",left:"15vw",width:"70vw",position:"fixed"},300),t.find(".exp-item").children().animate({opacity:"0"},function(){t.find(".exp-item").empty().append($('.js-request-item[data-item="'+i+'"]').show().get(0).outerHTML)})}$(document).ready(function(){introScrollEffect(),$(".js-exp-item").tilt({scale:1.05,maxTilt:9,perspective:2e3,tiltSpeed:400}),$(".js-exp-item").on("click tap",$.proxy(expandExperience,self)),$(".js-scroll").on("click tap",function(e){e.preventDefault();var t=$(this).attr("href");$("html,body").animate({scrollTop:$(t).offset().top-330},"slow")})}),$('a[href="#"]').click(function(e){e.preventDefault()}),$(document).on("click tap",".js-modal-close, .js-overlay",function(){destroyOverlay()}),$(window).bind("keydown",function(){27===event.keyCode&&destroyOverlay()}),$(document).scroll(function(){introScrollEffect()}),$(".js-pagi").on("click",function(e){if(e.preventDefault(),0===$(".is-current").next().length)return void $(".js-review-item").removeClass("is-current is-prev").first().addClass("is-current");$(".is-current").addClass("is-prev").removeClass("is-current").next().removeClass("is-prev").addClass("is-current")});
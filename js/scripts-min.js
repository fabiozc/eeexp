function introScrollEffect(){var e=$(".js-intro");e.addClass("is-loaded"),1.3*$(this).scrollTop()<$(window).height()?e.css({opacity:1-parseInt($(this).scrollTop())/(parseInt(e.css("height"))/1.8)}):$(".js-intro").css({opacity:0})}function randomizeReviews(){var e=$(".js-review-list"),t=e.children();t.sort(function(){return Math.random()-.5}),e.append(t)}function callOverlay(){$("body").append("<div class='overlay js-overlay'><span class='modal-close js-modal-close' >&times;</span></div>").find(".js-overlay").animate({opacity:"1"})}function destroyOverlay(){var e=$(".overlay");e.animate({opacity:"0"},function(){e.remove()}),$(".js-request").empty(),$(".js-request-item").hide()}function expandExperience(e){var t=$(".js-request"),s=$(e.currentTarget),i=s.data("type");callOverlay(),t.attr("aria-hidden","false").removeAttr("style").empty();var a=s.css("width"),n=s.offset().top-$(document).scrollTop(),r=s.offset().left;s.clone().appendTo(t),t.find(".exp-item").removeClass(".js-exp-item").removeAttr("style").addClass("is-open"),t.show().addClass("modal").css({position:"fixed",top:n,left:r,width:a}).animate({top:"7vh",left:"10vw",width:"80vw",position:"fixed"},300),t.find(".exp-item").children().animate({opacity:"0"},function(){t.find(".exp-item").empty().append($('.js-request-item[data-item="'+i+'"]').show().get(0).outerHTML)})}function checkIfFormIsFilled(e){var t=e.parents(".js-request-form");if(t.find(".js-form-item:not(.is-empty)").length===t.find(".js-form-item").length){var s=$(".js-form-name").val().split(" ")[0],i=$(".js-form-email").val();t.find(".js-form-server-name").text(s),t.find(".js-form-server-email").text(i),t.find(".js-chat-message-2").show(),t.find(".js-chat-message-1").show(),t.parents(".js-request-item").animate({scrollTop:t.parents(".js-request-item").height()},1e3),t.find(".js-chat-message-1").delay(400).animate({opacity:"1"},function(){t.find(".js-chat-message-2").delay(800).animate({opacity:"1"}).find(".js-form-message").focus()})}}$(document).ready(function(){introScrollEffect(),randomizeReviews(),$(".js-exp-item").tilt({scale:1.05,maxTilt:10,perspective:2e3,tiltSpeed:400}),$(".js-exp-item").on("click tap",$.proxy(expandExperience,self)),$(".js-scroll").on("click tap",function(e){e.preventDefault();var t=$(this).attr("href");$("html,body").animate({scrollTop:$(t).offset().top-330},"slow")}),$(".js-email").attr("href","mailto:contact@eeexp.co"),$('[aria-hidden="true"]').hide(),$("[data-src]").each(function(){$(this).attr("src",$(this).data("src"))})}),$('a[href="#"]').click(function(e){e.preventDefault()}),$(document).on("click tap",".js-modal-close, .js-overlay",function(){destroyOverlay()}),$(window).bind("keydown",function(){27===event.keyCode&&destroyOverlay()}),$(document).scroll(function(){introScrollEffect()}),$(".js-pagi").on("click",function(e){if(e.preventDefault(),0===$(".is-current").next().length)return void $(".js-review-item").removeClass("is-current is-prev").first().addClass("is-current");$(".is-current").addClass("is-prev").removeClass("is-current").next().removeClass("is-prev").addClass("is-current")}),$(".js-request").on("click tap",".js-form-select",function(){$(this).find(".js-option-list:hidden").slideDown(200)}),$(".js-request").on("click tap",".js-form-option",function(){var e=$(this).text();$(this).parents(".js-form-select").attr("data-placeholder",e).removeClass("is-empty"),$("."+$(this).parents(".js-form-select").attr("data-form")).val(e),$(this).parents(".js-option-list").slideUp(200).removeClass("is-empty"),checkIfFormIsFilled($(this))}),$(".js-request").on("keyup",".js-form-item",function(){""===$(this).val()?$(this).addClass("is-empty"):$(this).removeClass("is-empty"),checkIfFormIsFilled($(this))}),$(".js-request").on("keyup",".js-form-message",function(){""===$(this).val()?$(this).parents(".js-request-form").find(".js-request-button").addClass("is-disabled"):$(this).parents(".js-request-form").find(".js-request-button").removeClass("is-disabled")}),$(".js-request").on("submit",".js-request-form",function(e){var t=$(this);if($(this).hasClass("is-disabled")){var s=t.find(".is-empty").first();s.is("input")?s.focus():s.trigger("click")}else e.preventDefault(),$(".js-request-button").addClass("is-loading"),$.ajax({type:"POST",cache:!1,url:$(this).attr("action"),data:$(this).serialize(),statusCode:{0:function(){t.find(".js-request-chat").fadeOut(function(){t.find(".js-request-feedback").fadeIn()})},200:function(){t.find(".js-request-chat").fadeOut(function(){t.find(".js-request-feedback").fadeIn()})}}})}),$(".js-booknow").on("click tap",function(){var e=$(".js-request");e.append($('.js-request-item[data-item="All"]')),callOverlay(),e.attr("aria-hidden","false").removeAttr("style").show().addClass("modal").animate({top:"7vh",left:"10vw",width:"80vw",position:"fixed"},300)});
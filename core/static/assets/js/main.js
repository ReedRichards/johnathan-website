/*
	Cascade by Pixelarity
	pixelarity.com | hello@pixelarity.com
	License: pixelarity.com/license
*/

var settings = {

	carousel: {

		// Transition speed (in ms)
		// For timing purposes only. It *must* match the transition speed of ".carousel > article".
			speed: 350

	}

};

(function($) {

	skel.breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)'
	});

	/**
	 * Custom carousel for Altitude.
	 * @return {jQuery} jQuery object.
	 */
	$.fn._carousel = function(options) {

		var	$window = $(window),
			$this = $(this);

		// Handle no/multiple elements.
			if (this.length == 0)
				return $this;

			if (this.length > 1) {

				for (var i=0; i < this.length; i++)
					$(this[i])._slider(options);

				return $this;

			}

		// Vars.
			var	current = 0, pos = 0, lastPos = 0,
				slides = [],
				$slides = $this.children('article'),
				intervalId,
				isLocked = false,
				i = 0;

		// Functions.
			$this._switchTo = function(x, stop) {

				// Handle lock.
					if (isLocked || pos == x)
						return;

					isLocked = true;

				// Stop?
					if (stop)
						window.clearInterval(intervalId);

				// Update positions.
					lastPos = pos;
					pos = x;

				// Hide last slide.
					slides[lastPos].removeClass('visible');

				// Finish hiding last slide after a short delay.
					window.setTimeout(function() {

						// Hide last slide (display).
							slides[lastPos].hide();

						// Show new slide (display).
							slides[pos].show();

						// Show new new slide.
							window.setTimeout(function() {
								slides[pos].addClass('visible');
							}, 25);

						// Unlock after sort delay.
							window.setTimeout(function() {
								isLocked = false;
							}, options.speed);

					}, options.speed);

			};

		// Slides.
			$slides
				.each(function() {

					var $slide = $(this);

					// Add to slides.
						slides.push($slide);

					// Hide.
						$slide.hide();

					i++;

				});

		// Nav.
			$this
				.on('click', '.next', function(event) {

					// Prevent default.
						event.preventDefault();
						event.stopPropagation();

					// Increment.
						current++;

						if (current >= slides.length)
							current = 0;

					// Switch.
						$this._switchTo(current);

				})
				.on('click', '.previous', function(event) {

					// Prevent default.
						event.preventDefault();
						event.stopPropagation();

					// Decrement.
						current--;

						if (current < 0)
							current = slides.length - 1;

					// Switch.
						$this._switchTo(current);

				});

		// Initial slide.
			slides[pos]
				.show()
				.addClass('visible');

		// Bail if we only have a single slide.
			if (slides.length == 1)
				return;

	};

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$header = $('#header'),
			$banner = $('#banner');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// IE: Various fixes.
			if (skel.vars.browser == 'ie')
				$body.addClass('is-ie');

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Menu.
			$('#menu')
				.append('<a href="#menu" class="close"></a>')
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right'
				});

		// Header.
			if ($banner.length > 0 && $header.hasClass('alt')) {

					$window.on('resize', function() { $window.trigger('scroll'); });

					$banner.scrollex({
							bottom:         $header.outerHeight(),
							terminate:      function() { $header.removeClass('alt'); },
							enter:          function() { $header.addClass('alt'); },
							leave:          function() { $header.removeClass('alt'); }
					});

			}

		// Images.
			$('.image[data-position]').each(function() {

				var $this = $(this),
					$img = $this.children('img');

				// Polyfill object-fit.
					if (!skel.canUse('object-fit')) {

						// Apply img as background.
							$this
								.css('background-image', 'url("' + $img.attr('src') + '")')
								.css('background-position', $this.data('position'))
								.css('background-size', 'cover')
								.css('background-repeat', 'no-repeat');

						// Hide img.
							$img
								.css('opacity', '0');

						return;

					}

			});

		// Scrolly.
			$('.scrolly').scrolly({
				offset: function() {
					return $header.outerHeight() - 2;
				}
			});

			$('.scrolly-middle').scrolly({
				anchor: 'middle',
				offset: function() {
					return $header.outerHeight() - 2;
				}
			});

      //removed because of services.html not showing the header on mobile devices
		// Spotlights.
			// $('.spotlight').scrollex({
			// 	top:		'30vh',
			// 	bottom:		'30vh',
			// 	delay:		25,
			// 	initialize:	function() {
			// 		$(this).addClass('is-inactive');
			// 	},
			// 	terminate:	function() {
			// 		$(this).removeClass('is-inactive');
			// 	},
			// 	enter:		function() {
			// 		$(this).removeClass('is-inactive');
			// 	}
			// });

		// Carousels.
			$('.carousel')
				._carousel(settings.carousel);

	});

})(jQuery);

function store(){
    var inputName= document.getElementById("name");
    var inputNumber= document.getElementById("number");
    var inputEmail= document.getElementById("email");
    var inputSelect= document.getElementById("select");
    var inputDescription= document.getElementById("description");

    localStorage.setItem("name", inputName.value);
    localStorage.setItem("number", inputNumber.value);
    localStorage.setItem("email", inputEmail.value);
    localStorage.setItem("select", inputSelect.value);
    localStorage.setItem("description", inputDescription.value);
    // change this to actual url in prod
    window.location.assign=("http://207.148.2.38:8000/contact/");

}

function addMobileMenu(menuTag){
    var ul = document.createElement("ul");
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.href=("#menu");
    a.innerHTML = "Menu";
    menuTag.appendChild(ul);
    ul.appendChild(li);
    li.appendChild(a);

}

function addDesktopMenu(menuTag){
    // going to create a lookup table for all of this and insatiate it onDomContentLoaded
    // in the future, for testing purposes and time restraints we'll keep this as is 
    // csgradmeme.jpg
    // this is now a leftover function from a client specification that he now no longer wants,
    // to bad i'm leaving it because its not worth my time to re write this because his project
    // is beggining to fall outside original scope, my god have mercy on the soul of whomever inherits
    // this from me. if you need a hand my email is rob@bvzzdesign.com and just mention in the subject
    // "stupid menu function from concrete website", im sure i'll know what you are talking about
    var ulTwo = document.createElement("ul");
    var li2 = document.createElement("li");
    var li3 = document.createElement("li");
    var li4 = document.createElement("li");
    var li5 = document.createElement("li");
    var li6 = document.createElement("li");
    var li7 = document.createElement("li");
    var a2 = document.createElement("a");
    var a3 = document.createElement("a");
    var a4 = document.createElement("a");
    var a5 = document.createElement("a");
    var a6 = document.createElement("a");
    var a7 = document.createElement("a");
    a2.innerHTML="Home";
    a2.href="/"
    a3.href="/about";
    a3.innerHTML="About";
    a4.href="/services";
    a4.innerHTML="Services";
    a5.href="/testimonials";
    a5.innerHTML="Testimonials";
    a6.href="/portfolio";
    a6.innerHTML="Portfolio";
    a7.href="/contact";
    a7.innerHTML="Contact";


    menuTag.appendChild(ulTwo);
    ulTwo.appendChild(li2);
    ulTwo.appendChild(li3);
    ulTwo.appendChild(li4);
    ulTwo.appendChild(li5);
    ulTwo.appendChild(li6);
    ulTwo.appendChild(li7);

    li2.appendChild(a2);
    li3.appendChild(a3);
    li4.appendChild(a4);
    li5.appendChild(a5);
    li6.appendChild(a6);
    li6.appendChild(a7);

}

function deleteMenu(){
    menuTag = document.getElementById('vis-menu');
    while (menuTag.firstChild) {
        menuTag.removeChild(menuTag.firstChild);
    }
    return menuTag;
}

function windowWidth(){
    w = window.innerWidth;
    tog = document.getElementsByClassName("title-of-banner");
    if (w < 768){
        addMobileMenu(deleteMenu());
        tog[0].classList.add("fcol");
        tog[0].classList.remove("frow");
    }
    else if(w >768){
        addDesktopMenu(deleteMenu());
        tog[0].classList.add("frow");
        tog[0].classList.remove("fcol");
    }
    else {
        deleteMenu();
        tog[0].classList.add("frow");
        tog[0].classList.remove("fcol");
    }
}

document.addEventListener("DOMContentLoaded", windowWidth());
window.onresize = windowWidth;

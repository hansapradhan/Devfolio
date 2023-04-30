// Add your javascript here
// Don't forget to add it into respective layouts where this js file is needed
$(document).ready(function () {
  $(document).click(function (event) {
    var clickover = $(event.target);
    // var _opened = $(".navbar-toggler").hasClass("nav-open");
    // if (_opened === true && !clickover.hasClass("navbar-toggler")) {
    //     $("button.navbar-toggler").click();
    // }
    if (nowuiKit.misc.navbar_menu_visible == 1 && (!clickover.hasClass("navbar-toggler-bar") && !clickover.hasClass("navbar-toggler") )) {
      // $('html').removeClass('nav-open');
      // nowuiKit.misc.navbar_menu_visible = 0;
      // $('#bodyClick').remove();
      // setTimeout(function() {
      //     $toggle.removeClass('toggled');
      // }, 550);
      $(".navbar-toggler").click();
  }
  });
  AOS.init( {
    // uncomment below for on-scroll animations to played only once
    // once: true

  }); // initialize animate on scroll library

	function hex_initial_animation() {
		$(".hex-wrap,.hover-notify").velocity("transition.expandIn", { stagger: 150 });
		$(".hex-wrap").velocity("callout.pulse");
		$(".hoverblock").velocity("fadeOut", { delay: 3000, duration: 0 });
		}
	hex_initial_animation();

var hoverdetect = setInterval(function(){ hovernotify() }, 3000);
function hovernotify() {
    $(".hover-notify").velocity("callout.tada");
}
function myStopFunction() {
$(".hover-notify").velocity('stop', true).velocity("fadeOut");
    clearInterval(hoverdetect);
}

		$(".hex-init").mouseenter(function () {
			
			myStopFunction();

			var title_color =  $(this).parent().attr("data-color");
			var title_name = $(this).parent().attr("data-title");
			var desc_name = $(this).parent().attr("data-content");

				function hex_description() {
					$('.code-description').velocity('stop', true).velocity("transition.slideRightBigIn");
					$('.' + desc_name).siblings().removeClass('desc-active');
						setTimeout(function() {
							$('.' + desc_name).addClass('desc-active');
							$('.code-descriptopn > div, .desc-active').children().velocity('stop', true).velocity("transition.slideRightBigIn", { stagger: 300 });
							$('.code-title, .desc-active span').velocity({color: title_color}, { queue: false });
							$('.code-title').text(title_name)
						}, 0);
			    }
			    hex_description();

				$(this).parent().addClass('hexactive'); 
				$('.hexactive').velocity({scaleX:"1.1",scaleY:"1.1"}, { duration: 200 });

			}).mouseleave(function () {
				 $('.hexactive').velocity('stop', true).velocity('reverse').removeClass('hexactive');
			});




});



// $(document).ready(function() {
//   AOS.init( {
//     // uncomment below for on-scroll animations to played only once
//     // once: true

//   }); // initialize animate on scroll library
// });


function openqualification(evt, qualification) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("qualification__content");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("qualification__button button--flex");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" qualification__active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(qualification).style.display = "block";
  evt.currentTarget.className += " qualification__active";
}

var store = document.querySelector(':root');

function getfontfamily() {

var value = getComputedStyle(store);

alert("Initial font family: "+ value.getPropertyValue('--font-family'));

}

function setthemecolour(theme) {

  document.querySelector(':root').style.setProperty('--hue-color', theme);

}

// Smooth scroll for links with hashes
$('a.smooth-scroll')
.click(function(event) {
  // On-page links
  if (
    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
    && 
    location.hostname == this.hostname
  ) {
    // Figure out element to scroll to
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    // Does a scroll target exist?
    if (target.length) {
      // Only prevent default if animation is actually gonna happen
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000, function() {
        // Callback after animation
        // Must change focus!
        var $target = $(target);
        $target.focus();
        if ($target.is(":focus")) { // Checking if the target was focused
          return false;
        } else {
          $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
          $target.focus(); // Set focus again
        };
      });
    }
  }
});

/*==================== DARK LIGHT THEME ====================*/ 
window.onload = function(){
const themeButton = document.getElementById('toggle_checkbox')
const mainDivTag = document.getElementById("mainDiv");
const homeBackgroundImage = document.getElementById("homeBackground")
const contactBackgroundImage = document.getElementById("contactBackgroundImage")
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => mainDivTag.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme

    mainDivTag.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
    if (localStorage.getItem('selected-theme') === 'dark') {
      homeBackgroundImage.style.backgroundImage = "url('assets/images/darkmodeHome.jpg')"
      contactBackgroundImage.style.backgroundImage = "url(assets/images/darkmodecontact.jpg)" 
      document.getElementById('toggle_checkbox').innerHTML = 'DARK THEME';
    }
    else{
      homeBackgroundImage.style.backgroundImage = "url('assets/images/work-4.jpg')"
      contactBackgroundImage.style.backgroundImage = "url(assets/images/overlay-bg.jpg)"
      document.getElementById('toggle_checkbox').innerHTML = 'LIGHT THEME';
    }
})
}



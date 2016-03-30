jQuery(document).ready(function($){
  var isLateralNavAnimating = false;

  $('.menu-burger').on('click', function(e) {
    e.preventDefault();

    if( !isLateralNavAnimating ) {
      if($(this).parents('.csstransitions').length > 0 ) isLateralNavAnimating = true;

      $('body').toggleClass('navigation-is-open');
      $('.navigation-wrapper').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
        isLateralNavAnimating = false;
      });
    }
  });
});

$(window).load(function() {
  var loaded = sessionStorage.getItem('animationLoaded');

  console.log(loaded);

  if (loaded == "false" || loaded == null) {
    var time = 1;
    var myTimeline = new TimelineMax({
      repeat: 0,
      yoyo: false
    });

    var paths = document.querySelectorAll('*[id^="path"]');
    var hiddenAnimation = document.getElementsByClassName("hideBeforeAnimation");
    var slowFadeText = document.getElementsByClassName("slow-fade");

    myTimeline.timeScale(25);

    function randomNumber(min, max) {
      return Math.floor(Math.random() * (1 + max - min) + min);
    }

    for (var i = 0; i < paths.length; i++) {
      myTimeline.set(paths[i], {
        strokeDasharray: 300,
        strokeDashoffset: -300,
        strokeWidth: 1,
        strokeOpacity: 1,
        fillOpacity: 0
      }),

      myTimeline.set(hiddenAnimation, {
        opacity: 1
      }),

      myTimeline.set(slowFadeText, {
        opacity: 0
      });
    }

    for(var i=0; i < paths.length; i++) {
      myTimeline.to(paths[i], 80, {
        strokeDashoffset: 0,
        ease: Sine.easeOut
      }, +7),

      myTimeline.to(paths[i], 50, {
        fillOpacity: 1,
        strokeOpacity: 0
      }, +87),

      myTimeline.to(slowFadeText, 80, {
        opacity: 1,
        ease: Sine.easeIn
      }, +120);
    }

    sessionStorage.setItem('animationLoaded', 'true');
  } else {
    var hiddenElement = document.getElementsByClassName("hideBeforeAnimation");
    hiddenElement[0].style.opacity = 1;
    hiddenElement[1].style.opacity = 1;
    hiddenElement[2].style.opacity = 1;
  }
});

$(window).unload(function() {
});

function selectTextBoxThroughSVG(vector) {
  var fields = $('#contactForm :input');
  let id = vector.id;
  switch (id) {
    case "firstSVG":
      $(fields[0]).focus();
      break;
    case "secondSVG":
      $(fields[1]).focus();
      break;
    case "thirdSVG":
      $(fields[2]).focus();
      break;
    case "fourthSVG":
      $(fields[3]).focus();
      break;
    default:
      console.log("Error - no matching case for SVG.");
      break;
  }
  // var textbox = $('.intro-in > form:nth-child(3)');
  // row.select();
  // console.log(row);
}

function submitContactForm() {
  console.log("Submitting form.");
  var fields = $('#contactForm :input');

  for(var i=0; i<fields.length; ++i) {
    if (fields[i].id == "phoneBox") {
      var runPhoneRegex = function validatePhone() {
        var phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if(fields[i].value.match(phoneRegex)) {
          return true;
        }
        else {
          if (fields[i].value != "" && fields[i].value != null) {
            alert("Uh-oh - that's not a valid phone number. Try again?");
            return false;
          }
        }
      }();

      if (runPhoneRegex == false) {
        return;
      }
    }

    if (fields[i].id == "emailBox") {
      var runEmailRegex = function validateEmail() {
        var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(fields[i].value.match(emailRegex)) {
          return true;
        }
        else {
          if (fields[i].value == '' || fields[i].value == null) {
            alert("I'd like to respond, but I'll need your email!");
            return false;
          }

          alert("Seems like the email you entered is no good. Try again?");
          return false;
        }
      }();

      if (runEmailRegex == false) {
        return;
      }
    }

    if (!fields[i].value && fields[i].id != "phoneBox")
    {
      alert("You forgot to fill out a field! Your phone number is optional, but I'll need the others.");
      return;
    } else {
      alert("Thanks for taking a step and contacting me! I'll be sure to do the same and get back to you soon.")
      var form = document.getElementById('contactForm');
      console.log(form);
      form.submit();
      // window.location = '/blog';
      return;
    }
  }
}

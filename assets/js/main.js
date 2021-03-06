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
  // var loaded = sessionStorage.getItem('animationLoaded');
  // (loaded == "false" || loaded == null) &&

  // if ( !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ) {

  var docURL = document.URL;

  if ( docURL.indexOf("about") > -1 ) {
    var aboutTimeline = new TimelineMax({
      repeat: 0,
      yoyo: false
    });

    aboutTimeline.timeScale(25);

    var pToFade = $("#aboutHeader span");

    for (var i=0; i<pToFade.length; ++i) {
      aboutTimeline.set(pToFade[i], {
        opacity: 0
      });
    }

    aboutTimeline.to(pToFade[0], 30, {
      opacity: 1
    }, +10),

    aboutTimeline.to(pToFade[1], 30, {
      opacity: 1
    }, +40),

    aboutTimeline.to(pToFade[2], 30, {
      opacity: 1
    }, +70),

    aboutTimeline.to(pToFade[3], 30, {
      opacity: 1
    }, +100);

  } else {

    var time = 1;
    var myTimeline = new TimelineMax({
      repeat: 0,
      yoyo: false
    });

    var paths = document.querySelectorAll('*[id^="path"]');
    var hiddenAnimation = document.getElementsByClassName("hideBeforeAnimation");
    var slowFadeText = document.getElementsByClassName("slow-fade");

    myTimeline.timeScale(25);

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
      myTimeline.to(paths[i], 120, {
        strokeDashoffset: -600,
        ease: Sine.easeOut
      }, +7),

      myTimeline.to(paths[i], 120, {
        fillOpacity: 1,
        strokeOpacity: 0
      }, +50),

      myTimeline.to(slowFadeText, 60, {
        opacity: 1,
        ease: Sine.easeIn
      }, +90);
    }
  }

    // sessionStorage.setItem('animationLoaded', 'true');
  // }
  // else {
  //   var hiddenElement = document.getElementsByClassName("hideBeforeAnimation");
  //   hiddenElement[0].style.opacity = 1;
  //   hiddenElement[1].style.opacity = 1;
  //   hiddenElement[2].style.opacity = 1;
  // }
});

$(window).unload(function() {
});

function selectTextBoxThroughSVG(vector) {
  var fields = $('#contactForm :input');
  var id = vector.id;
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
}

function submitContactForm() {
  var fields = $('#contactForm :input');

  for(var i=0; i<fields.length; ++i) {
    console.log("running validations.");
    if (fields[i].id == "phoneBox" && fields[i].value != "" && fields[i].value != null) {
      var runPhoneRegex = function validatePhone() {
        var phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if(fields[i].value.match(phoneRegex)) {
          return true;
        } else {
          alert("Uh-oh - that's not a valid phone number. Try again?");
          return false;
        }
      }();

      if (runPhoneRegex == false) {
        return false;
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
        return false;
      }
    }

    if (!fields[i].value && fields[i].style.display != "none" && fields[i].id != "phoneBox")
    {
      console.log(i);
      console.log(fields[i]);
      console.log(fields[i].value);
      alert("You forgot to fill out a field! Your phone number is optional, but I'll need the others.");
      return false;
    }

    if (i == fields.length-1) {
      alert("Thanks for the information! I'll do my best to get back to you quite soon.");
      return true;
    }
  }
}

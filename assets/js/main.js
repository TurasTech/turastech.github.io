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
      myTimeline.to(paths[i], 60, {
        strokeDashoffset: 0,
        ease: Sine.easeOut
      }, +7),

      myTimeline.to(paths[i], 50, {
        fillOpacity: 1,
        strokeOpacity: 0
      }, +67),

      myTimeline.to(slowFadeText, 80, {
        opacity: 1,
        ease: Sine.easeIn
      }, +100);
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

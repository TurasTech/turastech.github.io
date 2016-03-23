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

  if (loaded == "false" || loaded == undefined) {
    var time = 1;
    var myTimeline = new TimelineMax({
      repeat: 0,
      yoyo: false
    });

    var paths = document.querySelectorAll('*[id^="path"]');
    var animationContainerDiv = document.querySelectorAll('*[id^="svg4761"]');

    myTimeline.timeScale(25);

    function randomNumber(min, max) {
      return Math.floor(Math.random() * (1 + max - min) + min);
    }

    for (var i = 0; i < paths.length; i++) {
      myTimeline.set(paths[i], {
        strokeDasharray: 275,
        strokeDashoffset: -275,
        strokeWidth: 1,
        fillOpacity: 0
      }),

      myTimeline.set(animationContainerDiv, {
        scale: 1
      });
    }

    for(var i=0; i < paths.length; i++) {
      myTimeline.to(paths[i], 60, {
        strokeDashoffset: 0,
        ease: Sine.easeOut
      }, 0),

      myTimeline.to(paths[i], 40, {
        fillOpacity: 1,
        strokeOpacity: 0
      }, +60);
    }

    sessionStorage.setItem('animationLoaded', 'true');
  }
});

$(window).unload(function() {
});

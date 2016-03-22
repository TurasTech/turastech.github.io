
$(document).ready(function() {

});


$(window).load(function() {
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
      x: randomNumber(-1500, 1500),
      y: randomNumber(-1500, 1500),
      rotation: randomNumber(-500, 500),
      rotationX: randomNumber(-500, 500),
      rotationY: randomNumber(-500, 500),
      rotationZ: randomNumber(-500,500),
      opacity: 0
    });
  }


  // var properOpacity = 0;
  //
  // for (var i = 0; i < paths.length-9; i++) {
  //   properOpacity = paths[i].getAttribute("opacity");
  //
  //   if (properOpacity < 0.8) {
  //     var temp = Number(properOpacity);
  //     temp += 0.2;
  //     properOpacity = String(temp);
  //   }

    myTimeline.to(paths[i], 100, {
      x: 0,
      y: 0,
      rotation: 0,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      opacity: properOpacity,
      ease: Sine.easeInOutCubic
    }, 0)
  }

  // for (var i = paths.length-9; i < paths.length; i++) {
  //   myTimeline.to(paths[i], 68, {
  //     "stroke-dashoffset": 0,
  //     ease: Sine.easeInOutCubic
  //   }, +100)
  // }
  //
  // for (var i = paths.length-9; i < paths.length; i++) {
  //   myTimeline.to(paths[i], 20, {
  //     "fill-opacity": 1,
  //     ease: Sine.easeInOutCubic
  //   }, +168);
  }

  // myTimeline.to(animationContainerDiv, 40, {
  //   "transform": "scaleX(0.5) scaleY(0.5)",
  //   "margin-top": 0,
  //   "margin-left": 0,
  //   ease: Sine.easeInOutCubic
  // }, +188);



});










//
//
//
// And Back Again
//
//
//

// for(var i=paths.length-9; i<paths.length; i++) {
//   myTimeline.to(paths[i], time + 100, {
//     ease: Sine.easeIn,
//     opacity: 1
//   }), (i/5));
// }
// for (var i = 0; i < paths.length; i++) {
//   myTimeline.to(paths[i], time + 100, {
//     y: randy((-400*(i/200))-50, (400*(i/200))+50),
//     rotation: randy(-400*(i/100), 400*(i/100)),
//     rotationX: randy(-400*(i/100), 400*(i/100)),
//     ease: Sine.easeInOut2
//   }, time + (paths.length/5) + (i/5)*2 + 100);
// }
// for (var i = 0; i < paths.length; i++) {
//   myTimeline.to(paths[i], time*2 + 100, {
//     x: randy((-400*(i/50))-50, (400*(i/50))+50),
//     rotationY: randy(-400*(i/100), 400*(i/100)),
//     rotationZ: randy(-400*(i/100), 400*(i/100)),
//     opacity: 0,
//     ease: Sine.easeInOut
//   }, (time * 2) + (paths.length/5) + (i/5)*2 + 100);
// }
